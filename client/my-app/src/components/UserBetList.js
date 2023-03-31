import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import UserBetCard from "./UserBetCard.js";


function UserBetList({bets, user}) {
  const [userBets, setUserBets] = useState([])

  console.log(user.id)



  useEffect(() => {
    fetch(`/user/${user.id}`)
    .then(resp => resp.json())
    .then(data => setUserBets(data))
  }, [user.id])


    return (
          <Stack direction ='horizontal' gap={3} className='d-flex justify-content-center'>
            {userBets.map((userBet) => {
                return ( 
                  <UserBetCard {...userBet} key={userBet.id} />
                )
            })}
         </Stack>
    )
}

export default UserBetList