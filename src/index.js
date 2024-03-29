import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { v4 as uuid } from "uuid";
import moize from "moize";

function fib(n) {
  if (n < 2) {
    return n;
  }
  return fib(n - 2) + fib(n - 1);
}

const memoizedFib = moize(fib);

class App extends React.Component {
  state = {
    numbers: [],
    baseNumber: 15,
    range: 5,
  };

  generateNewNumber(prevState) {
    return {
      id: uuid(),
      value: Math.floor(Math.random() * prevState.range) + prevState.baseNumber,
    };
  }
  handleRangeChange = (range) => this.setState({ range });
  handleBaseChange = (baseNumber) => this.setState({ baseNumber });
  render() {
    const rangeLabel = `Spread: ${this.state.range}`;
    const numberLabel = `Number: ${this.state.baseNumber}`;
    return (
      <div className="App">
        <H1>Fibonaccis</H1>
        <RangeInput
          onChange={this.handleBaseChange}
          value={this.state.baseNumber}
          min="1"
          max="35"
        >
          {numberLabel}
        </RangeInput>
        <br />
        <RangeInput
          onChange={this.handleRangeChange}
          value={this.state.range}
          min="0"
          max="5"
        >
          {rangeLabel}
        </RangeInput>
        <br />
        <button
          onClick={() => {
            this.setState((prevState) => {
              const newNumber = this.generateNewNumber(prevState);
              return { numbers: [newNumber, ...prevState.numbers] };
            });
          }}
        >
          Prepend new number
        </button>
        <button
          onClick={() => {
            this.setState((prevState) => {
              const newNumber = this.generateNewNumber(prevState);
              return { numbers: [...prevState.numbers, newNumber] };
            });
          }}
        >
          Append new number
        </button>
        <Fibs numbers={this.state.numbers} />
      </div>
    );
  }
}

class H1 extends React.PureComponent {
  render() {
    return <h1>{this.props.children}</h1>;
  }
}

class RangeInput extends React.PureComponent {
  render() {
    const { value, onChange, min, max, children } = this.props;
    return (
      <label>
        {children}
        <input
          onChange={(event) => onChange(parseInt(event.target.value, 10))}
          type="range"
          min={min}
          max={max}
          step="1"
          value={value}
        />
      </label>
    );
  }
}
const Fibs = React.memo(({ numbers }) => {
  const handleClick = useCallback(
    (n, fibN) => console.log(`Clicked on fib(${n}) = ${fibN}`),
    []
  );
  return (
    <>
      {numbers.map((number) => (
        <Fib key={number.id} n={number.value} onClick={handleClick} />
      ))}
    </>
  );
});
const COLORS = ["black", "red", "green", "blue"];
const Fib = React.memo(function Fib({ n, onClick }) {
  const [colorIndex, setColorIndex] = useState(n % COLORS.length);
  const color = COLORS[colorIndex];
  const fibN = memoizedFib(n);
  function changeColor() {
    setColorIndex((prevColorIndex) => (prevColorIndex + 1) % COLORS.length);
  }
  return (
    <li style={{ color }} onClick={() => onClick(n, fibN)}>
      fib({n}) = {fibN} <button onClick={changeColor}>Change Color</button>
    </li>
  );
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
