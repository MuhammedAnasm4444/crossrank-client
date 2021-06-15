import React from 'react'
import Table from './Table'
import './Leaderboard.css'

function Leaderboard() {
    return (
        <div style={{background:"#F3F7F7"}}>

        <div className="container pt-5 ">
            <div className="row">
                <h2 className="mx-auto leaderboard-heading"> Leaderboard</h2>
            </div>
           <Table />
        </div>
        </div>
    )

}

export default Leaderboard
