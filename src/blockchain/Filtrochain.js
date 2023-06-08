import { dameCurrentChain } from "../Blockchain";

export async function determinarChain(deployedNetwork, id) {
  //Old contract Hashima: "0x66cafdD687b83663512bCfC99e36724d86b11C7e"

  let array_binance_mainnet = [
    "0xE4bFD6619823cAf5f9b2CBa0893dA1E3b569c318", //VrakkaNFT
    "0x806ad623c43ecb48CC83B446a864a495A96510fb", //ICO
    "0xA382c1374dE60A0b0E72e9c90B45C0131b94ECc1", //VrakkaToken
  ];

  let array_binance_testnet = [
    "0x3F8af811260a41D37975e2CBe00d9281704d5DB2", //VrakkaNFT
    "0x78A6A7973E6a89fBECF8Ec4AcfD1B95E81fa8D80", //ICO
    "0x3ca292dF226A278A2711465b1a6A74bA8bBa5304", //VrakkaToken
  ];

  var winner = "";
  let chainId = await dameCurrentChain();

  if (chainId == "0x539") {
    //Gananche fake blockchain
    winner = deployedNetwork.address;
  } else if (chainId == "0x38") {
    //Binance smart chain
    winner = array_binance_mainnet[id];
  } else if (chainId == "0x1") {
    //Ethereum
    winner = "0x66cafdD687b83663512bCfC99e36724d86b11C7e";
  } else if (chainId == "0x61") {
    //Binance testnet
    winner = array_binance_testnet[id];
  }
  // else if(chainId=='0x13881'){
  //   //Mumbai testnet
  //   winner=array_mumbai_matic[id]

  // }else if(chainId=='0x3'){
  //   //Mumbai testnet
  //   winner=array_ropsten[id]
  // }
  return winner;
}
