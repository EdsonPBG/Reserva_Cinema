import React, { useEffect, useState } from "react";
import { initialData } from "../../Services/localStorage";
import type { Filme, CinemaData } from "../../@Types";
import FilmeCard from "../../Componentes/FilmeCard"
import styles from "./styles.module.css"

const Home = () => { //função que mostra a "home" do site, onde tem os filmes, a barra de pesquisa e etc
    const [filmes, setFilmes] = useState<Filme[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>(''); // termo de pesquisa

    useEffect(() => {
        const completeData: CinemaData = initialData();
        setFilmes(completeData.filmes);
        console.log(`Filmes carregados: ${completeData.filmes.length} filmes`); // Log para o número de filmes
    }, []);

    
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Filtra os filmes com base no termo de pesquisa
    const filteredFilmes = filmes.filter(filme =>
        filme.titulo.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    return (
        <div className={styles.homeContainer}> {/* Container que armazena a barra de pesquisa, os filmes e faz a verificação na pesquisa dos filmes */}
            <h2>Filmes em Cartaz</h2>

            {/* Nova Barra de Pesquisa */}
            <div className={styles.searchBarContainer}>
                <input type="text" placeholder="Pesquisar filmes..." className={styles.searchInput} value={searchTerm} onChange={handleSearchChange}/>
            </div>

            {filteredFilmes.length > 0 ? (
                <div className={styles.filmesGrid}>
                    {filteredFilmes.map((filme: Filme) => (
                        <FilmeCard key={filme.id} filme={filme} />
                    ))}
                </div>
            ) : (
                <p>Nenhum filme encontrado com esse termo: "{searchTerm}".</p>
            )}
        </div>
    );
};

export default Home;