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

// Initialize provider and signer
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
// const provider = new ethers.providers.Web3Provider(window.ethereum);
const privateKey = process.env.PRIVATE_KEY; // Ensure you have a private key for the signer
// const wallet = new ethers.Wallet(privateKey, provider);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./pages/index.html"));
});

app.post("/addTask", async (req, res) => {
  const task = req.body.desc;
  console.log(task);
  try {
    console.log(contract);
    console.log("Adding task in blockchain network...");
    const tx = await contract.addTask(task);
    console.log(tx);
    await tx.wait();
    res.send("The task has been registered in the smart contract");
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).send("Failed to add the task to the smart contract");
  }
});

app.post("/changeTask", async (req, res) => {
  try {
    const id = req.body.id;
    // Make sure to use the correct method for updating a task
    console.log("Changing task in blockchain network...");
    const tx = await contract.changeTask(id); // Assuming you have a `changeTask` method in your contract
    await tx.wait();
    res.send("The task has been changed in the smart contract");
  } catch (error) {
    console.error("Error changing task:", error);
    res.status(500).send("Failed to change the task in the smart contract");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
