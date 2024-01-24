const Section = ({ titleSection, children }) => {
  return (
    <div className="w-3/4 sm:w-1/3 m-auto flex flex-col justify-center h-screen sm:pb-10">
      <h2 className="font-bold text-xl sm:text-3xl text-center text-blue-800">
        {titleSection}
      </h2>
      <div>{children}</div>
    </div>
  );
};

export default Section;
