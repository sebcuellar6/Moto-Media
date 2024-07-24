import { useEffect, useState, useSyncExternalStore } from 'react'
import '../App.css'
import axios from 'axios'

export default function Forums () {

  const [forums, setForums] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {

        const response =  await axios.get('http://localhost:8000/forumposts/')
        console.log(response.data)
        setForums(response.data)
      }catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  return(
    <div className='heroPage'>
      <h1 style={{fontSize: '40px'}}><u>Forums</u></h1>
    </div> 
  )
  
}