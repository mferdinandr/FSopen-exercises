import { useEffect } from 'react';
import { useState } from 'react';

const Title = ({ children }) => {
  return <h1>{children}</h1>;
};

const Button = ({ children, handleAdd, handleTotal }) => {
  const handleClick = () => {
    handleAdd();
    handleTotal();
  };
  return <button onClick={handleClick}>{children}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ neutral, good, bad, total }) => {
  const precentage = (good / total) * 100 + '%';
  if (total > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="total" value={total} />
          <StatisticLine text="positive" value={good > 0 ? precentage : '0%'} />
        </tbody>
      </table>
    );
  } else {
    return <h4>Not have data</h4>;
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  return (
    <>
      <Title>Feedback</Title>
      <Button
        handleAdd={() => setGood(good + 1)}
        handleTotal={() => setTotal(total + 1)}
      >
        good
      </Button>
      <Button
        handleAdd={() => setNeutral(neutral + 1)}
        handleTotal={() => setTotal(total + 1)}
      >
        neutral
      </Button>
      <Button
        handleAdd={() => setBad(bad + 1)}
        handleTotal={() => setTotal(total + 1)}
      >
        bad
      </Button>
      <Title>Statistics</Title>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </>
  );
};

export default App;
