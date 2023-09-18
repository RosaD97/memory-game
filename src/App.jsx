import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card';
import Victory from './components/Victory';

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
  // btn inizia
  const [start, setStart] = useState(false)
  // vittoria
  const [arrayCarteVinte, setArrayCarteVinte] = useState([])


  // random e duplica cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setStart(true)
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
        aggiungiCartaVinta()

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

  const aggiungiCartaVinta = () => {
    setArrayCarteVinte((prevArray) => {
      const newArray = [...prevArray, primaScelta];
      if (newArray.length === 6) {
        console.log('vittoria')
      }
      return newArray;
    })
  }

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
      {start === false ?
        <button className='btn_start' onClick={shuffleCards}>Inizia</button>
        :
        <button className='btn_new' onClick={shuffleCards}>Nuova partita</button>
      }

      {/* cards */}
      <div className='main'>
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
        {/* Vittoria comp */}
        <div> 
          {arrayCarteVinte.length === 6 ?
            <Victory />
            :
            ''
          }

        </div>
      </div>


      {turns > 0 ?
        <p className='turno'>Turno: {turns}</p>
        :
        ""
      }
    </div>
  )
}

export default App
