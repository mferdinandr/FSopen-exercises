// const Header = ({ text }) => {
//   return <h2>{text}</h2>;
// };

// const Content = ({ items }) => {
//   return (
//     <>
//       {items.map((item, i) => (
//         <Part key={i} course={item} />
//       ))}
//     </>
//   );
// };

// const Part = ({ course }) => {
//   return (
//     <p>
//       {course.name} {course.exercises}
//     </p>
//   );
// };

// const Total = ({ times }) => {
//   return (
//     <b>
//       Total exercises : {times.reduce((acc, sum) => acc + sum.exercises, 0)}{' '}
//       exercises
//     </b>
//   );
// };

// const Course = ({ course }) => {
//   return (
//     <>
//       <Header text={course.name} />
//       <Content items={course.parts} />
//       <Total times={course.parts} />
//     </>
//   );
// };

// 2
const Header = ({ text }) => {
  return <h2>{text}</h2>;
};

const Content = ({ courses }) => {
  // console.log('aaa', courses);
  return (
    <>
      {courses.map((course, i) => (
        <Part key={i} item={course.parts} />
      ))}
    </>
  );
};

const Part = ({ item }) => {
  return (
    <>
      {item.map((course, i) => (
        <p key={i}>
          {course.name} {course.exercises}
        </p>
      ))}
    </>
  );
};

const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course, i) => (
        <div key={i}>
          <Header text={course.name} />
        </div>
      ))}
      <Content courses={courses} />
    </>
  );
};

export default Course;
