const contractAddress = "0x1b195b9cb68aa207fd15c98cb7a2330c935abfd4";
const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_desc",
        type: "string",
      },
    ],
    name: "addTask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "finished",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllStask",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "desc",
            type: "string",
          },
          {
            internalType: "enum Todo.Status",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct Todo.Stask[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getStask",
    outputs: [
      {
        internalType: "string",
        name: "desc",
        type: "string",
      },
      {
        internalType: "enum Todo.Status",
        name: "status",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getStaskCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "removeStask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tasks",
    outputs: [
      {
        internalType: "string",
        name: "desc",
        type: "string",
      },
      {
        internalType: "enum Todo.Status",
        name: "status",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

let showAddress = "";

const connectWallet = async () => {
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      showAddress = await signer.getAddress();
      updateUIForConnectedWallet(showAddress);
      // Initialize smart contract
      //   const contract = new ethers.Contract(
      //     CONTRACT_ADDRESS,
      //     CONTRACT_ABI,
      //     signer
      //   );
    } else {
      console.log("Please install Metamask");
    }
  } catch (err) {
    console.error("Error adding task:", err);
  }
};

const updateUIForConnectedWallet = (address) => {
  const walletAddressElement = document.getElementById("walletAddress");
  const btnConnect = document.getElementById("btnConnect");

  walletAddressElement.style.display = "inline";
  walletAddressElement.textContent = `${address.substring(
    0,
    6
  )}...${address.substring(address.length - 4)}`;

  btnConnect.style.display = "none";
  btnConnect.onclick = disconnectWallet;
};

const updateUIForDisconnectedWallet = () => {
  const walletAddressElement = document.getElementById("walletAddress");
  const btnConnect = document.getElementById("btnConnect");

  walletAddressElement.style.display = "none";
  btnConnect.style.display = "block";
  btnConnect.onclick = connectWallet;

  showAddress = "";
};

const disconnectWallet = () => {
  updateUIForDisconnectedWallet();
};

// Set up event listener for the connect/disconnect button
document.getElementById("btnConnect").addEventListener("click", () => {
  if (showAddress) {
    disconnectWallet();
  } else {
    connectWallet();
  }
});

const getAllTask = async () => {
  let status = document.getElementById("status");
  if (showAddress != 0) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    // Initialize smart contract
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // alert(
    //   (status.innerHTML =
    //     "Please wait,getting all the tasks from the smart contract")
    // );
    status.innerHTML =
      "Please wait,getting all the tasks from the smart contract";
    status.style.color = "#2ecc71";
    const stask = await contract.getAllStask();
    console.log(stask);
  } else {
    // alert((status.innerHTML = "Please install Metamask"));
    status.innerHTML = "Please install/connect Metamask";
    status.style.color = "#c0392b";
  }
};
