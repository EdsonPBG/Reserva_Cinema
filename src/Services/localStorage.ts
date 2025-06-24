import type { CinemaData, Filme, Sessao, Assentos } from "../@Types"

const initialCineData: CinemaData = {
    filmes: [ {
            id: "Filme 1",
            titulo: "Dragão Ball Z",
            poster: "https://i.pinimg.com/originals/5d/40/00/5d40006801ffd481af5ed46ae05374a9.jpg",
            descricao: "Um garoto chamado goku luta contra tudo e todos para salvar a sua terra",
            duracao: "2h 30min",
            sessao: [
                {
                    id: "Sessao1_Filme1",
                    horario: "18:00",
                    sala: "Sala 1",
                    preco: 30,
                    assentosOcupado: ["A1","A2","B4","B1","A5"]
                },

                {
                    id: "Sessao2_Filme1",
                    horario: "21:00",
                    sala: "Sala 2",
                    preco: 30,
                    assentosOcupado: ["A1","B3","B4","B5","B6","A5"]
                }
            ]
        },
        {
            id: "Filme 2",
            titulo: "Blue Lock",
            poster: "https://i.pinimg.com/originals/50/75/76/5075765b5d009cf4393a6b6fae984511.jpg",
            descricao: "Um grupo de atacantes tentando ser o melhor atacante do mundo, por isso entram no blue lock",
            duracao: "3h 00min",
            sessao: [
                {
                    id: "Sessao1_Filme2",
                    horario: "18:00",
                    sala: "Sala 3",
                    preco: 50,
                    assentosOcupado: ["C2","C3","A1"]
                },

                {
                    id: "Sessao2_Filme2",
                    horario: "21:30",
                    sala: "Sala 4",
                    preco: 50,
                    assentosOcupado: []
                }
            ]
        },
        {
             id: "Filme 3",
            titulo: "Homem Aranha - De Volta ao lar",
            poster: "https://www.papodecinema.com.br/wp-content/uploads/2017/05/20170703-homem-aranha-de-volta-ao-lar-papo-de-cinema-cartaz.webp",
            descricao: "Um garoto que foi picado por uma aranha radioativa ganhou seus poderes e agora luta para proteger a terra junto aos vingadores",
            duracao: "2h 25min",
            sessao: [
                {
                    id: "Sessao1_Filme3",
                    horario: "15:00",
                    sala: "Sala 3",
                    preco: 20,
                    assentosOcupado: ["C2","C3","A1"]
                },

                {
                    id: "Sessao2_Filme3",
                    horario: "19:30",
                    sala: "Sala 4",
                    preco: 20.50,
                    assentosOcupado: []
                }
            ]
        },
    ]
}

const localStorageKey = "CinemaData";

// Função para salvar os dados no localStorage
export const saveData = (data: CinemaData): void => {
    try {
        localStorage.setItem(localStorageKey, JSON.stringify(data));
        console.log("Dados salvos com sucesso!")
    } catch (error) {
        console.log(`Erro em salvar os dados: ${error}`);
    }
};

// Função para carregar os dados salvos no localStorage
export const loadData = (): CinemaData | null => {
    try {
        const dataString = localStorage.getItem(localStorageKey);
        if (dataString) {
            return JSON.parse(dataString) as CinemaData; //Converte a string JSON em objeto
        }
        return null; //retorna vazio se não tiver dados no localStorage
    } catch (error) {
        console.log(`Erro ao carregar os dados: ${error}`);
        return null;
    }
};


export const initialData = (): CinemaData => {
    let currentData: CinemaData | null = loadData(); //Tenta carregar os dados existentes

    if (!currentData) {
        saveData(initialCineData);
        currentData = initialCineData; // Define os dados atuais como os iniciais
        console.log("Dados iniciais do cinema configurados");
    } else {
        console.log("Dados do cinema ja existem. Carregados com sucesso!");
    }

    return currentData; //retorna os dados que estão sendo usados
}