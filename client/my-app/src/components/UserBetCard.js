import React from "react";
import { Card, Button} from 'react-bootstrap';

function UserBetCard({ team_name, description, odds, wager, result, id, setUserBets, success }) {

  function handleDelete(id) {
    fetch(`/bet/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())

    setUserBets(prev => prev.filter(bet => {
      return bet.id !== id
    }))


  }


  return (
        <>
        {['Dark'].map((variant) => (
            <Card
              bg={success ? 'success' : variant.toLowerCase()}
              key={variant}
              text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
              style={{ width: '30rem' }}
              className="mb-2 text-center"
              border='warning'
            >
              <Card.Body>
                <Card.Title style={{'textAlign': 'center'}}>{team_name}</Card.Title>
                <Card.Text style={{'textAlign': 'center'}}>
                  {description === 'h2h' ? 'Money Line': 'Spread'}
                  <p style={{'textAlign': 'center'}}>Odds: {odds}</p>
                  <p style={{'textAlign': 'center'}}>Bet: ${wager} | Result: ${result}</p>
                </Card.Text>
                <Button as="delete" value='Delete' variant='secondary' size='sm' className="mx-auto" onClick={() => handleDelete(id)}>Refund</Button>
              </Card.Body>
            </Card>
        ))}
        </>
)
    
}
export default UserBetCard