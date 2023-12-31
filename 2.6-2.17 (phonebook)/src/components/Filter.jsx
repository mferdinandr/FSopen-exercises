export const Filter = ({ handleChangeFilter }) => {
  return (
    <form>
      <div>
        filter shown with: <input onChange={handleChangeFilter} />
      </div>
    </form>
  );
};
