import React, { useEffect, useState } from 'react'

const ResultTable = () => {
    const [results,setResults]=useState([])
    useEffect(() => {
        const tempResult=JSON.parse(localStorage.getItem('results')) || [];
        setResults(tempResult)
    },[])
    // console.log(results)
  return (
    <>
    <table border={2}>
        <thead>
            <tr>
                <th>S.No</th>
                <th>firstname</th>
                <th>lastname</th>
                <th>email</th>
                <th>total Questions</th>
                <th>result</th>
            </tr>
        </thead>
        <tbody>
          {
           
           results.map((user,index) =>
            <tr key={index}>
                <td>{index+1}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.totalqs}</td>
                <td>{user.result}</td>

            </tr>
            )

          }
        </tbody>
    </table>

    </>
  )
}

export default ResultTable