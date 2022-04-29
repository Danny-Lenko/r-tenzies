import React from "react"
import Die from "./Die"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


export default function App() {

    const [dice, setDice] = React.useState(createAllDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const allEqual = dice.every((die, i, arr) => arr[0].value === die.value )
        if (allHeld && allEqual) {
            setTenzies(true)
        }
    }, [dice])


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

        if (!tenzies) {

            setDice(prevState => prevState.map(die => (
                die.isHeld ? die : createDie()
            )))

        } else {
            setDice(createAllDice())
            setTenzies(false)
        }
    }


    return(
        <main>

            {tenzies && <Confetti />}

            <h1 className="title">Tenzies</h1>

            <h3 className="instructions">
                Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </h3>

            <section className="dice-container">
                {allDice}
            </section>

            <button className="roll-dice"
                onClick={rollDice}
            >
                {!tenzies ? 'Roll' : 'New Game'}
            </button>
        </main>
    )
}