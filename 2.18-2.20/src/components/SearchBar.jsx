const SearchBar = ({ handleSearch, searchCountrie }) => {
  return (
    <>
      <label htmlFor="input">find countries</label>
      <br />
      <input type="text" onChange={handleSearch} />
    </>
  );
};

export default SearchBar;
