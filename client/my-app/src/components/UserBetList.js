import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import UserBetCard from "./UserBetCard.js";


function UserBetList() {
  const [userBets, setUserBets] = useState([])


  useEffect(() => {
    fetch(`/user/1`)
    .then(resp => resp.json())
    .then(data => setUserBets(data))
  }, [])


    return (
          <Stack direction ='horizontal' gap={3} className='d-flex justify-content-center'>
            {userBets.map((userBet) => {
                return ( 
                  <UserBetCard {...userBet} key={userBet.id} setUserBets={setUserBets} />
                )
            })}
         </Stack>
    )
}

export default UserBetList