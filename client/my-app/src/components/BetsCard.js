import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function BetsCard({home_team, away_team, bookmakers, markets, outcomes}) {
    return (
        <>
        {['Dark',].map((variant) => (
          <Card
            bg={variant.toLowerCase()}
            key={variant}
            text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
            style={{ width: '30rem' }}
            className="mb-2"
          >
            <Card.Header>Upcoming Game: 3/28/2023</Card.Header>
            <Card.Body>
              <Card.Title style={{'text-align': 'center'}}>{home_team} vs {away_team}</Card.Title>
              <Card.Text>
                <p style={{'text-align': 'center'}}>H2H Home: {bookmakers[0].markets[0].outcomes[1].price} | H2H Away: {bookmakers[0].markets[0].outcomes[0].price}</p>
                <p style={{'text-align': 'center'}}>Spread Home: {bookmakers[0].markets[1].outcomes[1].point} | Spread Away: {bookmakers[0].markets[1].outcomes[0].point}</p>
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