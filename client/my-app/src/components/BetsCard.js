import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {useState} from 'react';

function BetsCard({home_team, away_team, moneyline, spread }) {
    const moneyAway = moneyline.outcomes[0].name === away_team ? moneyline.outcomes[0].price : moneyline.outcomes[1].price
    const moneyHome = moneyline.outcomes[0].name === home_team ? moneyline.outcomes[0].price : moneyline.outcomes[1].price
    const spreadAway = spread.outcomes[0].name === away_team ? spread.outcomes[0].price : spread.outcomes[1].price
    const spreadHome = spread.outcomes[0].name === home_team ? spread.outcomes[0].price : spread.outcomes[1].price
    const awayPoints = spread.outcomes[0].name === away_team ? spread.outcomes[0].point : spread.outcomes[1].point
    const homePoints = spread.outcomes[0].name === home_team ? spread.outcomes[0].point : spread.outcomes[1].point
    const [selectedBet, setSelectedBet] = useState()
    const intSelectedBet = parseInt(selectedBet, 0)


    function handleClick(event) {
        setSelectedBet(event.target.value)
      }

    function handleSubmit(event) {
        event.preventDefault();
        const wager = event.target.elements.placebet.value;
        const posOdds = (wager * (intSelectedBet/100)) + wager
        const negOdds = (wager * (100/(-intSelectedBet))) + wager
        const money = intSelectedBet > 0 ? posOdds : negOdds
        const newBet ={
            team_name: intSelectedBet === moneyAway || intSelectedBet === spreadAway ? away_team : home_team,
            desc: intSelectedBet === moneyAway || intSelectedBet === moneyHome ? 'h2h' : 'spread',
            odds: intSelectedBet, 
            wager: wager,
            result: money
        }
        console.log(newBet)

    fetch("http://localhost:5555/bets", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBet)
    })
        .then((resp) => resp.json())
    };

    return (
        <>
        {['Dark',].map((variant) => (
          <Card
            bg={variant.toLowerCase()}
            border="warning"
            key={variant}
            text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
            style={{ width: '30rem' }}
            className="mb-2"
          >
            <Card.Header>Upcoming Game: 3/28/2023</Card.Header>
            <Card.Body>
              <Card.Title style={{'text-align': 'center'}}>{away_team} @ {home_team}</Card.Title>
              <p>{' '}</p>
              <Card.Subtitle style={{'text-align': 'center'}}>Moneyline</Card.Subtitle>
              <p>{' '}</p>
              <Card.Text>
                <div className='buttons1' style={{'text-align': 'center'}}>
              <Button variant="secondary" id='money-away' style={{'align-items': 'center'}}
               onClick={handleClick} value={moneyAway}>
                Away: {moneyAway}</Button>{' '}
              <Button variant="secondary" id='money-home' style={{'align-items': 'center'}}
               onClick={handleClick} value={moneyHome}>
                Home: {moneyHome}</Button>{' '}
                </div>
                <p>{' '}</p>
                <Card.Subtitle style={{'text-align': 'center'}}>Spread</Card.Subtitle>
                <p>{' '}</p>
                <div className='buttons2' style={{'text-align': 'center'}}>
              <Button variant="secondary" id='points-away' style={{'align-items': 'center'}}
               onClick={handleClick} value={spreadAway}>
                Away: {awayPoints > 0 ? '+' : null}{awayPoints} ({spreadAway})</Button>{' '}
              <Button variant="secondary" id='points-home' style={{'align-items': 'center'}}
               onClick={handleClick} value={spreadHome}>
                Home: {homePoints > 0 ? '+': null}{homePoints} ({spreadHome})</Button>{' '}
                </div>
              </Card.Text>
            </Card.Body>
            <center>
            <form className="new-bet-form"
                    onSubmit={handleSubmit}>
                    {" "}
                    <button classname="betbutton">Place Bet</button>
                    <input
                    id="betform"
                    type="text"
                    name="placebet"
                    className="betInput"
                    placeholder="Wager Here"
                    />
                    </form>
             </center>
          </Card>
        ))}
      </>
    )
        
}
export default BetsCard;