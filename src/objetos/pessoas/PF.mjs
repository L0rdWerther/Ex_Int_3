import Pessoa from "./Pessoa.mjs";

export default class PF extends Pessoa {
  #cpf;
  #titulo;
  #dataNascimento;

  setCpf(cpf) {
    if (cpf && cpf.replace(/\D/g, "").length === 11) {
      this.#cpf = cpf.trim();
      return true;
    }
    return false;
  }
  getCpf() { return this.#cpf; }

  setTitulo(titulo) {
    if (titulo) {
      this.#titulo = titulo;
      return true;
    }
    return false;
  }
  getTitulo() { return this.#titulo; }

  setDataNascimento(dataNascimento) {
    if (dataNascimento && typeof dataNascimento === "string" && dataNascimento.trim().length > 0) {
      this.#dataNascimento = dataNascimento.trim();
      return true;
    }
    return false;
  }
  getDataNascimento() { return this.#dataNascimento; }
}
