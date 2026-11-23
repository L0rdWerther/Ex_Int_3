import React from "react";
import { Form, Input, Button, Space } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

export default function TelefoneListOO() {
  return (
    <Form.List name="telefones">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
              <Form.Item
                {...restField}
                name={[name, "ddd"]}
                rules={[{ required: true, message: "Informe o DDD" }]}
              >
                <Input placeholder="DDD" maxLength={2} style={{ width: 70 }} />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, "numero"]}
                rules={[{ required: true, message: "Informe o número" }]}
              >
                <Input placeholder="Número" maxLength={10} />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Adicionar Telefone
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
}
