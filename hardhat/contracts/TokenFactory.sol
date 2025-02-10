// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./Token.sol";
import "hardhat/console.sol";
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';
import '@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router01.sol';


contract TokenFactory {

    struct memeToken{
        string  name;
        string  symbol;
        string  description;
        string  tokenImageUrl;
        uint fundingRaised;
        address tokenAddress;
        address creatorAddress;

    }
    address[] public addressBook ;

    mapping (address => memeToken) addressToMemeTokenMapping;
    
    uint constant DECIMALS = 10**18;
    uint constant MAX_SUPPLY = 1000000*DECIMALS; //1000000 000000000000000000
    uint constant INIT_SUPPLY = 20*MAX_SUPPLY/100; // 200000 000000000000000000
    uint constant MEMETOKEN_CREATION_FEE = 0.0001 ether;
    uint constant MEMETOKEN_FUNDING_GOAL = 26 ether;
    address constant UNISWAP_V2_FACTORY_ADDRESS = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    address constant UNISWAP_V2_ROUTER_ADDRESS=0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    uint public constant  INITIAL_PRICE = 30000000000000;
    uint public constant K = 8*10**15;
    function createMemeToken(string memory name, string memory symbol, string memory description,string memory imageUrl) public payable returns(address){
        require(msg.value>=MEMETOKEN_CREATION_FEE,"Invalid token creation fee");
        Token memeCoinContract = new Token(name,symbol,INIT_SUPPLY);
        address memeTokenAddress = address(memeCoinContract);
        addressBook.push(memeTokenAddress);
        memeToken memory newCreatedToken = memeToken(name,symbol,description,imageUrl,0,memeTokenAddress,msg.sender);
        
        addressToMemeTokenMapping[memeTokenAddress] = newCreatedToken; 
        console.log(memeTokenAddress);
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
    function costCalculation(uint256 currentSupply, uint256 totalSupply) public pure returns(uint){
        
        uint256 exponent1 = (K*(currentSupply+totalSupply))/10**18;
        uint256 exponent2 = (K*(currentSupply))/10**18;

        uint256 exp1 = exp(exponent1);
        uint256 exp2 = exp(exponent2);

        uint finalCost = (INITIAL_PRICE*10**18*(exp1-exp2))/K;
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
}