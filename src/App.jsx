import data from "./data/reelData.json"
import Reel from "./components/Reel"
import { useState } from "react"

function App() {
  const [userIndex, setUserIndex] = useState(0)

  return (
    <div className="flex overflow-x-scroll snap-x snap-mandatory h-screen w-screen">
      <Reel key={userIndex} userIndex={userIndex} setUserIndex={setUserIndex} totalUsers={data.data.length}/>
    </div>
  )
}

export default App
