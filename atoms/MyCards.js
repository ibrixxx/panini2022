import { atom } from 'recoil';
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


export const myCards = atom({
    key: 'myCards',
    default: ContextObject
})

export const myAllCards = atom({
    key: 'myAllCards',
    default: 0
})
