import { useState } from "react";


export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

   function transition(newMode, replace = false) {

    if(replace === true) {

      setHistory([...history.slice(0, -1), newMode])

    } else {

      const newHistory = [...history, newMode]

      setHistory(newHistory)
    }

    setMode(newMode)
  }

   function back() {

    if (mode !== initial) {
    
    setMode(history[history.length - 2])

    setHistory((prev) => prev.slice(0, -1))

    }

   }


  return { mode, transition, back };
}