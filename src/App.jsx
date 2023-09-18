import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]

function App() {
  // array di carte
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  // Carte scelte
  const [primaScelta, setPrimaScelta] = useState(null);
  const [secondaScelta, setSecondaScelta] = useState(null);
  const [disabled, setDisabled] = useState(false)

  // random e duplica cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffleCards)
    setTurns(0)

  };

  // set the choice
  const scelta = (card) => {
    primaScelta ? setSecondaScelta(card) : setPrimaScelta(card)
  }

  // compara le cards
  useEffect(() => {
    if (primaScelta && secondaScelta) {
      setDisabled(true)
      if (primaScelta.src === secondaScelta.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === primaScelta.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => {
          resetTurn()
        }, 1000);
      }
    }

  }, [primaScelta, secondaScelta])

  // reset scelte + turno incrementato
  const resetTurn = () => {
    setPrimaScelta(null)
    setSecondaScelta(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // Start new game
  useEffect(() => {
    
  }, [])


  return (
    <div className='App'>
      <h1>Match game</h1>
      <button onClick={shuffleCards}>Gioca</button>
      {/* cards */}
      <div className='card-grid'>
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            scelta={scelta}
            flipped={card === primaScelta || card === secondaScelta || card.matched}
            disabled={disabled}
          />
        ))}

      </div>
      <p>Turno: {turns}</p>
    </div>
  )
}

export default App
