// import { useState } from 'react'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import { ReservaProvider } from "./Context/ReservaContext";
import FilmeDetalhes from "./Pages/filmeDetalhes"
import SelecaoAssentos from "./Pages/selecaoAssentos";
import ResumoReserva from "./Pages/resumoReserva";
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
    