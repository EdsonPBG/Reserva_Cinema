import React, { useEffect, useState } from "react";
import { initialData } from "../Services/localStorage";
import type { Filme, CinemaData } from "../@Types";
import FilmeCard from "../Componentes/FilmeCard"
import styles from "./styles.module.css"

const Home = () => {
    const [filmes, setFilmes] = useState<Filme[]>([]); //Estado para guardar a lista de filmes, tipado como um array de "filme" 
    
    useEffect(() => {
        const completeData: CinemaData = initialData(); //garante que os dados do cinema existam no LocalStorage e carrega ele
        setFilmes(completeData.filmes); //Atualiza o estado do filmes com a lista de filmes
        console.log(`Filmes carregados: ${completeData.filmes}`);
    }, []); // O array vazio garante que rode apenas uma vez

        return (
            <div className={styles.homeContainer}>
                <h2>Filmes em Cartaz</h2>

                {filmes.length > 0 ? (
                    <div className={styles.filmesGrid}>
                        {filmes.map((filme: Filme) => (
                            <FilmeCard key={filme.id} filme={filme} />
                        ))}
                    </div>
                ) : (
                    <p>Carregando Filmes...</p>
                )};
            </div>
        );
};

export default Home;