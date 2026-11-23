export default class PFDAOLocal {
  #chave = "pessoasFisicas";

  listar() {
    const dados = localStorage.getItem(this.#chave);
    return dados ? JSON.parse(dados) : [];
  }

  gerarId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
  }

  toPlain(pf) {
    const end = pf.getEndereco();
    const tit = pf.getTitulo();
    return {
      nome: pf.getNome(),
      email: pf.getEmail(),
      cpf: pf.getCpf(),
      dataNascimento: pf.getDataNascimento(),
      endereco: end ? {
        cep: end.getCep(),
        logradouro: end.getLogradouro(),
        bairro: end.getBairro(),
        cidade: end.getCidade(),
        uf: end.getUf(),
        regiao: end.getRegiao(),
      } : null,
      telefones: pf.getTelefones().map((t) => ({
        ddd: t.getDdd(),
        numero: t.getNumero(),
      })),
      titulo: tit ? {
        numero: tit.getNumero(),
        zona: tit.getZona(),
        secao: tit.getSecao(),
      } : null,
    };
  }

  salvar(pf) {
    const lista = this.listar();
    const registro = { id: this.gerarId(), ...this.toPlain(pf) };
    lista.push(registro);
    localStorage.setItem(this.#chave, JSON.stringify(lista));
    return registro;
  }

  atualizar(id, novoPF) {
    const lista = this.listar();
    const index = lista.findIndex((item) => item.id === id);
    if (index !== -1) {
      lista[index] = { id, ...this.toPlain(novoPF) };
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
