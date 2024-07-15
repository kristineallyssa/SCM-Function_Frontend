import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [balanceInWei, setBalanceInWei] = useState(0);
  const [balanceInGwei, setBalanceInGwei] = useState(0);
  const [balanceInKwei, setBalanceInKwei] = useState(0);
  const [balanceInMwei, setBalanceInMwei] = useState(0);
  const [balanceInMicroether, setBalanceInMicroether] = useState(0);
  const [balanceInMilliether, setBalanceInMilliether] = useState(0);
  const [transferAddress, setTransferAddress] = useState("");


  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async() => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait()
      getBalance();
    }
  }

  const convertBalance = async () => {
    if (atm) {
      try {
        let ethBalance = balance; // Replace this with the actual balance
        //wei
        let weiBalance = ethBalance * 1e18;
        setBalanceInWei(weiBalance);
        //kwei
        let kweiBalance = ethBalance * 1e15;
        setBalanceInKwei(kweiBalance);
        //mwei
        let mweiBalance = ethBalance * 1e12;
        setBalanceInMwei(mweiBalance);
        //gwei
        let gweiBalance = ethBalance * 1e9;
        setBalanceInGwei(gweiBalance);
        //microether
        let microetherBalance = ethBalance * 1e6;
        setBalanceInMicroether(microetherBalance);
        //milliether
        let millietherBalance = ethBalance * 1e3;
        setBalanceInMilliether(millietherBalance);
      } catch (error) {
        console.error('Error converting balance:', error);
      }
    }
  }

  const transferBalance = async () => {
    if (atm) {
      try {
        let tx = await atm.transferBalance(transferAddress, 1);
        await tx.wait()
        setTransferAddress("");
        getBalance();
      } catch (error) {
        console.error("Error transferring balance:", error);
      }
    }
  }


  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>
        <hr></hr>
        <div>
          <input
            type="text"
            placeholder="Recipient Address"
            value={transferAddress}
            onChange={(e) => setTransferAddress(e.target.value)}
          />
          <button onClick={transferBalance}>Transfer 1 ETH</button>
        </div>
        <hr></hr>
        <h3>Convert Balance</h3>
        <button onClick={convertBalance}>Convert</button>
        <br></br><br></br>
        <label>Wei:</label><p> {balanceInWei}</p>
        <label>Kwei:</label><p> {balanceInKwei}</p>
        <label>Mwei:</label><p> {balanceInMwei}</p>
        <label>Gwei:</label><p> {balanceInGwei}</p>
        <label>Microether:</label><p> {balanceInMicroether}</p>
        <label>Milliether:</label><p> {balanceInMilliether}</p>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>Welcome to MetaCash!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
      `}
      </style>
    </main>
  )
}
