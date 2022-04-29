import React from "react"
import Die from "./Die"
import { nanoid } from 'nanoid'


export default function App() {

    const [dice, setDice] = React.useState(createAllDice())

    function createDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function createAllDice() {
        const dice = []
        for (let i = 0; i < 10; i++) {
            dice.push(createDie())
        }
        return dice
    }

    function holdDice(id) {
        setDice(prevState => prevState.map(die => (
            die.id === id
                ? {...die, isHeld: !die.isHeld}
                : die
        )))
    }

    const allDice = dice.map(die => (
        <Die key={die.id}
             value={die.value}
             isHeld={die.isHeld}
             holdDice={() => holdDice(die.id)}
        />
    ))

    function rollDice() {
        setDice(prevState => prevState.map(die => (
            die.isHeld ? die : createDie()
        )))
    }


    return(
        <main>

            <section className="dice-container">
                {allDice}
            </section>

            <button className="roll-dice"
                onClick={rollDice}
            >
                Roll
            </button>
        </main>
    )
}