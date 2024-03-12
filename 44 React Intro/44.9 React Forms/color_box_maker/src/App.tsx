import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Color Box Maker</h1>
      <div>
        <button onClick={() => setCount(count + 1)}>Click me</button>
        <p>Count: {count}</p>
      </div>
    </>
  )
}

export default App
