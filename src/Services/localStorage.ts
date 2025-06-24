// src/Services/localStorage.ts

import type { CinemaData, Filme, Sessao, Assentos } from "../@Types";

// Dados iniciais com IDs ajustados para melhor compatibilidade em URLs
const initialCineData: CinemaData = {
    filmes: [{
        id: "filme1", // IDs ajustados (minúsculas, sem espaços)
        titulo: "Dragão Ball Z",
        poster: "https://i.pinimg.com/originals/5d/40/00/5d40006801ffd481af5ed46ae05374a9.jpg",
        descricao: "Um garoto chamado goku luta contra tudo e todos para salvar a sua terra",
        duracao: "2h 30min",
        sessao: [
            { id: "sessao1_filme1", horario: "18:00", sala: "Sala 1", preco: 30, assentosOcupado: ["A1", "A2", "B4", "B1", "A5"] },
            { id: "sessao2_filme1", horario: "21:00", sala: "Sala 2", preco: 30, assentosOcupado: ["A1", "B3", "B4", "B5", "B6", "A5"] }
        ]
    },
    {
        id: "filme2", // IDs ajustados
        titulo: "Blue Lock",
        poster: "https://i.pinimg.com/originals/50/75/76/5075765b5d009cf4393a6b6fae984511.jpg",
        descricao: "Um grupo de atacantes tentando ser o melhor atacante do mundo, por isso entram no blue lock",
        duracao: "3h 00min",
        sessao: [
            { id: "sessao1_filme2", horario: "18:00", sala: "Sala 3", preco: 50, assentosOcupado: ["C2", "C3", "A1"] },
            { id: "sessao2_filme2", horario: "21:30", sala: "Sala 4", preco: 50, assentosOcupado: [] }
        ]
    },
    {
        id: "filme3", // IDs ajustados
        titulo: "Homem Aranha - De Volta ao lar",
        poster: "https://www.papodecinema.com.br/wp-content/uploads/2017/05/20170703-homem-aranha-de-volta-ao-lar-papo-de-cinema-cartaz.webp",
        descricao: "Um garoto que foi picado por uma aranha radioativa ganhou seus poderes e agora luta para proteger a terra junto aos vingadores",
        duracao: "2h 25min",
        sessao: [
            { id: "sessao1_filme3", horario: "15:00", sala: "Sala 3", preco: 20, assentosOcupado: ["C2", "C3", "A1"] },
            { id: "sessao2_filme3", horario: "19:30", sala: "Sala 4", preco: 20.50, assentosOcupado: [] }
        ]
    },
    ]
}

const localStorageKey = "CinemaData";

export const saveData = (data: CinemaData): void => {
    try {
        localStorage.setItem(localStorageKey, JSON.stringify(data));
        console.log("Dados salvos com sucesso!")
    } catch (error) {
        console.log(`Erro em salvar os dados: ${error}`);
    }
};

export const loadData = (): CinemaData | null => {
    try {
        const dataString = localStorage.getItem(localStorageKey);
        if (dataString) {
            const parsedData = JSON.parse(dataString);

            // Garante que 'preco' seja um Number e que 'sessao' esteja no formato correto
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

export const initialData = (): CinemaData => {
    let currentData: CinemaData | null = loadData();

    if (!currentData) {
        saveData(initialCineData);
        currentData = initialCineData;
        console.log("Dados iniciais do cinema configurados");
    } else {
        console.log("Dados do cinema já existem. Carregados com sucesso!");
    }

    return currentData;
}