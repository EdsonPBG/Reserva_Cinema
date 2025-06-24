import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReserva } from "../Context/ReservaContext";
import type { Assentos, Sessao } from "../@Types";
import styles from "./styles.module.css";

const SelecaoAssentos = () => {
    const navigate = useNavigate();
    const { reserva, alterarAssento, limparReserva } = useReserva()
    const { filmeSelecionado, sessaoSelecionada, assentoSelecionado } = reserva;
    const [mapAssentos,setMapAssentos] = useState<Assentos[]>([]); //Estado local para os assentos, gera um mapa de assentos para a sala

    useEffect(() => {
        if (!filmeSelecionado || !sessaoSelecionada) { //Se o filme nem a sessão forem selecionadas, direciona para a home
            console.warn("Nenhum filme ou sessão selecionados, Redirecionando para a lista de filmes");
            navigate("/");
            return;
        }

        const linhas = ["A", "B", "C"]; //Gera o mapa de assentos 
        const numAssentosPorLinha = 8; //Exemppplo, A1 ate A8 e etc

        const assentosGerados: Assentos[] = [];
        linhas.forEach(linha => {
            for (let i = 1; i <= numAssentosPorLinha; i++) {
                const idAssento = `${linha}${i}`;
                let status: "livre" | "ocupado" | "selecionado" = "livre";

                if (sessaoSelecionada.assentosOcupado.includes(idAssento)) { //verifica se o assento esta ocupado pela sessão
                    status = "ocupado";
                }
                else if (assentoSelecionado.includes(idAssento)) {
                    status = "selecionado";
                }
                else {
                    assentosGerados.push({ id: idAssento, status })
                }
            }
        });
        setMapAssentos(assentosGerados);
    }, [filmeSelecionado, sessaoSelecionada, navigate, assentoSelecionado]);

    const handleAssentoClick = (assento: Assentos) => { //Função para lidar com o assento ocupado
        if (assento.status === "ocupado") {
            alert("Este assento já esta ocupado!");
            return;
        }
        alterarAssento(assento.id); //Usa o context para adicionar/remover o assento selecionado
    }

    const totalPagar = (sessaoSelecionada?.preco || 0) * assentoSelecionado.length; //Calcula o total a pagar
        if (!filmeSelecionado || !sessaoSelecionada) { //Se não tiverfilme ou sessao, não renderiza o conteudo
            return null; 
        }
       
    return (
        <div className={styles.SelecaoAssentosContainer}>
            <button className={styles.backButton} onClick={() => navigate(`/filme/${filmeSelecionado.id}`)}>
                &larr; Voltar para os detalhes do filme
            </button>

            <h2>Selecione Seus Assentos</h2>
            <h3>Filme: {filmeSelecionado.titulo} </h3>
            <p>Sessão: {sessaoSelecionada.horario} </p>
            <p className={styles.totalPagar}>Total a Pagar: R$ {totalPagar.toFixed(2).replace(".",",")} </p>

            <div className={styles.assentosGrid}>
                {mapAssentos.map(assento => (
                    <div key={assento.id} className={`${styles.assento} ${styles[assento.status]}`} onClick={() => handleAssentoClick(assento)}> {/* Aplica classes css dinamicamente */} 
                        {assento.id}
                    </div>
                ))}
            </div>

            <div className={styles.legendaAssentos}>
                <div className={`${styles.assento} ${styles.livre}`}></div><span>Livre</span>
                <div className={`${styles.assento} ${styles.ocupado}`}></div><span>Ocupado</span>
                <div className={`${styles.assento} ${styles.selecionado}`}></div><span>Selecionado</span>
            </div>

            <button className={styles.buttonConfirmacao} onClick={() => navigate("/resumo-reserva")} disabled={assentoSelecionado.length === 0}> {/* Logica para a proxima etapa e desabilita caso não tenha assentos selecionados */}
                    Continuar para a confirmação ({assentoSelecionado.length} Assento(s))
            </button> 
        </div>
    );
};

export default SelecaoAssentos;