import { useEffect, useState } from "react";
import {useParams} from "react-router-dom"

function User() {
  const [bets, setUserBets] = useState([])


  useEffect(() => {
    fetch(`/user/1`)
    .then(resp => resp.json())
    .then(data => setUserBets(data))
  }, [])


    return(
        <section>
          <ul>
            {bets.map(bet => {
              return  <li>{bet.team_name}  ||  {bet.description}  ||  {bet.odds}  ||  {bet.wager}</li>
            })}
          </ul>
        </section>
    )
}

export default User