import Web3 from "web3";

const web3 = new Web3(window.ethereum);

let currentAccount = null;

export const ConectWallet = async () => {
  // const provider = await web3Modal.connect();
  // let web3 = new Web3(provider);
  if(window.ethereum !=undefined){
    try{
      await window.ethereum.request({ method: "eth_requestAccounts" });
      return true
    }catch (error){
      console.log(error)
      return false
    }
  }else{
    window.open("https://metamask.io/download/");
  }

};

export const disconected = async () => {
  try{
  await window.ethereum.request({method: "disconnect"})
  return false
  }catch (error){
    console.log(error)
  }
}

export const actulizarCuenta = async () => {
  await window.ethereum
    .request({ method: "eth_accounts" })
    .then((accounts) => {
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log("Please connect to MetaMask.");
      } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
      }
    })
    .catch((err) => {
      console.error("Error en actualizarCuenta: ", err);
    });

  if (currentAccount == null) return 0;
  return web3.utils.toChecksumAddress(currentAccount);
};

export const turnOnAccountChange = () => {
  window.ethereum.on("accountsChanged", (acc) => {
    if(acc != 0){
    console.log("cuenta cambiada: ", acc[0]);
    return true
    }else{
      window.location.reload(false);
      console.log('Cuenta desconectada')
      return false
    }
  });
};

export const turnOnChainChange = () => {
  var chain = "";
  window.ethereum.on("chainChanged", (_chainId) => {
    console.log("Cambiando a: ", _chainId);
    chain = _chainId;
   // window.location.reload(false);
  });
  return chain;
};

export const dameCurrentChain = async () => {
  try {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    return chainId;
  } catch (error) {
    return "";
  }
};

export const CheckConexion = async () => {
  var isConnected = false;
  var isInstall = true;

  if (window.ethereum !== undefined) {
    try {
      await window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts) => {
          if (accounts.length != 0) {
            // MetaMask is locked or the user has not connected any accounts
            console.log("Conectado")
            isConnected = true;
          }
        });
    } catch (error) {
      console.log("error CheckConexion: ", error.message);
    }
  } else {
    //The user doesnt have install a web3Wallet
    isInstall = false;
  }
  return { connect: isConnected, install: isInstall };
};

export const ChangeChain = async () => {
  await window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: "0x38" }],
  });
};

export const RequestConexion = async (
  isConnected = () => {},
  web3Installed = false
) => {
  let widhtScreen = window.screen.width;
  //Si la ventana es menor a 820, el usuario esta en un dispositivo movil

  if (widhtScreen < 821) {
    //Es menor a la dimension de un Ipad air, debe ser portatil
    if (web3Installed) {
      let res = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (res.length > 0) isConnected(true);
    } else {
      window.open("https://metamask.app.link/dapp/vrakkanft.com/");
    }
  } else {
    let res = await window.ethereum.request({ method: "eth_requestAccounts" });
    if (res.length > 0) isConnected(true);
  }
};

export const TransformWei = (_num) => {
  try {
    return web3.utils.fromWei(_num);
  } catch (error) {
    console.log("error TransformWei =>", error.message);
    return 0;
  }
};

/*export const TransformarToWei = (_num) => {
  // Supongamos que el tipo de cambio actual entre BNB y ETH es de 1 BNB = 0.01 ETH
const tipoCambioBNB_ETH = 1;

// Valor en BNB que deseas convertir a wei
const valorBNB = 1;

// Calcula el equivalente en ETH
const valorETH = valorBNB * tipoCambioBNB_ETH;

// Convierte el valor en ETH a wei utilizando la función toWei de Web3.js
const valorWei = web3.utils.toWei(valorETH.toString(), 'ether');

console.log(valorWei); // Valor en wei equivalente al valor en BNB
  return valorWei;
};*/

export const TransformarToWei=(_num)=>{
  return web3.utils.toWei(_num)
}
