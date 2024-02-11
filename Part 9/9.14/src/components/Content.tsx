interface Content {
  name: string;
  exerciseCount: number;
}

export const Content = ({ data }: { data: Content[] }): JSX.Element => {
  return (
    <div>
      {data.map((content) => (
        <p key={content.name}>
          {content.name} {content.exerciseCount}
        </p>
      ))}
    </div>
  );
};
