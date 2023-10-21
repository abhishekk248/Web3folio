import React, { useState } from "react";
import { ethers } from "ethers";
import './App.css'
import axios from "axios";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState(5);
  const [user1, setUser1] = useState("0x76CF8A55b94AD7D81b42167791737968d442ADD3");
  const [user2, setUser2] = useState("0x812A8153457abb2f2Ce51a99258e6ceFb5Cb780D");
  const [showUser1Info, setShowUser1Info] = useState(true);



  // const loadTransactions = async () => {
  //   // Replace with the address of your Ethereum account
  //   const senderAddress = "0xcCDFfb39d0A4Cc3498f806e95E2a149868ab3AaA";
  //   const response = await axios.get(
  //     `http://localhost:7545/api?module=account&action=txlist&address=${senderAddress}&startblock=0&endblock=99999999&sort=desc`
  //   );

  //   if (response.data.status === "1") {
  //     setTransactions(response.data.result);
  //   } else {
  //     console.error("Error fetching transactions:", response.data.message);
  //   }
  // };

  const returnFunds = async () => {
    // try {
    //   const provider = new ethers.providers.JsonRpcProvider("http://localhost:7545");

    //   // Store your private key securely using environment variables or a config file
    //   const privateKey = process.env.REACT_APP_PRIVATE_KEY;

    //   const wallet = new ethers.Wallet("b90291c5c46b53cbf1c384c9aad6ad79c66683b58b10488a5ee6d94e5b03ea0b", provider);

    if (!window.ethereum)
    throw new Error("No crypto wallet found. Please install it.");
    await window.ethereum.send("eth_requestAccounts");
    // Your code to create the provider and signer
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer);
    
    // Rest of your code
  console.log("Sending money...");
  console.log("Recipient Address:", recipientAddress);

  const gasPrice = ethers.utils.parseUnits("10", "gwei"); // Customize the gas price

  const tx = await signer.sendTransaction({
    to: user1,
    value: ethers.utils.parseEther(amount.toString()),
    gasPrice: ethers.utils.parseUnits("10", "gwei"), 
  });
  console.log(tx);
  setShowUser1Info(false);


      console.log("Transaction hash:", tx.hash);
      alert("Transaction sent successfully!");
    //} //catch (error) {
    //   console.error("Error sending transaction:", error.message);
    //   alert("Error sending transaction: " + error.message);
    // }
  };

  return (
    <div className="App">
      <h1>Ethereum Transactions</h1>
      {/* <button onClick={loadTransactions}>Fetch Transactions</button> */}
      <div>
        {transactions.map((tx) => (
          <div key={tx.hash}>
            <p>Block Number: {tx.blockNumber}</p>
            <p>Transaction Hash: {tx.hash}</p>
            <p>Value (ETH): {ethers.utils.formatEther(tx.value)}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Return Funds</h2>

        {/* //////////////////////////////// */}
      
        {showUser1Info && (
        <div>
          <h3> Address: {user1}</h3>
          <h2>Balance: 5 ETH</h2>
          <button onClick={returnFunds}>Return</button>
        </div>
      )}
        {/* ////////////////////////////// */}

        <h3>Address: {user2}</h3>
      <h2>Balance: {"5"} ETH</h2>
      <button onClick={returnFunds}>Return</button>
        <br></br>



      </div>
    </div>
  );
}

export default App;
