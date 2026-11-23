import React, { useEffect, useState } from "react";
import { Form, Input, Radio, Button, Card, Divider, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import PF from "../../objetos/pessoas/PF.mjs";
import PJ from "../../objetos/pessoas/PJ.mjs";
import Endereco from "../../objetos/pessoas/Endereco.mjs";
import Telefone from "../../objetos/pessoas/Telefone.mjs";
import Titulo from "../../objetos/pessoas/Titulo.mjs";
import IE from "../../objetos/pessoas/IE.mjs";

import PFDAOLocal from "../../objetos/dao/PFDAOLocal.mjs";
import PJDAOLocal from "../../objetos/dao/PJDAOLocal.mjs";

import EnderecoFormEX from "./EnderecoFormEX.jsx";
import TelefoneListOO from "./TelefoneListOO.jsx";
import PFForm from "./PFForm.jsx";
import PJForm from "./PJForm.jsx";

export default function PessoaFormOO() {
  const [form] = Form.useForm();
  const { tipo: paramTipo, id } = useParams();
  const navigate = useNavigate();
  const [tipo, setTipo] = useState(paramTipo || "PF");
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit && paramTipo) {
      setTipo(paramTipo);
      const dao = paramTipo === "PF" ? new PFDAOLocal() : new PJDAOLocal();
      const registro = dao.listar().find((item) => item.id === id);

      if (registro) {
        const valoresFormatados = { ...registro };
        if (paramTipo === "PF" && registro.dataNascimento) {
          valoresFormatados.dataNascimento = dayjs(registro.dataNascimento, "YYYY-MM-DD");
        }
        if (paramTipo === "PJ" && registro.ie?.dataRegistro) {
          valoresFormatados.ie = {
            ...registro.ie,
            dataRegistro: dayjs(registro.ie.dataRegistro, "YYYY-MM-DD"),
          };
        }
        form.setFieldsValue(valoresFormatados);
      }
    } else {
      form.resetFields();
      setTipo("PF");
    }
  }, [id, paramTipo, isEdit, form]);

  const onFinish = (values) => {
    const endereco = new Endereco();
    endereco.setCep(values.endereco?.cep);
    endereco.setLogradouro(values.endereco?.logradouro);
    endereco.setBairro(values.endereco?.bairro);
    endereco.setCidade(values.endereco?.cidade);
    endereco.setUf(values.endereco?.uf);
    endereco.setRegiao(values.endereco?.regiao);

    const pessoa = tipo === "PF" ? new PF() : new PJ();
    pessoa.setNome(values.nome);
    pessoa.setEmail(values.email);
    pessoa.setEndereco(endereco);

    (values.telefones || []).forEach((tel) => {
      const t = new Telefone();
      if (t.setDdd(tel.ddd) && t.setNumero(tel.numero)) {
        pessoa.addTelefone(t);
      }
    });

    if (tipo === "PF") {
      pessoa.setCpf(values.cpf);
      pessoa.setDataNascimento(values.dataNascimento?.format("YYYY-MM-DD"));

      const titulo = new Titulo();
      titulo.setNumero(values.titulo?.numero);
      titulo.setZona(values.titulo?.zona);
      titulo.setSecao(values.titulo?.secao);
      pessoa.setTitulo(titulo);

      const dao = new PFDAOLocal();
      isEdit ? dao.atualizar(id, pessoa) : dao.salvar(pessoa);
    } else {
      pessoa.setCnpj(values.cnpj);
      pessoa.setRazaoSocial(values.razaoSocial);

      const ie = new IE();
      ie.setNumero(values.ie?.numero);
      ie.setEstado(values.ie?.estado);
      ie.setDataRegistro(values.ie?.dataRegistro?.format("YYYY-MM-DD"));
      pessoa.setIe(ie);

      const dao = new PJDAOLocal();
      isEdit ? dao.atualizar(id, pessoa) : dao.salvar(pessoa);
    }

    message.success(`Cadastro ${isEdit ? "atualizado" : "salvo"} com sucesso!`);
    navigate("/listar");
  };

  return (
    <Card title={isEdit ? `Editar Pessoa (${tipo})` : "Cadastrar Pessoa"}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Tipo de Pessoa">
          <Radio.Group
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            disabled={isEdit}
          >
            <Radio.Button value="PF">Pessoa Física</Radio.Button>
            <Radio.Button value="PJ">Pessoa Jurídica</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="nome" label="Nome / Nome Fantasia" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="email" label="E-mail" rules={[{ required: true, type: "email" }]}>
          <Input />
        </Form.Item>

        <Divider orientation="left">Endereço</Divider>
        <EnderecoFormEX form={form} />

        <Divider orientation="left">Telefones</Divider>
        <TelefoneListOO />

        <Divider orientation="left">Dados Específicos</Divider>
        {tipo === "PF" ? <PFForm /> : <PJForm />}

        <Form.Item style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit" block>
            {isEdit ? "Atualizar" : "Salvar"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
