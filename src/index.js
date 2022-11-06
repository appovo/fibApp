import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

function fib(n) {
  if (n < 2) {
    return n;
  }
  return fib(n - 2) + fib(n - 1);
}

class App extends React.Component {
  state = {
    numbers: [],
    baseNumber: 15,
    range: 5,
  };

  generateNewNumber(prevState) {
    return {
      id: prevState.numbers.length + 1,
      value: Math.floor(Math.random() * prevState.range) + prevState.baseNumber,
    };
  }

  render() {
    return (
      <div className="App">
        <H1>Fibonaccis</H1>
        <RangeInput
          onChange={(baseNumber) => this.setState({ baseNumber })}
          value={this.state.baseNumber}
          min="1"
          max="35"
        >
          Number: {this.state.baseNumber}
        </RangeInput>
        <br />
        <RangeInput
          onChange={(range) => this.setState({ range })}
          value={this.state.range}
          min="0"
          max="5"
        >
          Spread: {this.state.range}
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
        {this.state.numbers.map((number) => (
          <Fib n={number.value} />
        ))}
      </div>
    );
  }
}

class H1 extends React.Component {
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
const COLORS = ["black", "red", "green", "blue"];
function Fib({ n }) {
  const [colorIndex, setColorIndex] = useState(n % COLORS.length);
  const color = COLORS[colorIndex];
  function changeColor() {
    setColorIndex((prevColorIndex) => (prevColorIndex + 1) % COLORS.length);
  }
  return (
    <li style={{ color }}>
      fib({n}) = {fib(n)} <button onClick={changeColor}>Change Color</button>
    </li>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
