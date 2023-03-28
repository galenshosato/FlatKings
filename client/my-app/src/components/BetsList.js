import BetsCard from './BetsCard';

function BetsList({ bets, setBets}){

    return (
        <ul className='cards'>
            {bets.map((bet) => {
                return <BetsCard {...bet} key={bet.id} setBets={setBets} />
            })}
        </ul>
    )
}
export default BetsList