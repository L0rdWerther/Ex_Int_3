export default class Endereco {
  #cep;
  #logradouro;
  #bairro;
  #cidade;
  #uf;
  #regiao;

  setCep(cep) {
    if (cep && cep.replace(/\D/g, "").length === 8) {
      this.#cep = cep.trim();
      return true;
    }
    return false;
  }
  getCep() { return this.#cep; }

  setLogradouro(logradouro) {
    if (logradouro && logradouro.trim().length > 0) {
      this.#logradouro = logradouro.trim();
      return true;
    }
    return false;
  }
  getLogradouro() { return this.#logradouro; }

  setBairro(bairro) {
    if (bairro && bairro.trim().length > 0) {
      this.#bairro = bairro.trim();
      return true;
    }
    return false;
  }
  getBairro() { return this.#bairro; }

  setCidade(cidade) {
    if (cidade && cidade.trim().length > 0) {
      this.#cidade = cidade.trim();
      return true;
    }
    return false;
  }
  getCidade() { return this.#cidade; }

  setUf(uf) {
    if (uf && uf.trim().length === 2) {
      this.#uf = uf.trim().toUpperCase();
      return true;
    }
    return false;
  }
  getUf() { return this.#uf; }

  setRegiao(regiao) {
    if (regiao && regiao.trim().length > 0) {
      this.#regiao = regiao.trim();
      return true;
    }
    return false;
  }
  getRegiao() { return this.#regiao; }
}
