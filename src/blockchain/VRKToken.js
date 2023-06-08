export class ObjectToken {
  constructor() {
    this.contrato = {};
    this.account = "";
  }

  async load() {
    try {
      const id = await web3.eth.net.getId();
      const deployedNetwork = VrakkaJson.networks[id];
      this.account = await actulizarCuenta();

      let winner = await determinarChain(deployedNetwork, 2);

      const contrato = new web3.eth.Contract(VrakkaJson.abi, winner);

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
