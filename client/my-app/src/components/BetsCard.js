import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function BetsCard({home_team, away_team, moneyline, spread}) {
    const moneyAway = moneyline.outcomes[0].name === away_team ? moneyline.outcomes[0].price : moneyline.outcomes[1].price
    const moneyHome = moneyline.outcomes[0].name === home_team ? moneyline.outcomes[0].price : moneyline.outcomes[1].price
    const spreadAway = spread.outcomes[0].name === away_team ? spread.outcomes[0].price : spread.outcomes[1].price
    const spreadHome = spread.outcomes[0].name === home_team ? spread.outcomes[0].price : spread.outcomes[1].price
    const awayPoints = spread.outcomes[0].name === away_team ? spread.outcomes[0].point : spread.outcomes[1].point
    const homePoints = spread.outcomes[0].name === home_team ? spread.outcomes[0].point : spread.outcomes[1].point


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
            <Card.Header style={{'text-align': 'center'}}>Upcoming Game: 3/28/2023</Card.Header>
            <Card.Body>
              <Card.Title style={{'text-align': 'center'}}>{away_team} @ {home_team}</Card.Title>
              <br></br>
              <Card.Subtitle style={{'text-align': 'center'}}>Money Line</Card.Subtitle>
              <Card.Text>
                <p style={{'text-align': 'center'}}>Away: {moneyAway} | 
                                                    Home: {moneyHome} </p>
              </Card.Text>
              <Card.Subtitle style={{'text-align': 'center'}}>Spread</Card.Subtitle>
              <Card.Text>
                <p style={{'text-align': 'center'}}> Away: {awayPoints > 0 ? '+' : null}{awayPoints} ({spreadAway}) | 
                                                     Home: {homePoints > 0 ? '+': null}{homePoints} ({spreadHome})</p>
              </Card.Text>
            </Card.Body>
            <center>
            <InputGroup className="mb-3" style={{ width: '15rem', }} >
                <InputGroup.Text id="basic-addon1">Wager</InputGroup.Text>
                    <Form.Control
                    className="form-control"
                    placeholder="Wager in $"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    />
                 </InputGroup>
                </center>
          </Card>
        ))}
      </>
    )
        
}
export default BetsCard;