import { useCallback, useEffect, useState } from 'react'
import Signup from './components/Signup'
import axios from 'axios'
import './App.css'

function App() {

  const [data, setData] = useState({})

  const login = useCallback((userId, password) => {
    axios.post(`/crm/api/auth/signin`,
    {
      userId,
      password
    })
    .then(response => {
      console.log(response.data)
      setData(response.data)
    })
    .catch(error => {
      console.log("Some Error:",error)
      setData(error)
    })
  },[])
  

  return (
    <>
      <h1 className='text-5xl font-[700]'>CRM App</h1>
      {/* <button onClick={() => login("john123", "john123")}
      className=' transition-all duration-300 text-xl hover:bg-slate-200 border-2 border-slate-300 py-2 px-5 my-2 '>Click me</button>
      <p>{data.message}</p> */}
      <Signup />
    </>
  )
}

export default App
