import React from 'react'
import axios from 'axios';
import { useLocation } from "react-router-dom";
function Form() {

  // using useLocation hook to extract the id query parameter form the url which was passed/Linked  form Main.js edit button 
  // to find the exact user to fetch the data.
const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const userId = searchParams.get("id");


const [formData, setFormData] = React.useState({});
React.useEffect(() => {

  const fetchData= async (req,res) => {
    try {
      let endpoint = `http://localhost:5000/api/user/?id=${userId}`
      const response = await axios.get(endpoint)
      // console.log("Coming Data")
      // console.log(response.data)
      // console.log(response.data._id)
      setFormData(response.data)   // it fills the form or pre - populate the data in the form 
    } catch (error) {
      console.error(error)
      return null
    }
    }
fetchData()
},[userId])
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(formData);
      try {
        // console.log(`${input}`)
          const respons = await axios.put(`http://localhost:5000/api/user/${formData._id}`,formData)
          console.log("RESPONSE: Logged")
          console.log(respons.data)

        } catch (error) {
          console.log(error)
          console.log("problem here.")
        }
   alert("Data saved")
    };

  return (
    <div className='modal_container'>
      <form  action="#" onSubmit={handleSubmit} >
     <label htmlFor="name" id='id'>Employee No. </label>
        <input type="text" 
        name='en' 
        id='en'
        value={formData.en}
        onChange={handleChange}
         />
        <br /><br />
        <label htmlFor="name" id='id'>Name </label>
        <input 
        type="text" 
        id='name' 
        name='name'
        value={formData.name}
        onChange={handleChange}
        />
        <br /><br />
        <label htmlFor="email">Email </label>
        <input 
        type="text" 
        id='email' 
        name='email'
        value={formData.email}
        onChange={handleChange}
        />
        <br /><br />
        <label htmlFor="gender">Male</label>
        <input 
        type="radio" 
        name='gender' 
        id='gender' 
        value='male'
        // checked={input.gender === 'male'} // this is just to set the default value we can ignore this 
        checked = {formData.gender === 'male' ? true : false}
        onChange={handleChange}
        />
        <label htmlFor="gender">Female</label>
        <input 
        type="radio" 
        name='gender' 
        id='gender' 
        value='female'
        // checked={input.gender === 'female'} // this is just to set the default value we can ignore this 
        checked = {formData.gender === 'female' ? true : false}
        onChange={handleChange}
        />
        <br /><br />
             <button type='submit'>Save </button> 
         
      </form>
    </div>
  )
}

export default Form

