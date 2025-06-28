import DBZ from "../assets/img/Dragon_BallZ.webp"
import BL from "../assets/img/Blue-Lock-O-Filme.webp"
import HA from "../assets/img/homem-aranha-de-volta-ao-lar.webp"
import NC from "../assets/img/uma-noite-de-crimes.webp"
import type { CinemaData, Filme, Sessao } from "../@Types";

const initialCineData: CinemaData = { //Função para armazenar os filmes que irão esta na home a mostra 
    filmes: [{
        id: "filme1", 
        titulo: "Dragão Ball Z: A batalha do Deuses",
        poster: `${DBZ}`,
        descricao: "Prepare-se para o retorno triunfal de Dragon Ball Z aos cinemas, numa aventura que redefine os limites do poder e do universo! \n Após décadas de sono, Bills (Beerus), o temível Deus da Destruição, desperta. Com um poder inimaginável, ele fica intrigado com a notícia de que Freeza foi derrotado por um mortal, o Saiyajin Goku.",
        duracao: "2h 30min",
        sessao: [
            { id: "sessao1_filme1", horario: "18:00", sala: "Sala 1", preco: 30, assentosOcupado: ["A1", "A2", "B4", "B1", "A5"] },
            { id: "sessao2_filme1", horario: "21:00", sala: "Sala 2", preco: 30, assentosOcupado: ["A1", "B3", "B4", "B5", "B6", "A5"] }
        ]
    },
    {
        id: "filme2", 
        titulo: "Blue Lock: Episodio nagi",
        poster: `${BL}`,
        descricao: "Acompanhe a história do gênio do futebol, Seishiro Nagi. Cansado da rotina e buscando algo que o desafie, Nagi é arrastado para o programa Blue Lock, um centro de treinamento intensivo para criar o melhor atacante do mundo. Ao lado de seu parceiro Reo Mikage, Nagi descobre um novo propósito no futebol, enfrentando adversários e seus próprios limites em sua busca para dominar o campo e provar que é o verdadeiro egoísta em campo.",
        duracao: "3h 00min",
        sessao: [
            { id: "sessao1_filme2", horario: "18:00", sala: "Sala 3", preco: 50, assentosOcupado: ["C2", "C3", "A1"] },
            { id: "sessao2_filme2", horario: "21:30", sala: "Sala 4", preco: 50, assentosOcupado: [] }
        ]
    },
    {
        id: "filme3",
        titulo: "Homem Aranha - De Volta ao lar",
        poster: `${HA}`,
        descricao: "Após sua incrível experiência com os Vingadores, o jovem Peter Parker retorna à sua vida normal, sob a vigilância de Tony Stark. Ansioso para provar seu valor como herói, Peter enfrenta o temível Abutre, que ameaça o que ele mais preza. Ele precisa aprender a equilibrar sua vida escolar com as responsabilidades de ser o Homem-Aranha, enquanto descobre o verdadeiro significado de ser um super-herói.",
        duracao: "2h 25min",
        sessao: [
            { id: "sessao1_filme3", horario: "15:00", sala: "Sala 3", preco: 20, assentosOcupado: ["C2", "C3", "A1"] },
            { id: "sessao2_filme3", horario: "19:30", sala: "Sala 4", preco: 20.50, assentosOcupado: [] }
        ]
    },
    {
        id: "filme4", 
        titulo: "Uma Noite de Crimes (The Purge)",
        poster: `${NC}`,
        descricao: "Num futuro próximo, o governo americano instituiu A Noite do Expurgo: doze horas anuais onde todos os crimes, incluindo assassinato, são legais. A família Sandin, rica e segura em sua casa, acredita estar a salvo. Contudo, quando um estranho busca refúgio, eles são forçados a confrontar a brutalidade do evento. A noite se transforma em um pesadelo de sobrevivência.",
        duracao: "2 horas",
        sessao: [
            { id: "sessao1_filme4", horario: "15:00", sala: "Sala 1", preco: 25, assentosOcupado: ["C2", "C3", "A1","A2","A3"] },
            { id: "sessao2_filme4", horario: "19:30", sala: "Sala 1", preco: 25, assentosOcupado: [] }
        ]
    },
    ]
}

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

export const initialData = (): CinemaData => { //Função para carregar os dados iniciais do cinema 
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