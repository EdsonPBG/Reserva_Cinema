import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; //Hook para ler os parametros da URL
import { useReserva } from "../Context/ReservaContext"; //Para acessar o filmeSelecionado que foi salvo
import type { CinemaData, Filme, Sessao } from "../@Types";
import { initialData } from "../Services/localStorage";
import styles from "./styles.module.css"


const FilmeDetalhes = () => {
    const { id } = useParams<{ id: string }>(); //Permite acessar a URL da rota, puxado pelo id
    const navigate = useNavigate(); //Para direcionar o usuario programaticamente
    const { reserva, selecionarSessao, selecionarFilme }  = useReserva(); 
    const filmeSelecionadoContext = reserva?.filmeSelecionado;  //Extrai o filmeSelecionadoContext do estdao da reserva
    const [filmeExibido, setFilmeExibido] = useState<Filme | null>(null);


    useEffect(() => { 
        if (filmeSelecionadoContext && filmeSelecionadoContext.id === id) { //Se ja tem um filme selecionado no contexto e o ID do filme no contexto
            setFilmeExibido(filmeSelecionadoContext);
        } else if (id) { //Se não, tenta carregar o filme do localStorage, caso pegue a URl diretamente
            const cinemaData: CinemaData = initialData(); //Carrega todos os dados do cinema 
            const encontrado = cinemaData.filmes.find(f => f.id === id); //Procura o filme pelo ID
        
            if (encontrado) {
            setFilmeExibido(encontrado);
            // selecionarFilme(encontrado);
                if (selecionarFilme) {
                    selecionarFilme(encontrado);
                    }
            } else { //Se o filme não for encontrado, direciona para a home
                console.warn(`Filme com ID ${id} não encontrado`);
                navigate("/");
            }
        } else { //se não ha ID na URL e nenhum filme no context, redireciona para a home
            navigate("/");
        }
        

    }, [id, filmeSelecionadoContext, navigate, selecionarFilme]);  //Lista de dependências do useEffect

    if (!filmeExibido) {
        return <div>Carregando detalhes do filme...</div>;
    }

   return (
    
    <div className={styles.filmeDetalhesContainer}>
        <button className={styles.backButton} onClick={() => navigate("/")}>
            &larr; Voltar para a lista de Filmes
        </button>


        <h2>{filmeExibido.titulo}</h2>

        <div className={styles.filmeInfo}>

            <img 
                src={filmeExibido.poster} 
                alt={filmeExibido.titulo} 
                className={styles.filmePosterDetalhes}
                />
            <div className={styles.filmeTextoDetalhes}>
                <p><strong>Duração:</strong> {filmeExibido.duracao} </p>
                <p><strong>Sinopse</strong> {filmeExibido.descricao} </p>
            </div>
        </div>

        <h3 className={styles.sessoesTitulo}>Sessões Disponvei:</h3>

        <div className={styles.sessoesList}>
        {filmeExibido.sessao && filmeExibido.sessao.length > 0 ? (
            filmeExibido.sessao.map((sessao: Sessao) => (
                <div key={sessao.id} className={styles.sessaoCard}>
                    <p>Horário: {sessao.horario}</p>
                    <p>Preço: R$ {sessao.preco} </p>
                    <button  className={styles.selecionarAssentosButton}
                        onClick={() => {
                            if (selecionarSessao) {
                                selecionarSessao(sessao);
                                navigate("/selecao-assentos");
                            } else {
                                console.error("Função SelecionarSessao não disponivel no momento");
                                
                            }
                        }}
                        >
                            Selecionar Assentos
                        </button>
                </div>
            ))
        ):(
            <p>Nenhuma sessão disponivel para este filme.</p>
        )}
        </div>
    </div>
   );
};

export default FilmeDetalhes;