import React, { useEffect, useState } from "react";
import { initialData } from "../../Services/localStorage";
import type { Filme, CinemaData } from "../../@Types";
import FilmeCard from "../../Componentes/FilmeCard"
import styles from "./styles.module.css"

const Home = () => {
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
        filme.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        filme.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.homeContainer}>
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
                <p>Nenhum filme encontrado com o termo "{searchTerm}".</p>
            )}
        </div>
    );
};

export default Home;