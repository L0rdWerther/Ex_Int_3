import React from "react";
import { Form, Input, DatePicker, Row, Col } from "antd";

export default function PJForm() {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={12}>
        <Form.Item name="cnpj" label="CNPJ" rules={[{ required: true }]}>
          <Input placeholder="00.000.000/0000-00" maxLength={18} />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12}>
        <Form.Item name="razaoSocial" label="Razão Social" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col xs={24} sm={10}>
        <Form.Item name={["ie", "numero"]} label="Inscrição Estadual" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col xs={12} sm={6}>
        <Form.Item name={["ie", "estado"]} label="Estado IE" rules={[{ required: true }]}>
          <Input maxLength={2} />
        </Form.Item>
      </Col>
      <Col xs={12} sm={8}>
        <Form.Item name={["ie", "dataRegistro"]} label="Data de Registro IE" rules={[{ required: true }]}>
          <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
        </Form.Item>
      </Col>
    </Row>
  );
}
