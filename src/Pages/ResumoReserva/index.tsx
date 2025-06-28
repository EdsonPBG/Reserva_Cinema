// import React from "react";
import { useNavigate } from "react-router-dom";
import { useReserva } from "../../Context/ReservaContext";
import { initialData } from "../../Services";
import { saveData } from "../../Services/localStorage";
import type { CinemaData, Filme, Sessao } from "../../@Types";
import styles from "./styles.module.css";

const ResumoReserva = () => { //Função para mostrar o resumo da reserva feita pelo usuario, cancelamento de reserva, armazenamento da reserva no localstorage e etc
    const navigate = useNavigate();
    const { reserva, limparReserva } = useReserva();
    const { filmeSelecionado, sessaoSelecionada, assentoSelecionado } = reserva;

        if (!filmeSelecionado || !sessaoSelecionada || assentoSelecionado.length === 0) {
            console.warn("Dados da reserva incompletos. Redirecionando.");
            navigate("/");
            return null;
        }

        const totalPagar = sessaoSelecionada.preco * assentoSelecionado.length;

        const handleConfirmarReserva = () => { //Função para confirmar a reserva
            try { //Atualiza o localstorage com novos assentos ocupado
                const currentCinemaData: CinemaData = initialData(); //Carrega os dados recentes

                const updatedFilmes = currentCinemaData.filmes.map((filme: Filme) => {
                    if (filme.id === filmeSelecionado.id) {
                        return {
                            ...filme,
                            sessao: filme.sessao.map((sessao: Sessao) => {
                                if (sessao.id === sessaoSelecionada.id) {
                                    return {
                                        ...sessao,
                                        assentosOcupado: [...new Set([...sessao.assentosOcupado, ...assentoSelecionado])]
                                    };
                                }
                                return sessao;
                            }),
                        };
                    }
                    return filme;
                });

                saveData({ filmes: updatedFilmes }); //Salva os dados atualizados no localstorage
                limparReserva(); //Limpar o estado da reserva no Context
                    alert("Reserva confirmada com sucesso! \nVolte sempre.");
                    navigate("/");
            } catch (error) {
                console.error("Erro ao confirmar a reserva:", error);
                alert("Houve um erro ao confirmar sua reserva. Tente Novamente")
            }
        };

        return (
            <div className={styles.resumoReservaContainer}>
                <button className={styles.BackButton} onClick={() => navigate("/selecao-assentos")}>
                    &larr; Voltar para Seleção de Assentos
                </button>

                <h2>Resumo da Sua Reserva</h2>

                <div className={styles.resumoDetalhes}>
                    <p><strong>Filme:</strong> {filmeSelecionado.titulo} </p>
                    <p><strong>Sessão:</strong> {sessaoSelecionada.horario} </p>
                    <p><strong>Assentos Selecionados:</strong> {assentoSelecionado.join(",")} </p>
                    <p className={styles.resumoTotal}><strong>Total a Pagar:</strong> R$ {totalPagar.toFixed(2).replace(".",",")} </p>
                </div>

                <button className={styles.confirmarReservaButton} onClick={handleConfirmarReserva}>
                    Confirmar Reserva
                </button>

                <button className={styles.confirmarReservaButton} 
                        onClick={() => {
                            limparReserva(); 
                            navigate("/"); 
                            alert("Reserva Cancelada");}}
                >
                    Cancelar Reserva
                </button>
            </div>
        );
};

export default ResumoReserva;