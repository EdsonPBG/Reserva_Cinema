import React, { createContext, useState, useContext, Children } from "react";
import type { Filme, Sessao, ReservaState, ReservaContextType } from "../../@Types";
import type { ReactNode } from "react";

const initialReservaState: ReservaState = { //Define o estado inicial da reserva e inicia com filme, sessao e assentos, nulos ou vazios
    filmeSelecionado: null,
    sessaoSelecionada: null,
    assentoSelecionado: [],
};

export const ReservaContext = createContext<ReservaContextType>({ //Cria o context da reserva como se fosse um "canal de comunicação" ou um "armario comppartilhado"
    reserva: initialReservaState,
    selecionarFilme: () => {},
    selecionarSessao: () => {},
    alterarAssento: () => {},
    limparReserva: () => {},
});

interface ReservaProviderProps {  //Define as props para o ReservaProvider.
    children: ReactNode; //ReactNode aceita qualquer coisa renderizavel pelo react
}

export const ReservaProvider = ({ children }: ReservaProviderProps) => { //Cria um componente provedor do contexto
    const [reserva, setreserva] = useState<ReservaState>(initialReservaState);

    const selecionarFilme = (filme: Filme) => { //Função para definir o filme selecionado
        setreserva({
            filmeSelecionado: filme,
            sessaoSelecionada: null, //Limpa a sessao e os assentos anteriores
            assentoSelecionado: [],
        });
    };

    const selecionarSessao = (sessao: Sessao) => { //Função para definir a sessão selecionada
        setreserva(prevReserva => ({
            ...prevReserva, //Mantem o filme selecionado
            sessaoSelecionada: sessao,
            assentoSelecionado: [],
        }));
    };

    const alterarAssento = (assentoId: string) => { //Função para adicionar ou remover um assento da seleção
        setreserva(prevReserva => {
            const isSelected = prevReserva.assentoSelecionado.includes(assentoId);
            let newAssentosSelecionados: string[];

                if (isSelected) {
                    newAssentosSelecionados = prevReserva.assentoSelecionado.filter(
                        (id) => id !== assentoId
                    );
                } else {
                    newAssentosSelecionados = [...prevReserva.assentoSelecionado, assentoId];
                }
                return {
                    ...prevReserva,
                    assentoSelecionado: newAssentosSelecionados,
                };
        });
    };

    const limparReserva = () => { //Função para limpara todo o estado da reserva
        setreserva(initialReservaState);
    };

    const contextValue: ReservaContextType = { // O valor que sera disponibilizado para todos os componentes que usaram esse contexto
        reserva,
        selecionarFilme,
        selecionarSessao,
        alterarAssento,
        limparReserva,
    };

    return (
        <ReservaContext.Provider value={contextValue}>
            {children}
        </ReservaContext.Provider>
    );
};

export const useReserva = () => {
    const context = useContext(ReservaContext);
    if (context === undefined) {
        throw new Error("useReserva must be used within a ReservaProvider");
    }
    return context
};