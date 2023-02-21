// your code here:
import { ethers } from "ethers";

const lookupAddresses = ["0xb5d4f343412dc8efb6ff599d790074d0f1e8d430",
    "0x0020c5222a24e4a96b720c06b803fb8d34adc0af",
    "0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392"];

const provider = new ethers.JsonRpcProvider("https://bsc-dataseed1.binance.org/");

interface BSCcontract {
    address : string,
    abi : string[]
}

const swth : BSCcontract = {
    address: "0xc0ecb8499d8da2771abcbf4091db7f65158f1468",
    abi: [
         // Some details about the token
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function decimals() view returns (uint8)",
    
        // Get the account balance
        "function balanceOf(address) view returns (uint)",
    
        // Send some of your tokens to someone else
        "function transfer(address to, uint amount)",
    
        // An event triggered whenever anyone transfers to someone else
        "event Transfer(address indexed from, address indexed to, uint amount)"
    ]
}

async function getBalances () {
    const swthContract = new ethers.Contract(swth.address, swth.abi, provider);
    const decimals : ethers.Numeric = await swthContract.decimals();
    for (const addr of lookupAddresses) {
        const balance = await swthContract.balanceOf(addr);
        console.log(`${addr} ${ethers.formatUnits(balance, decimals)}`);
    }
}

getBalances();
