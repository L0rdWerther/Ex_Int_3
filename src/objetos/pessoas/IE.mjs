export default class IE {
  #numero;
  #estado;
  #dataRegistro;

  setNumero(numero) {
    if (numero && numero.trim().length > 0) {
      this.#numero = numero.trim();
      return true;
    }
    return false;
  }
  getNumero() { return this.#numero; }

  setEstado(estado) {
    if (estado && estado.trim().length === 2) {
      this.#estado = estado.trim().toUpperCase();
      return true;
    }
    return false;
  }
  getEstado() { return this.#estado; }

  setDataRegistro(dataRegistro) {
    if (dataRegistro && dataRegistro.trim().length > 0) {
      this.#dataRegistro = dataRegistro.trim();
      return true;
    }
    return false;
  }
  getDataRegistro() { return this.#dataRegistro; }
}
