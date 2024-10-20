import { useCallback, useEffect, useState } from 'react'
import './App.css'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useRef } from 'react';

function App() {
  const [length, setLength] = useState(10)
  const [password, setPassword] = useState("")
  const [includechar, setIncludechar] = useState(false)
  const [includenumber, setIncludenumber] = useState(false)

  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if (includenumber){
    str += "1234567890"
  }

  if (includechar){
    str += "!@#$%^&*(){}[]"
  }

  const passref = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    for(let i = 0; i < length ;i++){
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, includechar, includenumber])

  useEffect( () => {
    passwordGenerator()
  }, [length, includechar, includenumber])

  const copyToClipboard = useCallback( () => {
    passref.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div className="box">
        <Card>
          <div className="main">
            <TextField id="password" variant="outlined" placeholder='Password' value={password} inputRef={passref} aria-readonly/>
            <Button id="copy" variant="contained" onClick={ () => {copyToClipboard()}}>COPY</Button>
          </div>
          <div className="parameters">
            <div className="length">
              <label>Length : {length}</label>
              <input type="range" min={10} max={20} defaultValue={10}
              onChange={ (e) => {
                setLength(e.target.value)
              }} />
            </div>
            <div className="char">
              <label>Character</label>
              <input 
                type="checkbox" 
                checked = {includechar}
                onChange={(e) => {setIncludechar(e.target.checked)}}
              />
            </div>
            <div className="num">
              <label>Number</label>
              <input 
                type="checkbox"
                checked = {includenumber}
                onChange={(e) => {setIncludenumber(e.target.checked)}}
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

export default App
