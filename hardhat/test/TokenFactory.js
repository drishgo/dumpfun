const chai = require('chai');
const hardhat = require('hardhat');

describe('Token Factory', () => { 
    it("Should create a memeToken successfully", async function(){
        this.timeout(60000*3); //3 mins

        const tokenFactoryContract = (await hardhat.ethers.deployContract("TokenFactory"));
        await tokenFactoryContract.waitForDeployment();
        
        const tx = await tokenFactoryContract.createMemeToken(
            "BallOfSteel",
            "BOS",
            "balls made of steel",
            "image.png",
            {
                value: hardhat.ethers.parseEther("0.001")
            }
        );
        await tx.wait();
    });
    it("Should be able to purchase a memeToken successfully", async function(){
        this.timeout(60000*3); // setting time out to 3 minutes?

        

        const tokenFactoryContract = (await hardhat.ethers.deployContract("TokenFactory"));
        await tokenFactoryContract.waitForDeployment();
        
        const tx = await tokenFactoryContract.createMemeToken(
            "BallOfSteel",
            "BOS",
            "balls made of steel",
            "image.png",
            {
                value: hardhat.ethers.parseEther("2")
            }
        );
        await tx.wait();

        const memeTokenAddress = await tokenFactoryContract.getAddressFromBook(0);

        const tx2 = await tokenFactoryContract.buyMemeToken(
            memeTokenAddress,
            800000,
            {
                value: hardhat.ethers.parseEther("26")
            }
        );
        await tx2.wait();
    });
    
 });
 describe("Sell Functionality", () => {
    let factory;
    let user1, user2;

    beforeEach(async () => {
        // Get the contract factory
        const TokenFactory = await hardhat.ethers.getContractFactory("TokenFactory");
        
        // Deploy the contract
        factory = await TokenFactory.deploy();
        await factory.deployed();

        // Get signers
        [user1, user2] = await hardhat.ethers.getSigners();

        // Create token and buy some tokens first
        const fee = await factory.MEMETOKEN_CREATION_FEE();
        await factory.connect(user1).createMemeToken("BallOfSteel", "BOS", "balls made of steel", "image.png", {
            value: fee
        });
        tokenAddress = await factory.addressBook(0);
        
        // Buy tokens to enable selling
        const buyAmount = 100;
        const ethRequired = await factory.getBuyCost(tokenAddress, buyAmount);
        await factory.connect(user1).buyMemeToken(tokenAddress, buyAmount, { value: ethRequired });
    });
  
    it("Should allow selling tokens via bonding curve", async () => {
      const sellAmount = 50;
      const ethExpected = await factory.getSellProceeds(tokenAddress, sellAmount);
      
      await expect(
        factory.connect(user1).sellMemeToken(tokenAddress, sellAmount)
      ).to.changeEtherBalance(user1, ethExpected);
    });
  
    it("Should prevent selling after funding goal is met", async () => {
      // Force funding goal to be met
      const largeAmount = 100000;
      const ethNeeded = await factory.getBuyCost(tokenAddress, largeAmount);
      await factory.connect(user2).buyMemeToken(tokenAddress, largeAmount, { value: ethNeeded });
  
      await expect(
        factory.connect(user1).sellMemeToken(tokenAddress, 10)
      ).to.be.revertedWith("Sell via Uniswap");
    });
  });

 