const Section = ({ titleSection, children }) => {
  return (
    <div>
      <h2 className="font-bold text-xl sm:text-3xl text-blue-800 ">
        {titleSection}
      </h2>
      <div>{children}</div>
    </div>
  );
};

export default Section;
