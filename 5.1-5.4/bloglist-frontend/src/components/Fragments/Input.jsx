const Input = ({ type, value, name, onChange, label }) => {
  return (
    <div className="py-2 px-1 flex flex-col">
      <label className="font-bold">{label}</label>
      <input type={type} value={value} name={name} onChange={onChange} className="border-2 border-black py-1 px-2"/>
    </div>
  );
};

export default Input;
