import React, { useState, useEffect } from "react";
import { Table, Radio, Input, Button, Space, Popconfirm, Card, message } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import PFDAOLocal from "../../objetos/dao/PFDAOLocal.mjs";
import PJDAOLocal from "../../objetos/dao/PJDAOLocal.mjs";

export default function ListaPessoas() {
  const [tipo, setTipo] = useState("PF");
  const [filtro, setFiltro] = useState("");
  const [dados, setDados] = useState([]);
  const navigate = useNavigate();

  const carregarDados = () => {
    const dao = tipo === "PF" ? new PFDAOLocal() : new PJDAOLocal();
    setDados(dao.listar());
  };

  useEffect(() => {
    carregarDados();
  }, [tipo]);

  const handleExcluir = (id) => {
    const dao = tipo === "PF" ? new PFDAOLocal() : new PJDAOLocal();
    dao.excluir(id);
    message.success("Registro excluído.");
    carregarDados();
  };

  const dadosFiltrados = dados.filter((item) =>
    item.nome?.toLowerCase().includes(filtro.toLowerCase())
  );

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: tipo === "PF" ? "CPF" : "CNPJ",
      dataIndex: tipo === "PF" ? "cpf" : "cnpj",
      key: "documento",
    },
    {
      title: tipo === "PF" ? "Data de Nascimento" : "Razão Social",
      key: "atributoExtra",
      render: (_, record) =>
        tipo === "PF"
          ? record.dataNascimento
            ? dayjs(record.dataNascimento).format("DD/MM/YYYY")
            : "-"
          : record.razaoSocial || "-",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/visualizar/${tipo}/${record.id}`)}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/editar/${tipo}/${record.id}`)}
          />
          <Popconfirm
            title="Confirma a exclusão?"
            onConfirm={() => handleExcluir(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card title="Listagem de Pessoas">
      <Space style={{ marginBottom: 16, flexWrap: "wrap" }}>
        <Radio.Group value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <Radio.Button value="PF">Pessoa Física</Radio.Button>
          <Radio.Button value="PJ">Pessoa Jurídica</Radio.Button>
        </Radio.Group>
        <Input.Search
          placeholder="Filtrar por nome..."
          allowClear
          onChange={(e) => setFiltro(e.target.value)}
          style={{ width: 250 }}
        />
      </Space>

      <Table
        dataSource={dadosFiltrados}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: true }}
      />
    </Card>
  );
}
