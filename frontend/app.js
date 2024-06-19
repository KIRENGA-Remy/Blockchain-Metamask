let web3;
let contract;
let account;

const UserContract = {
  abi: [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_newName",
          "type": "string"
        }
      ],
      "name": "setName",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getName",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ],
    networks: {
      5777: { 
        address: "0x71Ae64041e6f8E219F1cd938C70CcA897Fe29A28"
    }
    }
};

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            account = accounts[0];
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = UserContract.networks[networkId];

            if (deployedNetwork) {
                contract = new web3.eth.Contract(
                    UserContract.abi,
                    deployedNetwork.address
                );
                console.log(contract);
                try {
                    const name = await contract.methods.getName().call();
                    document.getElementById('nameDisplay').innerText = name;
                } catch (error) {
                    console.error("Error calling getName:", error);
                }
            } else {
                console.error("Contract not deployed on the detected network.");
            }
        } catch (error) {
            console.error("Error connecting to MetaMask or getting account information:", error);
        }
    } else {
        console.error("MetaMask not detected.");
    }
});

async function handleSetName() {
    if (!contract) return;
    const newName = document.getElementById('nameInput').value;
    try {
        await contract.methods.setName(newName).send({ from: account, gas: 3000000 });
        document.getElementById('nameDisplay').innerText = newName;
    } catch (error) {
        console.error("Error setting name:", error);
    }
}

async function handleGetName() {
    if (!contract) return;
    try {
        const updatedName = await contract.methods.getName().call();
        document.getElementById('nameDisplay').innerText = updatedName;
    } catch (error) {
        console.error("Error getting name:", error);
    }
}
