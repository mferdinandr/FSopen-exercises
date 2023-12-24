const Header = ({ text }) => {
  return <h2>{text}</h2>;
};

const Content = ({ children }) => {
  return <p>{children}</p>;
};

const Part = ({ course }) => {
  course.parts.map((item) => console.log(item));
};

const Course = ({ course }) => {
  return (
    <>
      <Header text="Half Stack application development"></Header>
      <Content>
        <Part course={course}></Part>
      </Content>
    </>
  );
};

export default Course;
