# Smart Contract Management

This project integrates the backend to the frontend for Solidity projects. The library used for user interfaces is React.js, while the library used for interacting with the Ethereum blockchain is Ethers.js. The Smart Contract ABI is used by ethers.js to interact with the deployed smart contract.

## Description

The project requires a Metamask account to be connected. It will then retrieve the current balance of the account, then the user can deposit and withdraw 1 Ether from their account. Additionally, this project has a convert balance function that references to the current balance, and then converts it to Wei, Kwei, Mwei, Gwei, Microether, and Milliether.  

## Getting Started

### Executing program

To run this program, you can use Gitpod, an online IDE. To get started, go to the Gitpod website at https://remix.ethereum.org.

Once you are on the Remix website, create a new file by clicking on the "+" icon in the left-hand sidebar. Save the file with a .sol extension (e.g., DegenToken.sol). Copy and paste the following code into the file:
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "hardhat/console.sol";

contract DegenToken is ERC20, Ownable, ERC20Burnable {

    constructor() ERC20("Degen", "DGN") {}

    //mint tokens, accessible by the owner
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    function decimals() override public pure returns (uint8){
        return 0;
    }
    //check balance, accessible by anyone
    function getBalance() external view returns (uint256){   
        return this.balanceOf(msg.sender);
    }
    //transfer tokens, accessible by anyone
    function transferTokens(address _receiver, uint256 _value) external{
        require(balanceOf(msg.sender) >= _value, "You do not have enough Degen Tokens.");
        approve(msg.sender, _value);
        transferFrom(msg.sender, _receiver, _value);
    }
    //burn tokens, accessible by the owner
    function burnTokens(uint256 _value) view  external onlyOwner {
        require(balanceOf(msg.sender) >= _value, "You do not have enough Degen Tokens.");
    }
    //displays store items
    function showStoreItems() external pure returns (string memory){
        return "1. Official Degen NFT - 100 tokens 2. Official Degen T-Shirt - 85 tokens 3. Official Degen Deskmat - 95 tokens";
    }
    //redeem tokens, accessible by players
    function redeemTokens(uint8 _choice) external {
        require(_choice >= 1 && _choice <= 3, "Invalid selection.");

        uint256 userBalance = balanceOf(msg.sender);
        uint256 amountToDeduct;

         if(_choice == 1){
            amountToDeduct = 100;
        } else if(_choice == 2){
            amountToDeduct = 85;
        } else if(_choice == 3){
            amountToDeduct = 95;
        }
        require(userBalance >= amountToDeduct, "You do not have enough Degen Tokens.");
        _burn(msg.sender, amountToDeduct);
    }

}

```
To compile the code, click on the "Solidity Compiler" tab in the left-hand sidebar. Make sure the "Compiler" option is set to "0.8.9" (or another compatible version), and then click on the "Compile DegenToken.sol" button.

Once the code is compiled, you can deploy the contract by clicking on the "Deploy & Run Transactions" tab in the left-hand sidebar. Select the "DegenToken" contract from the dropdown menu, and then click on the "Deploy" button.

Once the contract is deployed, you can interact with it by calling the functions "mintToken", "burnToken", "balanceOf", "redeemTokens", "transferTokens", "decimal", "owner", "name", "symbol", and "showStoreItems". 

## Authors

Kristine Garcia

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
