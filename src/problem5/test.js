require('dotenv').config();
const { ethers } = require('ethers');

const ADDR = "0x45bfd1A87E1D666e174cd25E8E701df16a121Eb5";   // your contract address
const ABI = [{
	"inputs": [
	  {
		"internalType": "address",
		"name": "walletAddr",
		"type": "address"
	  },
	  {
		"internalType": "address[]",
		"name": "tokenAddr",
		"type": "address[]"
	  }
	],
	"name": "getBalances",
	"outputs": [
	  {
		"components": [
		  {
			"internalType": "address",
			"name": "token",
			"type": "address"
		  },
		  {
			"internalType": "uint256",
			"name": "balance",
			"type": "uint256"
		  }
		],
		"internalType": "struct Wallet.TokenBalance[]",
		"name": "",
		"type": "tuple[]"
	  }
	],
	"stateMutability": "view",
	"type": "function"
  }];    // your contract ABI

const ADDRESS = "0xFB6D7a969727F86533161daE27103F95c34A78bc"; // some wallet address with token balance
const TOKENS = [    // token contract addresses
	"0x7af963cF6D228E564e2A0aA0DdBF06210B38615D",
	"0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6"
];

// you can use your own RPC provider url (no need to deploy to mainnet); replace API_KEY with own Alchemy API_KEY
const provider = new ethers.providers.AlchemyProvider(network='goerli', process.env.API_KEY);

const test = async () => {
	const contract = new ethers.Contract(ADDR, ABI, provider);

  	const balances = await contract.getBalances(ADDRESS, TOKENS);
	
	return balances;
};

test().then(console.log);