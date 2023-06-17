import Web3 from "web3";
import Json from "../assets/json/Ico.json";
import { TransformarToWei, actulizarCuenta, TransformWei } from "./Blockchain";
import { determinarChain } from "./Filtrochain";

const web3 = new Web3(window.ethereum);

export class ObjectICO {
  constructor() {
    this.contrato = {};
    this.account = "";
  }

  async load() {
    try {
      const id = await web3.eth.net.getId();
      const deployedNetwork = Json.networks[id];
      this.account = await actulizarCuenta();

      let winner = await determinarChain(deployedNetwork, 1);

      const contrato = new web3.eth.Contract(Json.abi, winner);

      this.contrato = contrato;
      return contrato;
    } catch (error) {
      console.log("error en conexion con VrakkaNFT.jsx: load: ", error);
      return {};
    }
  }

  async get() {
    let current_user_address = await actulizarCuenta();
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
    let weiPrice = amount * TransformarToWei('0.0004');

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
