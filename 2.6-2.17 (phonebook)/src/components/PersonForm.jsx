export const PersonForm = ({
  newName,
  number,
  handleCounter,
  handleSubmit,
  handleChangeNumber,
  handleChangeName,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input onChange={handleChangeName} value={newName} />
      </div>
      <div>
        number: <input onChange={handleChangeNumber} value={number} />
      </div>
      <div>
        <button type="submit" onClick={handleCounter}>
          add
        </button>
      </div>
    </form>
  );
};
