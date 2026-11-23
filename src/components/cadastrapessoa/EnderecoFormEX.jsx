import React, { useState } from "react";
import { Form, Input, Row, Col, Spin, message } from "antd";

const calcularRegiao = (uf) => {
  const regioes = {
    Norte: ["AC", "AP", "AM", "PA", "RO", "RR", "TO"],
    Nordeste: ["AL", "BA", "CE", "MA", "PB", "PE", "PI", "RN", "SE"],
    "Centro-Oeste": ["DF", "GO", "MT", "MS"],
    Sudeste: ["ES", "MG", "RJ", "SP"],
    Sul: ["PR", "RS", "SC"],
  };
  for (const [regiao, estados] of Object.entries(regioes)) {
    if (estados.includes(uf?.toUpperCase())) return regiao;
  }
  return "";
};

export default function EnderecoFormEX({ form }) {
  const [loading, setLoading] = useState(false);

  const buscarCep = async (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length !== 8) return;

    setLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        message.warning("CEP não encontrado.");
        return;
      }
      form.setFieldsValue({
        endereco: {
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf,
          regiao: calcularRegiao(data.uf),
        },
      });
    } catch {
      message.error("Erro ao consultar o ViaCEP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Form.Item name={["endereco", "cep"]} label="CEP" rules={[{ required: true }]}>
            <Input placeholder="00000-000" maxLength={9} onBlur={buscarCep} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={16}>
          <Form.Item name={["endereco", "logradouro"]} label="Logradouro" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item name={["endereco", "bairro"]} label="Bairro" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item name={["endereco", "cidade"]} label="Cidade" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col xs={12} sm={4}>
          <Form.Item name={["endereco", "uf"]} label="UF" rules={[{ required: true }]}>
            <Input maxLength={2} />
          </Form.Item>
        </Col>
        <Col xs={12} sm={4}>
          <Form.Item name={["endereco", "regiao"]} label="Região" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Spin>
  );
}
