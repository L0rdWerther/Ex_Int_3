import React from "react";
import { Form, Input, DatePicker, Row, Col } from "antd";

export default function PFForm() {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={12}>
        <Form.Item name="cpf" label="CPF" rules={[{ required: true }]}>
          <Input placeholder="000.000.000-00" maxLength={14} />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12}>
        <Form.Item name="dataNascimento" label="Data de Nascimento" rules={[{ required: true }]}>
          <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
        </Form.Item>
      </Col>
      <Col xs={24} sm={10}>
        <Form.Item name={["titulo", "numero"]} label="Título de Eleitor" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col xs={12} sm={7}>
        <Form.Item name={["titulo", "zona"]} label="Zona" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col xs={12} sm={7}>
        <Form.Item name={["titulo", "secao"]} label="Seção" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
    </Row>
  );
}
