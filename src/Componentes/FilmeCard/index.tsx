// import React from "react";
import { Link } from "react-router-dom";
import type { Filme } from "../../@Types"
import styles from "./styles.module.css"
import { useReserva } from "../../Context/ReservaContext";

interface FilmeCardProps { //Cria uma props com o tipo filme que recebe a interface "Filme" 
    filme: Filme;
}

const FilmeCard = ({ filme }: FilmeCardProps) => { //Aqui é uma função que cria a lista de filmes, utiliza da props para puxar os tipos da interface "Filme"
    const { selecionarFilme } = useReserva();  // É um hook customizado do context. Ele permite que este componente acesse os valores e funções fornecidos pelo `ReservaContext`.

    const handleFilmeClick = () => {
        selecionarFilme(filme);
    };

    return (
        <div className={styles.filmeCard}>
            <Link to={`/filme/${filme.id}`} onClick={handleFilmeClick} >
                <img src={filme.poster} alt={filme.titulo} width="200px" />
                <h3>{filme.titulo}</h3>
                <p>{filme.descricao}</p>
            </Link>
        </div>
    );
};    

export default FilmeCard