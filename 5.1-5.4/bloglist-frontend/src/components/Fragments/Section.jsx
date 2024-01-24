const Section = ({ titleSection, children }) => {
  return (
    <div className=" w-1/3 m-auto flex flex-col justify-center h-screen">
      <h2 className="font-bold text-2xl text-center">{titleSection}</h2>
      <div>{children}</div>
    </div>
  );
};

export default Section;
