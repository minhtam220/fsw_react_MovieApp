import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  let x = 0;

  const handleClick = () => {
    setCount(count + 1);
    x++;
    console.log("count inside handleClick", count);
    console.log("x inside handleClick", x);
  };

  console.log("count outside handleClick", count);
  console.log("x outside handleClick", x);

  return (
    <div className="App">
      <header className="App-header">
        <div>{count}</div>
        <button onClick={handleClick}>+</button>
      </header>
    </div>
  );
}
