import React, {useContext, useState} from "react";
import {CardData, CardNumbers, FWCardNumbers} from "../data/CardData";

const CardsContext = React.createContext()
const CardsUpdateContext = React.createContext()

export const useCards = () => {
    return useContext(CardsContext)
}

export const useUpdateCards = () => {
    return useContext(CardsUpdateContext)
}

const Context = ({children}) => {
    const [cards, setCards] = useState([])

    return (
        <CardsContext.Provider value={cards}>
            <CardsUpdateContext.Provider value={setCards}>
                {children}
            </CardsUpdateContext.Provider>
        </CardsContext.Provider>
    );
}

export default Context;
