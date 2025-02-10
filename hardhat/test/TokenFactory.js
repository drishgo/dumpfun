const chai = require('chai');
const hardhat = require('hardhat');

describe('Token Factory', () => { 
    it("Should create a memeToken successfully", async function(){
        this.timeout(60000*3);

        const tokenFactoryContract = (await hardhat.ethers.deployContract("TokenFactory"));
        await tokenFactoryContract.waitForDeployment();
        
        const tx = await tokenFactoryContract.createMemeToken(
            "BallOfSteel",
            "BOS",
            "balls made of steel",
            "image.png",
            {
                value: hardhat.ethers.parseEther("0.0001")
            }
        );
        await tx.wait();
    });
    it("Should be able to purchase a memeToken successfully", async function(){
        this.timeout(60000*3);

        const tokenFactoryContract = (await hardhat.ethers.deployContract("TokenFactory"));
        await tokenFactoryContract.waitForDeployment();
        
        const tx = await tokenFactoryContract.createMemeToken(
            "BallOfSteel",
            "BOS",
            "balls made of steel",
            "image.png",
            {
                value: hardhat.ethers.parseEther("0.0001")
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