import React from "react";
import { Link } from "react-router-dom";
import type { Filme } from "../../@Types"
import styles from "./styles.module.css"
import { useReserva } from "../../Context/ReservaContext";

interface FilmeCardProps {
    filme: Filme;
}

const FilmeCard = ({ filme }: FilmeCardProps) => {
    const { selecionarFilme } = useReserva();

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