import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [length,setLength] = useState(8);
  const [allowNum,setAllowNum] = useState(false);
  const [allowChar,setAllowChar] = useState(false);
  const [password,setPassword] = useState("");

  const passwordRef = useRef(null);


  const passwordGenerator = useCallback(()=>{
      let pass = '';
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if(allowChar) str += "!@#$%&*"
      if(allowNum) str += "0123456789"

      for (let i = 1; i <= length; i++) {
          let char = Math.floor(Math.random() * str.length + 1) 
          pass += str.charAt(char);       
      }

      setPassword(pass)

  },[length,allowNum,allowChar]);

  const copyPassword = useCallback(() => {
    passwordRef.current ?.select()
      window.navigator.clipboard.writeText(password)
  },[password]);

  useEffect(()=> {
    passwordGenerator();
  },[length,allowNum,allowChar]);

  return (
    <>
       <div className="container flex justify-center items-center h-screen">
            <div className='bg-gray-800 w-3/5 p-10 rounded-lg flex flex-col gap-10 '>
                <div>
                  <h1 className='text-white text-4xl text-center'>Password Generator</h1>
                </div>
                <div className='flex'>
                    <input
                    className='w-full px-3 py-4 outline-none rounded-l-lg text-xl shadow-inner'
                     type="text"
                     placeholder='Password'
                     readOnly
                     value={password}
                     ref={passwordRef}
                      />
                    <button 
                    className='bg-teal-500 text-white text-xl px-10 rounded-r-lg font-semibold'
                    onClick={copyPassword}
                    >Copy</button>
                </div>
                <div className='flex gap-10'>
                    <div className='flex gap-2'>
                      <input 
                      className='text-teal-500'
                       type="range"
                       value={length}
                       min={8}
                       max={16}
                       onChange={(e) => setLength(e.target.value)}
                        />
                      <label className='text-xl text-teal-500'>Length({length})</label>
                    </div>
                    <div className='flex gap-2'>
                        <input
                        className='accent-teal-500' 
                        type="checkbox" 
                        onChange={()=> setAllowNum((prev) => !prev)}
                        />
                        <label className='text-xl text-teal-500'>Numbers</label>
                    </div>
                    <div className='flex gap-2'>
                        <input 
                        className='accent-teal-500' 
                        type="checkbox"
                        onChange={()=> setAllowChar((prev) => !prev)}
                         />
                        <label className='text-xl text-teal-500'>Characters</label>
                    </div>
                </div>
            </div>
       </div>
    </>
  )
}

export default App
