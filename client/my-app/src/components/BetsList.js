import BetsCard from './BetsCard';

function BetsList({ bets, setBets}){

    console.log(bets)

    return (
        <ul className='cards'>
            conso
            {bets.map((bet) => {
                return <BetsCard {...bet} key={bet.id} setBets={setBets} />
            })}
        </ul>
    )
}
export default BetsList

