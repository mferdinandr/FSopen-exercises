const Header = ({ text }) => {
  return <h2>{text}</h2>;
};

const Content = ({ items }) => {
  return (
    <>
      {items.map((item, i) => (
        <Part key={i} course={item} />
      ))}
    </>
  );
};

const Part = ({ course }) => {
  return (
    <p>
      {course.name} {course.exercises}
    </p>
  );
};

const Total = ({ times }) => {
  return (
    <b>
      Total exercises : {times.reduce((acc, sum) => acc + sum.exercises, 0)}{' '}
      exercises
    </b>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header text={course.name} />
      <Content items={course.parts} />
      <Total times={course.parts} />
    </>
  );
};

export default Course;
