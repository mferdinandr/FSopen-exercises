const Header = ({ text }) => {
  return <h2>{text}</h2>;
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, i) => (
        <Part key={i} part={part} />
      ))}
    </>
  );
};

const Part = ({ part }) => {
  return (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  );
};

const Total = ({ items }) => {
  return (
    <b>
      total of {items.reduce((sum, item) => sum + item.exercises, 0)} exercises
    </b>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header text={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total items={course.parts} />
    </>
  );
};

export default Course;
