import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import UserBetCard from "./UserBetCard.js";
import { useParams } from "react-router-dom";


function UserBetList() {
  const [userBets, setUserBets] = useState([])

  const { id } = useParams()

  useEffect(() => {
    fetch(`/user/${id}`)
    .then(resp => resp.json())
    .then(data => setUserBets(data))
  }, [])


  function handleClick(event) {
    for (let bet of userBets) {
      fetch(`/bet/${bet.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })
      .then(resp => resp.json())
      
    }


  }


    return (
          <>
          <Stack direction ='horizontal' gap={3} className='d-flex justify-content-center'>
            {userBets.map((userBet) => {
                return ( 
                  <UserBetCard {...userBet} key={userBet.id} setUserBets={setUserBets} />
                )
            })}
         </Stack>
         <br></br>
         <br></br>
         <Button variant='warning' style={{marginLeft: '57rem'}} onClick={handleClick}>Update</Button>
         </>
    )
}

export default UserBetList