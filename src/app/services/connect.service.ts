import { Injectable } from '@angular/core';
import Web3 from 'web3';
import IcoJson from '../../assets/json/Ico.json';
import VrakkaJson from "../../assets/json/VrakkaNFT.json";
import Vrakka from "../../assets/json/Vrk.json";
import referido from "../../assets/json/Referido.json";
import { AbiItem } from 'web3-utils'

declare const window: any;
const web3 = new Web3(window.ethereum);

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class ConnectService {
  isConnected: boolean = false;
  isInstalled: boolean = false;
  seccion: String;
  indice = 0; // Inicializa el índice en 0
  saltosMaximos = 1; // Establece la cantidad máxima de secciones que se pueden saltar en un solo desplazamiento
  timerId: any; // Variable para almacenar el ID del temporizador

  observer() {
    const p1 = document.querySelector('.one');
    const p2 = document.querySelector('.two');
    const p3 = document.querySelector('.three');
    const p4 = document.querySelector('.four');
    const p5 = document.querySelector('.five');
    const p6 = document.querySelector('.six');
    const p7 = document.querySelector('.seven');
    const p8 = document.querySelector('.eight');

    const carga = (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
          entrada.target.classList.remove('noVisible');
        } else {
          entrada.target.classList.remove('visible');
          entrada.target.classList.add('noVisible');
        }
      });
    };

    const observador = new IntersectionObserver(carga, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    });

    observador.observe(p1);
    observador.observe(p2);
    observador.observe(p3);
    observador.observe(p4);
    observador.observe(p5);
    observador.observe(p6);
    observador.observe(p7);
    observador.observe(p8);
  }

  constructor() {}

  wheel() {
    document.addEventListener('wheel', (event) => {
      const delta = Math.sign(event.deltaY);

      clearTimeout(this.timerId);

      this.timerId = setTimeout(() => {
        const windowWidth = window.innerWidth;
        const scrollPosition = window.scrollX;
        const currentIndex = Math.floor(scrollPosition / windowWidth);

        if (delta > 0 && currentIndex < 7) {
          this.indice = Math.min(currentIndex + this.saltosMaximos, 7);
        } else if (delta < 0 && currentIndex > 0) {
          this.indice = Math.max(currentIndex - this.saltosMaximos, 0);
        }

        const secciones = document.getElementsByClassName('slide-H');
        const seccionActual = secciones[this.indice];

        if (seccionActual) {
          seccionActual.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
          console.log("Seccion actual: ", seccionActual)
        }
      }, 200);
    });
  }
}



@Injectable()
export class Blockchain {
  currentAccount: string | null = null;

  ConectWallet = async () => {
    if (window.ethereum !== undefined) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      window.open('https://metamask.io/download/');
      return false;
    }
  };

  disconected = async (): Promise<void> => {
    try {
      await window.ethereum.request({ method: 'disconnect' });
    } catch (error) {
      console.log(error);
    }
  };

  actulizarCuenta = async (): Promise<string | number> => {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });
      if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
      } else if (accounts[0] !== this.currentAccount) {
        this.currentAccount = accounts[0];
      }
    } catch (err) {
      console.error('Error en actualizarCuenta: ', err);
    }

    if (this.currentAccount === null) return 0;
    return web3.utils.toChecksumAddress(this.currentAccount);
  };

  turnOnAccountChange = (): void => {
    window.ethereum.on('accountsChanged', (acc) => {
      if (acc !== 0) {
        console.log('cuenta cambiada: ', acc[0]);
        return true;
      } else {
        window.location.reload(false);
        console.log('Cuenta desconectada');
        return false;
      }
    });
  };

  turnOnChainChange = (): string => {
    let chain = '';
    window.ethereum.on('chainChanged', (_chainId) => {
      console.log('Cambiando a: ', _chainId);
      chain = _chainId;
      // window.location.reload(false);
    });
    return chain;
  };

  dameCurrentChain = async (): Promise<string> => {
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      return chainId;
    } catch (error) {
      return '';
    }
  };

  CheckConexion = async (): Promise<{ connect: boolean; install: boolean }> => {
    let isConnected = false;
    let isInstall = true;

    if (window.ethereum !== undefined) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        if (accounts.length !== 0) {
          console.log('Conectado');
          isConnected = true;
        }
      } catch (error) {
        console.log('error CheckConexion: ', error.message);
      }
    } else {
      // The user doesn't have a web3 wallet installed
      isInstall = false;
    }
    return { connect: isConnected, install: isInstall };
  };

  ChangeChain = async (): Promise<void> => {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x38' }],
    });
  };

  RequestConexion = async (
    isConnected: (value: boolean) => void,
    web3Installed: boolean = false
  ): Promise<void> => {
    const screenWidth = window.screen.width;

    if (screenWidth < 821) {
      if (web3Installed) {
        const res = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        if (res.length > 0) isConnected(true);
      } else {
        window.open('https://metamask.app.link/dapp/vrakkanft.com/');
      }
    } else {
      const res = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (res.length > 0) isConnected(true);
    }
  };

  TransformWei = (_num: string): string | number => {
    try {
      return web3.utils.fromWei(_num);
    } catch (error) {
      console.log('error TransformWei =>', error.message);
      return 0;
    }
  };

  TransformarToWei = (_num: string): string => {
    return web3.utils.toWei(_num);
  };
}

@Injectable()
export class Filtrochain {
blockchain =  new Blockchain();
async determinarChain(deployedNetwork, id) {
    //Old contract Hashima: "0x66cafdD687b83663512bCfC99e36724d86b11C7e"

    let array_binance_mainnet = [
      "0xD18eaC62Ede52165125252c0e8444524c23cB074",
      //"0xE4bFD6619823cAf5f9b2CBa0893dA1E3b569c318", //VrakkaNFT
      "0x806ad623c43ecb48CC83B446a864a495A96510fb", //ICO
      "0xA382c1374dE60A0b0E72e9c90B45C0131b94ECc1", //VrakkaToken
    ];

    let array_binance_testnet = [
      "0x4eb7EB968f7212AB5A1E122d8734B48379025A58", //VrakkaNFT
      "0x78A6A7973E6a89fBECF8Ec4AcfD1B95E81fa8D80", //ICO
      "0x3ca292dF226A278A2711465b1a6A74bA8bBa5304", //VrakkaToken
    ];

    var winner = "";
    let chainId = await this.blockchain.dameCurrentChain();

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
}

@Injectable()
export class ObjectICO {
  Blockchain =  new Blockchain();
  Filtrochain = new Filtrochain();
    contrato: any = {};
    account: any = "";


  async load() {
    try {
      const id = await web3.eth.net.getId();
      const deployedNetwork = IcoJson.networks[id];
      this.account = await this.Blockchain.actulizarCuenta();

      let winner = await this.Filtrochain.determinarChain(deployedNetwork, 1);

      const contrato = new web3.eth.Contract(IcoJson.abi as AbiItem[], winner);


      this.contrato = contrato;
      return contrato;
    } catch (error) {
      console.log("error en conexion con VrakkaNFT.jsx: load: ", error);
      return {};
    }
  }

  async get() {
    let current_user_address = await this.Blockchain.actulizarCuenta();
    let totalAmount = await this.total();
    var array = [];

    for (let index = 1; index < parseInt(totalAmount) + 1; index++) {
      let who = await this.ownerOf(index);
      if (who == current_user_address) {
        let returnedObject = await this.getData(index);
        if (returnedObject != null) array.push(returnedObject);

        // break
      }
    }

    return array;
  }

  async mint(amount) {
    let _rate = await this.rate();
    let weiPrice=amount*_rate*4

    try {
      var _res = await this.contrato.methods
        .publicMinting(amount)
        .send({ from: this.account, value: weiPrice });
      return _res.status;
    } catch (error) {
      console.log("error ICO.jsx mint: ", error);
      return false;
    }
  }

  async rate() {
    try {
      var _res = await this.contrato.methods.getRate().call();
      return _res;
    } catch (error) {
      console.log("error en ICO.jsx rate:", error);
      return "0";
    }
  }

  async total() {
    try {
      var _res = await this.contrato.methods.getTotal().call();
      return _res;
    } catch (error) {
      console.log("error en ICO.jsx total:", error);
      return 0;
    }
  }

  async ownerOf(_index) {
    try {
      var _res = await this.contrato.methods.ownerOf(_index).call();
      return _res;
    } catch (error) {
      // console.log('error en ICO.jsx ownerOf:',error)
      return 0;
    }
  }

  async getData(_index) {
    try {
      var _res = await this.contrato.methods.get(_index).call();
      return _res;
    } catch (error) {
      console.log("error en ICO.jsx getData:", error);
      return null;
    }
  }
}

@Injectable()
export class ObjectVrakkaNFT {
  Blockchain =  new Blockchain();
  Filtrochain = new Filtrochain();
    contrato: any = {};
    account: any = "";

  async load() {
    try {
      const id = await web3.eth.net.getId();
      //console.log("0x"+id.toString());
      const deployedNetwork = VrakkaJson.networks[id];
      this.account = await this.Blockchain.actulizarCuenta();

      let winner = await this.Filtrochain.determinarChain(deployedNetwork, 0);

      const contrato = new web3.eth.Contract(
        VrakkaJson.abi as AbiItem[], // Llama el contrato ABI
        winner
      );

      this.contrato = contrato;
      return contrato;
    } catch (error) {
      console.log("error en conexion con VrakkaNFT.jsx: load: ", error);
      return {};
    }
  }

  async get(_index) {
    // el tipo de nft que pertenese
    try {
      var _hashi = await this.contrato.methods.get(_index).call();
      return _hashi;
    } catch (error) {
      console.log("error en VrakkaNFT.jsx ,get: ", error);
      return {};
    }
  }

  async getClass(_index) {
    // el tipo de nft a la que pertenese
    try {
      var _hashi = await this.contrato.methods.getClass(_index).call();
      return _hashi;
    } catch (error) {
      console.log("error en VrakkaNFT.jsx ,get: ", error);
      return {};
    }
  }

  async buy(_index, price) {
    // el num de nft a vender
    this.load()
    try {
      var _res = await this.contrato.methods
        .buyToken(_index)
        .send({ from: this.account, value: price });
      return _res.status;
    } catch (error) {
      console.log("error buy VrakkaNFT.jsx: ", error);
      return false;
    }
  }

  async mint() {
    const price = await this.getPrice();
    try {
      var _res = await this.contrato.methods
        .publicMinting()
        .send({ from: this.account, value: price});
      return _res.status;
    } catch (error) {
      console.log("error VrakkaNFT.jsx mint: ", error);
      return false;
    }
  }

  async privateMinting(receiver, price, forSale) {
    try {
      var _res = await this.contrato.methods
        .privateMinting(receiver, price, forSale)// Cambio
        .send({ from: this.account});
      return _res.status;
    } catch (error) {
      console.log("error VrakkaNFT.jsx mint: ", error);
      return false;
    }
  }

  async aprovar(_address, _index) {
    // Dar permisos a otros usuarios para el uso del nft
    try {
      var _res = await this.contrato.methods
        .approve(_address, _index)
        .send({ from: this.account });
      return _res.status;
    } catch (error) {
      return false;
    }
  }

  async balance(_account) {
    // saldo de la cuenta del cliente
    try {
      var _bal = await this.contrato.methods.balanceOf(_account).call();
      return _bal;
    } catch (error) {
      console.log(
        "error en HashimaContract.jsx: balanceHashimasCliente: ",
        error
      );
      return {};
    }
  }

  async total() {
    try {
      var _res = await this.contrato.methods.getTotal().call();
      return _res;
    } catch (error) {
      console.log("error en VrakkaNFT.jsx total:", error);
      return 0;
    }
  }

  async getPrice() {
    //Sacar el precio
    try {
      var _res = await this.contrato.methods.getPrice().call();
      return _res //TransformWei(_res);
    } catch (error) {
      console.log("error en VrakkaNFT.jsx getPrice:", error);
      return 0;
    }
  }

  async getURI(_tokenId) {
    try {
      var _resultado = await this.contrato.methods.tokenURI(_tokenId).call();
      return _resultado;
    } catch (error) {
      return false;
    }
  }

  async changeSaleState(_index) {
    // El input ya viene en wei, no es necesario convertirlo
    try {
      var _res = await this.contrato.methods
        .toggleForSale(_index)
        .send({ from: this.account });
      return _res.status;
    } catch (error) {
      return false;
    }
  }

  async changePrice(_index, _currentPrice) {
    // El input no viene en wei, es necesario convertirlo
    let wei_price = this.Blockchain.TransformarToWei(_currentPrice);
    try {
      var _res = await this.contrato.methods
        .changePrice(_index, wei_price)
        .send({ from: this.account });
      return _res.status;
    } catch (error) {
      console.log("error VrakkaNFT.jsx change: ", error.message);
      return false;
    }
  }

  async changePriceAndState(_index, _currentPrice) {
    // El input ya viene en wei, no es necesario convertirlo
    try {
      var _res = await this.contrato.methods
        .toggleForSaleAndPrice(_index, _currentPrice)
        .send({ from: this.account });
      return _res.status;
    } catch (error) {
      console.log("error al cambiar le precio del hashima: ", error.message);
      return false;
    }
  }

  async safeTransfer(account, _to, _tokenId) {
    try {
      var _res = await this.contrato.methods
        .safeTransferFrom(this.account, _to, _tokenId)
        .send({ from: account });
      return _res;
    } catch (error) {
      console.log("error en Hashima Contract: ", error);
      return {};
    }
  }

  async fillData() {
    const _account = await this.Blockchain.actulizarCuenta();

    var _total = await this.total();

    var _mycollection = [];

    for (let index = 0; index < _total + 1; index++) {
      try {
        var obtein_data = await this.get(index);
        if (
          obtein_data["currentOwner"] !=
          "0x0000000000000000000000000000000000000000"
        ) {
          if (obtein_data["currentOwner"] == _account) {
            _mycollection.push(obtein_data);
          }
        }
      } catch (error) {
        break;
      }
    }
    return _mycollection;
  }

  /*async fillDataStaking() {
    const _account = await this.Blockchain.actulizarCuenta();

    var _total = await this.total();

    let token = new ObjectToken();
    let contrato_token = await token.load();

    var _mycollection = [];

    for (let index = 0; index < _total + 1; index++) {
      try {
        var obtein_data = await this.get(index);
        if (
          obtein_data["currentOwner"] !=
          "0x0000000000000000000000000000000000000000"
        ) {
          //Filtro para Vrakka´s que estan en 'Staking'
          if (obtein_data["currentOwner"] == contrato_token._address) {
            if (obtein_data["previousOwner"] == _account) {
              _mycollection.push(obtein_data);
            }
          }
        }
      } catch (error) {
        break;
      }
    }
    return _mycollection;
  }*/

  async fillMarket() {
    const _account = await this.Blockchain.actulizarCuenta();

    var _total = await this.total();

    var _data = [];

    for (let index = 0; index < _total + 1; index++) {
      try {
        var vrakka_data = await this.get(index);
        if (
          vrakka_data["currentOwner"] !=
          "0x0000000000000000000000000000000000000000"
        ) {
          // let _current_uri=await this.getURI(vrakka_data[0])

          _data.push(vrakka_data);

          // await save(
          //     vrakka_data[0],
          //     vrakka_data['currentOwner'],
          //     vrakka_data[2],
          //     vrakka_data['price'],
          //     vrakka_data['forSale'],
          //     vrakka_data[5],//Block number
          //     vrakka_data[6],//Time unix
          //     vrakka_data[7],//Vrakka class/type
          //     _current_uri
          //     )
        }
      } catch (error) {
        break;
      }
    }
    return _data;
  }
}

@Injectable()
export class ObjectToken {

  Blockchain =  new Blockchain();
  Filtrochain = new Filtrochain();
    contrato: any = {};
    account: any = "";

  async load() {
    try {
      const id = await web3.eth.net.getId();
      const deployedNetwork = VrakkaJson.networks[id];
      this.account = await this.Blockchain.actulizarCuenta();

      let winner = await this.Filtrochain.determinarChain(deployedNetwork, 2);

      const contrato = new web3.eth.Contract(Vrakka.abi as AbiItem[], winner);

      this.contrato = contrato;
      return contrato;
    } catch (error) {
      console.log("error en conexion con VrakkaNFT.jsx: load: ", error);
      return {};
    }
  }

  async claim(tokenId) {
    try {
      var _res = await this.contrato.methods
        .claimSupply(tokenId)
        .send({ from: this.account });
      return _res.status;
    } catch (error) {
      console.log("error VRK Token.jsx claim: ", error);
      return false;
    }
  }

  async deposit(tokenId) {
    try {
      var _res = await this.contrato.methods
        .deposit(tokenId)
        .send({ from: this.account });
      return _res.status;
    } catch (error) {
      console.log("error VRK Token.jsx deposit for staking: ", error);
      return false;
    }
  }

  async aprovar(_address, _index) {
    try {
      var _res = await this.contrato.methods
        .approve(_address, _index)
        .send({ from: this.account });
      return _res.status;
    } catch (error) {
      return false;
    }
  }

  async balance(_account) {
    try {
      var _bal = await this.contrato.methods.balanceOf(_account).call();
      return _bal;
    } catch (error) {
      console.log("error en VRKToken.jsx: balance: ", error.message);
      return "0";
    }
  }

  async calculateReward(_address, _tokenId, messageError = "no") {
    console.log("address ", _address, "token id. ", _tokenId);
    try {
      var _res = await this.contrato.methods
        .calculateReward(_address, _tokenId)
        .call();
      return _res;
    } catch (error) {
      console.log("error calculateReward Staking.js: ", error, messageError);
      return 0;
    }
  }

  async isStaking(_tokenId) {
    try {
      var _res = await this.contrato.methods.onStaking(_tokenId).call();
      return _res;
    } catch (error) {
      console.log("error al obtener isStaking en Staking.js:", error);
      return 0;
    }
  }

  async retirar(_tokenId) {
    try {
      var _res = await this.contrato.methods
        .withdraw(_tokenId)
        .send({ from: this.account });
      return _res.status;
    } catch (error) {
      console.log("error retirar: ", error);
      return false;
    }
  }
}

@Injectable()
export class ContractReferido {
  Blockchain =  new Blockchain();
  Filtrochain = new Filtrochain();
    contrato: any = {};
    account: any = "";

  async load() {
    try {
      const id = await web3.eth.net.getId();
      const deployedNetwork = referido.networks[id];
      this.account = await this.Blockchain.actulizarCuenta();

      let winner = await this.Filtrochain.determinarChain(deployedNetwork, 0);

      const contrato = new web3.eth.Contract(referido.abi as AbiItem[], winner);

      this.contrato = contrato;
      return contrato;
    } catch (error) {
      console.log("error en conexion con VrakkaNFT.jsx: load: ", error);
      return {};
    }
  }

  async getPrice1(_index) {
    try {
      var _price = await this.contrato.methods.getPrice().call();
      return _price;
    } catch (error) {
      console.log("error en ContractReferido.jsx ,get: ", error);
      return {};
    }
  }

  async buy(_index, price) {
    try {
      var _res = await this.contrato.methods
        .buyToken(_index)
        .send({ from: this.account, value: price });
      return _res.status;
    } catch (error) {
      console.log("error buy VrakkaNFT.jsx: ", error);
      return false;
    }
  }

  async mint(price, URI_Image) {
    let weiPrice = this.Blockchain.TransformarToWei(price);
    try {
      var _res = await this.contrato.methods
        .PublicMinting(URI_Image)
        .send({ from: this.account, value: weiPrice });
      return _res.status;
    } catch (error) {
      console.log("error VrakkaNFT.jsx mint: ", error);
      return false;
    }
  }

  async aprovar(_address, _index) {
    try {
      var _res = await this.contrato.methods
        .approve(_address, _index)
        .send({ from: this.account });
      return _res.status;
    } catch (error) {
      return false;
    }
  }

  async balance(_account) {
    try {
      var _bal = await this.contrato.methods.balanceOf(_account).call();
      return _bal;
    } catch (error) {
      console.log(
        "error en HashimaContract.jsx: balanceHashimasCliente: ",
        error
      );
      return {};
    }
  }

  async total() {
    try {
      var _res = await this.contrato.methods.getTotal().call();
      return _res;
    } catch (error) {
      console.log("error en VrakkaNFT.jsx total:", error);
      return 0;
    }
  }

  async getPrice() {
    try {
      var _res = await this.contrato.methods.getPrice().call();
      return this.Blockchain.TransformWei(_res);
    } catch (error) {
      console.log("error en VrakkaNFT.jsx getPrice:", error);
      return 0;
    }
  }

  async getURI(_tokenId) {
    try {
      var _resultado = await this.contrato.methods.tokenURI(_tokenId).call();
      return _resultado;
    } catch (error) {
      return false;
    }
  }

  async changeSaleState(_index) {
    // El input ya viene en wei, no es necesario convertirlo
    try {
      var _res = await this.contrato.methods
        .toggleForSale(_index)
        .send({ from: this.account });
      return _res.status;
    } catch (error) {
      return false;
    }
  }

  async changePrice(_index, _currentPrice) {
    // El input no viene en wei, es necesario convertirlo
    let wei_price = this.Blockchain.TransformarToWei(_currentPrice);
    try {
      var _res = await this.contrato.methods
        .changePrice(_index, wei_price)
        .send({ from: this.account });
      return _res.status;
    } catch (error) {
      console.log("error VrakkaNFT.jsx change: ", error.message);
      return false;
    }
  }

  async changePriceAndState(_index, _currentPrice) {
    // El input ya viene en wei, no es necesario convertirlo
    try {
      var _res = await this.contrato.methods
        .toggleForSaleAndPrice(_index, _currentPrice)
        .send({ from: this.account });
      return _res.status;
    } catch (error) {
      console.log("error al cambiar le precio del hashima: ", error.message);
      return false;
    }
  }

  async safeTransfer(account, _to, _tokenId) {
    try {
      var _res = await this.contrato.methods
        .safeTransferFrom(this.account, _to, _tokenId)
        .send({ from: account });
      return _res;
    } catch (error) {
      console.log("error en Hashima Contract: ", error);
      return {};
    }
  }

 /* async fillData() {
    const _account = await this.Blockchain.actulizarCuenta();

    var _total = await this.total();

    var _mycollection = [];

    for (let index = 0; index < _total + 1; index++) {
      try {
        var obtein_data = await this.get(index);
        if (
          obtein_data["currentOwner"] !=
          "0x0000000000000000000000000000000000000000"
        ) {
          if (obtein_data["currentOwner"] == _account) {
            _mycollection.push(obtein_data);
          }
        }
      } catch (error) {
        break;
      }
    }
    return _mycollection;
  }

  /*async fillDataStaking() {
    const _account = await this.Blockchain.actulizarCuenta();

    var _total = await this.total();

    let token = new ObjectToken();
    let contrato_token = await token.load();

    var _mycollection = [];

    for (let index = 0; index < _total + 1; index++) {
      try {
        var obtein_data = await this.get(index);
        if (
          obtein_data["currentOwner"] !=
          "0x0000000000000000000000000000000000000000"
        ) {
          //Filtro para Vrakka´s que estan en 'Staking'
          if (obtein_data["currentOwner"] == contrato_token._address) {
            if (obtein_data["previousOwner"] == _account) {
              _mycollection.push(obtein_data);
            }
          }
        }
      } catch (error) {
        break;
      }
    }
    return _mycollection;
  }

  async fillMarket() {
    const _account = await this.Blockchain.actulizarCuenta();

    var _total = await this.total();

    var _data = [];

    for (let index = 0; index < _total + 1; index++) {
      try {
        var vrakka_data = await this.get(index);
        if (
          vrakka_data["currentOwner"] !=
          "0x0000000000000000000000000000000000000000"
        ) {
          // let _current_uri=await this.getURI(vrakka_data[0])

          _data.push(vrakka_data);

          // await save(
          //     vrakka_data[0],
          //     vrakka_data['currentOwner'],
          //     vrakka_data[2],
          //     vrakka_data['price'],
          //     vrakka_data['forSale'],
          //     vrakka_data[5],//Block number
          //     vrakka_data[6],//Time unix
          //     vrakka_data[7],//Vrakka class/type
          //     _current_uri
          //     )
        }
      } catch (error) {
        break;
      }
    }
    return _data;
  }*/
}
