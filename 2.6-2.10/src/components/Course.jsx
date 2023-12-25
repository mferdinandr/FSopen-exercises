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

const Course = ({ courses }) => {
  return (
    <>
      <Header text={courses.name} />
      <Content items={courses.parts} />
      <Total times={courses.parts} />
    </>
  );
};

export default Course;
