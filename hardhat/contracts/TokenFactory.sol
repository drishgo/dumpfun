// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./Token.sol";
import "hardhat/console.sol";
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';
import '@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router01.sol';

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {SafeTransferLib} from "solady/src/utils/SafeTransferLib.sol";


contract TokenFactory is Ownable {
    uint256 private platformFees;
   
    constructor() Ownable(msg.sender){

    }
    struct memeToken{
        string  name;
        string  symbol;
        string  description;
        string  tokenImageUrl;
        uint fundingRaised;
        address tokenAddress;
        address creatorAddress;

    }
    function withdraw() external  payable onlyOwner{
        uint256 amount = platformFees;
        SafeTransferLib.safeTransferETH(msg.sender, amount);
        platformFees= 0;
    }

    address[] public addressBook ;

    mapping (address => memeToken) addressToMemeTokenMapping;
    
    uint constant DECIMALS = 10**18;
    uint constant MAX_SUPPLY = (10**9)*DECIMALS; //1000000 000000000000000000
    uint constant INIT_SUPPLY = 20*MAX_SUPPLY/100; // 200000 000000000000000000
    uint constant MEMETOKEN_CREATION_FEE = 0.001 ether;
    uint constant MEMETOKEN_FUNDING_GOAL = 26 ether;
    address constant UNISWAP_V2_FACTORY_ADDRESS = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    address constant UNISWAP_V2_ROUTER_ADDRESS=0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    uint public constant  INITIAL_PRICE = 30000000000000;
    uint public constant K = 8*10**15;


    function createMemeToken(string memory name, string memory symbol, string memory description,string memory imageUrl) public payable returns(address){
        
    
        require(msg.value>=MEMETOKEN_CREATION_FEE,"Invalid token creation fee");
        uint256 payedEth = msg.value-MEMETOKEN_CREATION_FEE;
        platformFees+= MEMETOKEN_CREATION_FEE;
        Token memeCoinContract = new Token(name,symbol,INIT_SUPPLY);
        address memeTokenAddress = address(memeCoinContract);
        addressBook.push(memeTokenAddress);
        memeToken memory newCreatedToken = memeToken(name,symbol,description,imageUrl,0,memeTokenAddress,msg.sender);
        
        addressToMemeTokenMapping[memeTokenAddress] = newCreatedToken; 
        console.log(memeTokenAddress);
         if(payedEth>0){
            _buyWithRemaining(memeTokenAddress,payedEth,msg.sender);
        }
        return memeTokenAddress;
    }
    function buyMemeToken(address memeTokenAddress,uint MEMETOKEN_PURCHASE_QUANTITY) public payable returns(uint){
        require(addressToMemeTokenMapping[memeTokenAddress].tokenAddress!=address(0),"token does not exist on this platform");

        memeToken storage listedToken = addressToMemeTokenMapping[memeTokenAddress];

        require(addressToMemeTokenMapping[memeTokenAddress].fundingRaised<=MEMETOKEN_FUNDING_GOAL,"already filled the bonding curve");
        Token tokenCt = Token(memeTokenAddress);
        
        uint currentSupply = tokenCt.totalSupply();
        uint availableSupply = MAX_SUPPLY-INIT_SUPPLY;
        uint availableSupplyScaled = availableSupply/DECIMALS;
        uint purchasedQuantityScaled = MEMETOKEN_PURCHASE_QUANTITY*DECIMALS;
        require(MEMETOKEN_PURCHASE_QUANTITY<=availableSupplyScaled,"Not enough Supply");
        uint currentSupplyScaled = (currentSupply-INIT_SUPPLY)/DECIMALS;
        uint requiredEth = costCalculation(currentSupplyScaled,MEMETOKEN_PURCHASE_QUANTITY);
        console.log("REQUIRED ETHER: ",requiredEth/DECIMALS);
        require(msg.value>=requiredEth,"insufficient funds");
        listedToken.fundingRaised+= msg.value;
        tokenCt.mint(purchasedQuantityScaled,msg.sender);
        console.log("User Token Balance: ",tokenCt.balanceOf(msg.sender));
        if (listedToken.fundingRaised>=MEMETOKEN_FUNDING_GOAL) {
            //Create uniswap LP
            address pool = _createLiquididtyPool(memeTokenAddress);
            //provide Liquidity to the pool
            uint ethAmount = listedToken.fundingRaised;
            uint providedLiquidity = provideLiquidity(memeTokenAddress,INIT_SUPPLY,ethAmount);
            console.log("pool created at address :",pool);
            console.log("Liquidity created for pool :",providedLiquidity);
            //burn lp token to give liqui
            burnLpToken(pool,providedLiquidity);
        }
        return requiredEth;
        

    
    }
    function _buyWithRemaining(
        address tokenAddress,
        uint256 buyingAmountEth,
        address buyer
    ) internal{
        Token token = Token(tokenAddress);
        uint256 currentSupply = token.totalSupply()-INIT_SUPPLY;
        uint256 tokenAmount = _calculateMaxTokenPurchasable(currentSupply,buyingAmountEth,MAX_SUPPLY);

        buyMemeToken(tokenAddress,tokenAmount);
    }
    function _calculateMaxTokenPurchasable(
        uint currentSupplyScaled,
        uint ethForPurchase,
        uint maxAvailToken
    ) internal pure returns(uint256){
        uint256 low = 0;
        uint256 high = maxAvailToken;
        uint256 mid = (low + high+1) /2;
        uint256 cost;

        while (low<high) {
            mid = (low+high+1)/2;
            cost = costCalculation(currentSupplyScaled,mid);
            if(cost<=ethForPurchase){
                low=mid;
            }
            else{
                high=mid-1;
            }
        }
        return low;
    }
    function sellMemeToken(address memeTokenAddress, uint256 tokenAmount) external {
    memeToken storage tokenInfo = addressToMemeTokenMapping[memeTokenAddress];
    require(tokenInfo.tokenAddress != address(0), "Token does not exist");
    require(tokenInfo.fundingRaised < MEMETOKEN_FUNDING_GOAL, "Sell via Uniswap");

    Token token = Token(memeTokenAddress);
    uint256 tokenAmountInWei = tokenAmount * DECIMALS;

    // Check user balance and available supply
    require(token.balanceOf(msg.sender) >= tokenAmountInWei, "Insufficient balance");
    uint256 currentSupply = token.totalSupply() - INIT_SUPPLY;
    require(tokenAmountInWei <= currentSupply, "Exceeds burnable supply");

    // Calculate ETH refund using bonding curve
    uint256 currentSupplyScaled = currentSupply / DECIMALS;
    uint256 ethToRefund = costCalculation(currentSupplyScaled - tokenAmount, tokenAmount);

    // Ensure contract has enough ETH
    require(address(this).balance >= ethToRefund, "Insufficient ETH");

    // Update state
    tokenInfo.fundingRaised -= ethToRefund;

    // Burn tokens (requires Token contract to have burnFrom)
    token.burnFrom(msg.sender, tokenAmountInWei);

   
    SafeTransferLib.safeTransferETH(msg.sender, ethToRefund);
}
//new to impl in later vers
function getSellProceeds(address memeTokenAddress, uint256 tokenAmount) public view returns (uint256) {
    memeToken memory tokenInfo = addressToMemeTokenMapping[memeTokenAddress];
    require(tokenInfo.tokenAddress != address(0), "Token does not exist");

    Token token = Token(memeTokenAddress);
    uint256 currentSupply = token.totalSupply() - INIT_SUPPLY;
    uint256 currentSupplyScaled = currentSupply / DECIMALS;

    return costCalculation(currentSupplyScaled - tokenAmount, tokenAmount);
}
//might throw overflow error sometimes idk how to resolve [RAISE ISSUE 1]
    function costCalculation(uint256 currentSupply, uint256 totalSupply) public pure returns(uint){
           require(currentSupply + totalSupply <= MAX_SUPPLY, "Supply exceeds maximum limit");

    uint256 exponent1 = (K * (currentSupply + totalSupply)) / 10**18;
    uint256 exponent2 = (K * currentSupply) / 10**18;

    uint256 exp1 = exp(exponent1);
    uint256 exp2 = exp(exponent2);

    require(exp1 >= exp2, "Invalid cost calculation"); // Ensure exp1 is not less than exp2

    uint finalCost = (INITIAL_PRICE * 10**18 * (exp1 - exp2)) / K;
    return finalCost;

        // exponential bonding curve has the following formula:
        // P(S) = P0 * (e^a-e^S) where P0 is initial supl refer more elsewhere lazy to comment

    }
    //Helper for exponential function coz i cant figure out how to e^x :)
    function exp(uint256 x) internal pure returns(uint256){

        uint256 sum = 10**18;
        uint256 term = 10**18;
        uint256 xPower = x;
        for (uint i = 1; i <=20; i++) {
            term = (term*xPower)/(i*10**18);
            sum = sum+term;
        }
        return sum;

    }
    //Helper for get address from book 
    //There is no utility i can think of for this apart from when i need this in testing using hardhat but yeah its here

    function getAddressFromBook(uint256 index) public view returns(address){
        return addressBook[index];
    }
    function _createLiquididtyPool(address memeTokenAddress) internal returns(address){
            IUniswapV2Factory uniswapFactory = IUniswapV2Factory(UNISWAP_V2_FACTORY_ADDRESS);
            IUniswapV2Router01 uniswapRouter = IUniswapV2Router01(UNISWAP_V2_ROUTER_ADDRESS);
            address pair = uniswapFactory.createPair(memeTokenAddress,uniswapRouter.WETH());
            return pair;
    }
    function provideLiquidity(address memeTokenAddress,uint tokenAmount,uint etherAmount) internal returns(uint){
        Token memeTokenCt = Token(memeTokenAddress);
        memeTokenCt.approve(UNISWAP_V2_ROUTER_ADDRESS,tokenAmount);
        IUniswapV2Router01 router = IUniswapV2Router01(UNISWAP_V2_ROUTER_ADDRESS);
        (uint amountToken, uint amountETH, uint liquidity)  = router.addLiquidityETH{
            value: etherAmount
        }(memeTokenAddress,tokenAmount,tokenAmount,etherAmount,address(this),block.timestamp);

        return liquidity;
    }
    function burnLpToken(address pool,uint liquidity) internal returns(uint){
            IUniswapV2Pair uniswapErc20Pair = IUniswapV2Pair(pool);
            uniswapErc20Pair.transfer(address(0),liquidity);
            console.log("LP tokens burned ",liquidity);
            return 1;
    }

    //for getting meme token data for Landing:
    function getAllMemeTokens() public view returns(memeToken[] memory) {
        memeToken[] memory allTokens = new memeToken[](addressBook.length);
        for (uint i = 0; i < addressBook.length; i++) {
            allTokens[i] = addressToMemeTokenMapping[addressBook[i]];
        }
        return allTokens;
    }
}