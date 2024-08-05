require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = require("./utils/Todo.json");
const path = require("path");
const app = express();

app.use(express.static(__dirname));
app.use(express.json());

const port = process.env.PORT;

// const connectWallet = async () => {

const provider = new ethers.providers.JsonRpcProvider();
const signer = provider.getSigner();
// console.log(signer);
const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);
// console.log(contract);

//   await provider.send("eth_requestAccounts", []);

// };

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./pages/index.html"));
});

app.post("/addTask", async (req, res) => {
  const task = req.body.desc;
  const addDataBlockChain = async () => {
    console.log("Adding task in blockchain network...");
    const tx = await contract.addTask(task);
    await tx.wait();
  };

  await addDataBlockChain(task);
  res.send("The task has been registered in the smart contract");
});

app.post("/changeTask", async (req, res) => {
  const id = req.body.id;
  const changeDataBlockChain = async () => {
    console.log("Adding task in blockchain network...");
    const tx = await contract.addTask(id);
    await tx.wait();
  };

  await changeDataBlockChain(id);
  res.send("The task has been changed in the smart contract");
});

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});
