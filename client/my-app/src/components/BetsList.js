import BetsCard from './BetsCard';

function BetsList({ bets, setBets }){


    return (
        <div className='cards'>
            {bets.map((bet) => {
                return <BetsCard 
                {...bet} 
                key={bet.id} 
                setBets={setBets} 
                moneyline={bet.bookmakers[0].markets[0]} 
                spread={bet.bookmakers[0].markets[1]} />
            })}
        </div>
    )
}
export default BetsList


