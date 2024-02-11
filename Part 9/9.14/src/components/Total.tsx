interface Content {
  name: string;
  exerciseCount: number;
}

export const Total = ({ total }: { total: Content[] }): JSX.Element => {
  const totalExercises = total.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );
  return <p>Number of exercises {totalExercises}</p>;
};
