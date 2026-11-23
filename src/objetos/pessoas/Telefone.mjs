export default class Telefone {
  #ddd;
  #numero;

  setDdd(ddd) {
    if (ddd && ddd.replace(/\D/g, "").length === 2) {
      this.#ddd = ddd.trim();
      return true;
    }
    return false;
  }
  getDdd() { return this.#ddd; }

  setNumero(numero) {
    const digits = numero ? numero.replace(/\D/g, "") : "";
    if (digits.length >= 8 && digits.length <= 9) {
      this.#numero = numero.trim();
      return true;
    }
    return false;
  }
  getNumero() { return this.#numero; }
}
