// import { useState } from 'react'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { ReservaProvider } from "./Context/ReservaContext";
import FilmeDetalhes from "./Pages/FilmeDetalhes"
import SelecaoAssentos from "./Pages/SelecaoAssentos";
import ResumoReserva from "./Pages/ResumoReserva";
import styles from "./styles.module.css";

function App() {
  return (
    <Router>
      <ReservaProvider>
          <div className={styles.app}>
                <h1>Bem-vindo ao Cinema</h1>
                <Routes>
                  <Route path="/" element={<Home />}/>
                  <Route path="/filme/:id" element={<FilmeDetalhes />}/>
                  <Route path="/selecao-assentos" element={<SelecaoAssentos />} />
                  <Route path="/resumo-reserva" element={<ResumoReserva />} />
                  {/* Adicionar novas rotas aqui conforme for fazendo */}
                </Routes>
            </div>
      </ReservaProvider>
    </Router>
  );
}

export default App;
    