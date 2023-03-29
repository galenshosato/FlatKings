import BetsCard from './BetsCard';

function BetsList({ bets, setBets}){

    return (
        <div className='cards'>
            {bets.map((bet) => {
                return <BetsCard {...bet} key={bet.id} setBets={setBets} />
            })}
        </div>
    )
}
export default BetsList

