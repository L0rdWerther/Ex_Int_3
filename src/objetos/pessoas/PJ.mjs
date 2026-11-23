import Pessoa from "./Pessoa.mjs";

export default class PJ extends Pessoa {
  #cnpj;
  #ie;
  #razaoSocial;

  setCnpj(cnpj) {
    if (cnpj && cnpj.replace(/\D/g, "").length === 14) {
      this.#cnpj = cnpj.trim();
      return true;
    }
    return false;
  }
  getCnpj() { return this.#cnpj; }

  setIe(ie) {
    if (ie) {
      this.#ie = ie;
      return true;
    }
    return false;
  }
  getIe() { return this.#ie; }

  setRazaoSocial(razaoSocial) {
    if (razaoSocial && typeof razaoSocial === "string" && razaoSocial.trim().length > 0) {
      this.#razaoSocial = razaoSocial.trim();
      return true;
    }
    return false;
  }
  getRazaoSocial() { return this.#razaoSocial; }
}
