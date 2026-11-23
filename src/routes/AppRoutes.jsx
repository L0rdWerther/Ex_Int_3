import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout.jsx";
import PessoaFormOO from "../components/cadastrapessoa/PessoaFormOO.jsx";
import ListaPessoas from "../components/listapessoas/ListaPessoas.jsx";
import VisualizaPessoa from "../components/visualizapessoa/VisualizaPessoa.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/cadastrar" replace />} />
        <Route path="cadastrar" element={<PessoaFormOO />} />
        <Route path="listar" element={<ListaPessoas />} />
        <Route path="visualizar/:tipo/:id" element={<VisualizaPessoa />} />
        <Route path="editar/:tipo/:id" element={<PessoaFormOO />} />
      </Route>
    </Routes>
  );
}
