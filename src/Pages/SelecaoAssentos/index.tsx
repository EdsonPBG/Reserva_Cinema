import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReserva } from "../../Context/ReservaContext";
import { initialData } from "../../Services/localStorage"; // Importe a função que carrega os dados do LocalStorage
import type { Assentos, Sessao, Filme, CinemaData } from "../../@Types"; // Importe todos os tipos necessários
import styles from "./styles.module.css";

const SelecaoAssentos = () => {
    const navigate = useNavigate();
    const { reserva, alterarAssento } = useReserva();
    const { filmeSelecionado, sessaoSelecionada, assentoSelecionado } = reserva;
    const [mapaAssentos, setMapaAssentos] = useState<Assentos[]>([]);
    const [sessaoAtualizada, setSessaoAtualizada] = useState<Sessao | null>(null); // Estado local para armazenar a sessão com os dados mais atualizados de assentos ocupados

    useEffect(() => {
        // se não há filme ou sessão no contexto, redireciona.
        if (!filmeSelecionado || !sessaoSelecionada) {
            console.warn("Nenhum filme ou sessão selecionada. Redirecionando para a Home.");
            navigate("/");
            return;
        }

        //Buscando os dados mais recentes para ter os assentos ocupados atualizados
        const cinemaData: CinemaData = initialData();
        const filmeNaBase = cinemaData.filmes.find(f => f.id === filmeSelecionado.id);

        if (!filmeNaBase) {
            console.warn("Filme não encontrado na base de dados atual. Redirecionando para a Home.");
            navigate("/");
            return;
        }

        const sessaoNaBase = filmeNaBase.sessao.find(s => s.id === sessaoSelecionada.id); 
        
        if (!sessaoNaBase) {
            console.warn("Sessão não encontrada na base de dados atual. Redirecionando para Detalhes do Filme.");
            navigate(`/FilmeDetalhes/${filmeSelecionado.id}`); // Retorna para a página de detalhes do filme
            return;
        }

        // Armazena a sessão mais recente
        setSessaoAtualizada(sessaoNaBase);

      
        const linhas = ["A", "B", "C"]; // Define o número de linhas desejado
        const numAssentosPorLinha = 8; // Define o número de assentos por linha

        const assentosGerados: Assentos[] = [];
        linhas.forEach(linha => {
            for (let i = 1; i <= numAssentosPorLinha; i++) {
                const idAssento = `${linha}${i}`;
                let status: "livre" | "ocupado" | "selecionado" = "livre";

                // Verifica se o assento está ocupado usando
                if (sessaoNaBase.assentosOcupado.includes(idAssento)) {
                    status = "ocupado";
                }
                // Verifica se o assento foi selecionado pelo usuário
                else if (assentoSelecionado.includes(idAssento)) {
                    status = "selecionado";
                }
                
                // Adiciona o assento ao mapa, independentemente do status
                assentosGerados.push({ id: idAssento, status });
            }
        });
        setMapaAssentos(assentosGerados);

    }, [filmeSelecionado, sessaoSelecionada, assentoSelecionado, navigate]); // Dependências do useEffect

    // Função para lidar com o clique no assento
    const handleAssentoClick = (assento: Assentos) => {
        if (assento.status === "ocupado") {
            alert("Este assento já está ocupado!");
            return;
        }
        // Usa a função do contexto para adicionar/remover o assento selecionado
        alterarAssento(assento.id);
    };

    // Calcula o total a pagar usando o preço da sessão atualizada
    const totalPagar = (sessaoAtualizada?.preco || 0) * assentoSelecionado.length;

    // Se o filme ou a sessão ainda não foram carregados/atualizados, não renderiza o conteúdo principal.
    if (!filmeSelecionado || !sessaoAtualizada) {
        return null;
    }
    
    return (
        <div className={styles.selecaoAssentosContainer}>
            <button className={styles.backButton} onClick={() => navigate(`/filme/${filmeSelecionado.id}`)}>
                &larr; Voltar para Detalhes do Filme
            </button>

            <h2>Selecione Seus Assentos</h2>
            <h3>Filme: {filmeSelecionado.titulo}</h3>
            <p>Sessão: {sessaoAtualizada.horario} - Sala: {sessaoAtualizada.sala}</p> 
            <p className={styles.totalPagar}>Total a Pagar: R$ {totalPagar.toFixed(2).replace(".",",")}</p>

            <div className={styles.assentosGrid}>
                {mapaAssentos.map(assento => (
                    <div
                        key={assento.id}
                        className={`${styles.assento} ${styles[assento.status]}`}
                        onClick={() => handleAssentoClick(assento)}
                    >
                        {assento.id}
                    </div>
                ))}
            </div>

            <div className={styles.legendaAssentos}>
                <div className={`${styles.assento} ${styles.livre}`}></div><span>Livre</span>
                <div className={`${styles.assento} ${styles.ocupado}`}></div><span>Ocupado</span>
                <div className={`${styles.assento} ${styles.selecionado}`}></div><span>Selecionado</span>
            </div>

            <button
                className={styles.buttonConfirmacao}
                onClick={() => navigate("/resumo-reserva")}
                disabled={assentoSelecionado.length === 0}
            >
                Continuar para Confirmação ({assentoSelecionado.length} Assento(s))
            </button>
        </div>
    );
};

export default SelecaoAssentos;