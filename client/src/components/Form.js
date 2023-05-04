import React from 'react'
import axios from 'axios';
function Form() {
  
  const [input,setInput] = React.useState({
    en:'',
    name:'',
    email:'',
    gender:''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput(() => ({
      ...input,
      [name]: value
    }));
  };

  // send data to server using axios
  const handleSubmit =  async (e) => {
    e.preventDefault()
    console.log("Sending form");
    try {
      // console.log(`${input}`)
        const respons = await axios.post('http://localhost:5000/api/user',input)
        console.log("RESPONSE: Logged")
        console.log(respons.data)

        
      } catch (error) {
        console.log(error)
        console.log("problem here.")
      }
 alert("Data saved")
      
}
  return (
    <div className='form'>
      {/* <form  action='http://localhost:5000/api/user' method='POST'> */}
      <form  action="#" onSubmit={handleSubmit} >
     <label htmlFor="name" id='id'>Employee No. </label>
        <input type="text" 
        name='en' 
        id='en'
        value={input.en}
        onChange={handleChange}
         />
        <br /><br />
        <label htmlFor="name" id='id'>Name </label>
        <input 
        type="text" 
        id='name' 
        name='name'
        value={input.name}
        onChange={handleChange}
        />
        <br /><br />
        <label htmlFor="email">Email </label>
        <input 
        type="text" 
        id='email' 
        name='email'
        value={input.email}
        onChange={handleChange}
        />
        <br /><br />
        <label htmlFor="gender">Male</label>
        <input 
        type="radio" 
        name='gender' 
        id='gender' 
        value='male'
        checked={input.gender === 'male'} // this is just to set the default value we can ignore this 
        onChange={handleChange}
        />
        <label htmlFor="gender">Female</label>
        <input 
        type="radio" 
        name='gender' 
        id='gender' 
        value='female'
        checked={input.gender === 'female'} // this is just to set the default value we can ignore this 
        onChange={handleChange}
        />
        <br /><br />
             <button type='submit'>Save </button> 
             {/* */}
      </form>
    </div>
  )
}

export default Form

