export default function Card({card, scelta, flipped, disabled}) {
const scopriCarta = () => {
    if(!disabled){
        scelta(card)
    }
}

    return (
        <div>
            <div className='card' key={card.id}>
                <div className={flipped ? "flipped" : ""}>
                    <img className='front' src={card.src} alt="card front" />
                    <img 
                    onClick={scopriCarta} 
                    className='back' 
                    src="/img/cover.png" 
                    alt="card back" />
                </div>
            </div>
        </div>
    )
}