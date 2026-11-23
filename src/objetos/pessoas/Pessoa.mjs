export default class Pessoa {
  #nome;
  #email;
  #endereco;
  #telefones = [];

  setNome(nome) {
    if (nome && nome.trim().length > 0) {
      this.#nome = nome.trim();
      return true;
    }
    return false;
  }

  getNome() {
    return this.#nome;
  }

  setEmail(email) {
    if (email && email.includes("@")) {
      this.#email = email.trim();
      return true;
    }
    return false;
  }

  getEmail() {
    return this.#email;
  }

  setEndereco(endereco) {
    if (endereco) {
      this.#endereco = endereco;
      return true;
    }
    return false;
  }

  getEndereco() {
    return this.#endereco;
  }

  addTelefone(telefone) {
    if (telefone) {
      this.#telefones.push(telefone);
      return true;
    }
    return false;
  }

  getTelefones() {
    return this.#telefones;
  }
}
