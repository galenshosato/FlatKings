import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
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