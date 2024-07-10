# Smart Contract Management

This project integrates the backend to the frontend for Solidity projects. The library used for user interfaces is React.js, while the library used for interacting with the Ethereum blockchain is Ethers.js. The Smart Contract ABI is used by ethers.js to interact with the deployed smart contract.

## Description

The project requires a Metamask account to be connected. It will then retrieve the current balance of the account, then the user can deposit and withdraw 1 Ether from their account. Additionally, this project has a convert balance function that references to the current balance, and then converts it to Wei, Kwei, Mwei, Gwei, Microether, and Milliether.  

## Getting Started

### Executing program

To run this program, you can use Gitpod, an online IDE. To get started, go to the Remix website at https://gitpod.io/workspaces.

Once you are on the Gitpod website, clone the github to your workspace.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

## Authors

Kristine Garcia

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
