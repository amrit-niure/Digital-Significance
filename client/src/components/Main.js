import React from 'react'
import axios from 'axios'
import '../App.css';
import { Link } from 'react-router-dom';

function Main() {
// state variable to store the fetched data from database
  const [input, setinput] = React.useState([{}])
React.useEffect(() => {

// fetching the data form database using /api endpoint
let endpoint = 'http://localhost:5000/api'
fetch(endpoint)
.then(res => res.json())
.then(data => {
  console.log(data)
  setinput(data)
})
.catch(err=> console.log(`Problem During the Database fetch using ${endpoint}\n ${err}`))
},[])

const deleteHandler = async (id)=>{
  let deleteEndPoint = `http://localhost:5000/api/user/${id}`
  try {
    await axios.delete(deleteEndPoint)
    setinput((prevValue) => prevValue.filter((data)=> data._id!==id))
 
  } catch (error) {
    console.error(`Error deleting the data : \n ${error}`)
  }
}
const editHandler = async (id)=>{

}
  return (<>
    <div className='main'>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>E.N</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {input.map(user => (
              <tr key={user._id}>
                <td>{user.en}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>
                  <button onClick={()=> deleteHandler(user._id)}>Del</button> 
                  <Link to={`/update/?id=${user._id}`}>  <button onClick={()=> editHandler(user._id)}> Edit</button> </Link> 
                  </td>
              </tr>
            ))}
          </tbody>

        </table> 
      </div>
    </div>
      
      </>
  )
}

export default Main
