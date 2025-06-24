export interface Assentos {
    id: string; // Exemplo: A1 , B3 e etc
    status: "livre" | "ocupado" | "selecionado"; //Status dos assentos
}

export interface Sessao {
    id: string;
    horario: string;
    sala: string;
    preco: string;
    assentosOcupado: string[]; //um array de strings de assentos ocupados
}

export interface Filme {
    id: string;
    titulo: string;
    poster: string;
    descricao: string;
    duracao: string;
    sessao: Sessao[]; //Um array de Sessao
}

export interface ReservaState {
    filmeSelecionado: Filme | null;
    sessaoSelecionada: Sessao | null;
    assentoSelecionado: string[]; //Ids dos assentos que os usuarios selecionaram
}

export interface ReservaContextType {
    reserva: ReservaState;
    selecionarFilme: (filme: Filme) => void;
    selecionarSessao: (sessao: Sessao) => void;
    alterarAssento: (assentoId: string) => void; //Adiciona ou remove assento
    limparReserva: () => void; //Limpa todo o estado da reserva
}

export interface CinemaData {
    filmes: Filme[]; //Um array de Filme    
}