import Web3 from "web3";
import VrakkaJson from "../assets/json/Referido.json";
import { TransformarToWei, actulizarCuenta, TransformWei } from "./Blockchain";
import { determinarChain } from "./FiltroChains";
import { ObjectToken } from "./VRKToken";

const web3 = new Web3(window.ethereum);

export class ContractReferido {
  constructor() {
    this.contrato = {};
    this.account = "";
  }

  async load() {
    try {
      const id = await web3.eth.net.getId();
      const deployedNetwork = VrakkaJson.networks[id];
      this.account = await actulizarCuenta();

      let winner = await determinarChain(deployedNetwork, 0);

      const contrato = new web3.eth.Contract(VrakkaJson.abi, winner);

      this.contrato = contrato;
      return contrato;
    } catch (error) {
      console.log("error en conexion con VrakkaNFT.jsx: load: ", error);
      return {};
    }
  }

  async getPrice(_index) {
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
    let weiPrice = TransformarToWei(price);
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
      return TransformWei(_res);
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
    let wei_price = TransformarToWei(_currentPrice);
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
    const _account = await actulizarCuenta();

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

  async fillDataStaking() {
    const _account = await actulizarCuenta();

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
    const _account = await actulizarCuenta();

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
