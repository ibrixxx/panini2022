import React, {useContext, useState} from "react";
import {CardData, CardNumbers, FWCardNumbers} from "../data/CardData";

let ContextObject = {}

CardData.forEach((item, index) => {
    if (index === 0) {
        let row = []
        FWCardNumbers.forEach(i => {
            i.forEach(j => row.push(j))
        })
        const tempMap = new Map(
                row.map(number => {
                    return [item.tag+number, 0]
                })
        )
        ContextObject[item.tag] = tempMap
    }
    else {
        let row = []
        CardNumbers.forEach(i => {
            i.forEach(j => {
                if(j !== 20)
                    row.push(j)
            })
        })
        const tempMap = new Map(
                row.map(number => {
                    return [item.tag+number, 0]
                })
        )
        ContextObject[item.tag] = tempMap
    }
})

const CardsContext = React.createContext()
const CardsUpdateContext = React.createContext()

export const useCards = () => {
    return useContext(CardsContext)
}

export const useUpdateCards = () => {
    return useContext(CardsUpdateContext)
}

const Context = ({children}) => {
    const [cards, setCards] = useState(ContextObject)


    return (
        <CardsContext.Provider value={cards}>
            <CardsUpdateContext.Provider value={setCards}>
                {children}
            </CardsUpdateContext.Provider>
        </CardsContext.Provider>
    );
}

export default Context;
