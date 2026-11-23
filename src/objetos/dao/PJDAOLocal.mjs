export default class PJDAOLocal {
  #chave = "pessoasJuridicas";

  listar() {
    const dados = localStorage.getItem(this.#chave);
    return dados ? JSON.parse(dados) : [];
  }

  gerarId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
  }

  toPlain(pj) {
    const end = pj.getEndereco();
    const ie = pj.getIe();
    return {
      nome: pj.getNome(),
      email: pj.getEmail(),
      cnpj: pj.getCnpj(),
      razaoSocial: pj.getRazaoSocial(),
      endereco: end ? {
        cep: end.getCep(),
        logradouro: end.getLogradouro(),
        bairro: end.getBairro(),
        cidade: end.getCidade(),
        uf: end.getUf(),
        regiao: end.getRegiao(),
      } : null,
      telefones: pj.getTelefones().map((t) => ({
        ddd: t.getDdd(),
        numero: t.getNumero(),
      })),
      ie: ie ? {
        numero: ie.getNumero(),
        estado: ie.getEstado(),
        dataRegistro: ie.getDataRegistro(),
      } : null,
    };
  }

  salvar(pj) {
    const lista = this.listar();
    const registro = { id: this.gerarId(), ...this.toPlain(pj) };
    lista.push(registro);
    localStorage.setItem(this.#chave, JSON.stringify(lista));
    return registro;
  }

  atualizar(id, novoPJ) {
    const lista = this.listar();
    const index = lista.findIndex((item) => item.id === id);
    if (index !== -1) {
      lista[index] = { id, ...this.toPlain(novoPJ) };
      localStorage.setItem(this.#chave, JSON.stringify(lista));
      return true;
    }
    return false;
  }

  excluir(id) {
    const lista = this.listar().filter((item) => item.id !== id);
    localStorage.setItem(this.#chave, JSON.stringify(lista));
  }
}
