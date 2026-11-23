export default class Titulo {
  #numero;
  #zona;
  #secao;

  setNumero(numero) {
    if (numero && numero.trim().length > 0) {
      this.#numero = numero.trim();
      return true;
    }
    return false;
  }
  getNumero() { return this.#numero; }

  setZona(zona) {
    if (zona && zona.trim().length > 0) {
      this.#zona = zona.trim();
      return true;
    }
    return false;
  }
  getZona() { return this.#zona; }

  setSecao(secao) {
    if (secao && secao.trim().length > 0) {
      this.#secao = secao.trim();
      return true;
    }
    return false;
  }
  getSecao() { return this.#secao; }
}
