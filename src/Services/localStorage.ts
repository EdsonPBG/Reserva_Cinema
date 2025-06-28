import type { CinemaData, Filme, Sessao } from "../@Types";

const localStorageKey = "CinemaData";

export const saveData = (data: CinemaData): void => { //Função para salvar todos os dados do cinema
    try {
        localStorage.setItem(localStorageKey, JSON.stringify(data));
        console.log("Dados salvos com sucesso!")
    } catch (error) {
        console.log(`Erro em salvar os dados: ${error}`);
    }
};

export const loadData = (): CinemaData | null => { //Função para carregar os dados salvos no localstorage 
    try {
        const dataString = localStorage.getItem(localStorageKey);
        if (dataString) {
            const parsedData = JSON.parse(dataString);

            const processedData: CinemaData = {
                ...parsedData,
                filmes: parsedData.filmes.map((filme: Filme) => ({
                    ...filme,
                    sessao: filme.sessao.map((sessao: Sessao) => ({
                        ...sessao,
                        preco: Number(sessao.preco),
                    })),
                })),
            };
            return processedData;
        }
        return null;
    } catch (error) {
        console.log(`Erro ao carregar os dados: ${error}`);
        return null;
    }
};

