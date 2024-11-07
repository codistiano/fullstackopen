const Filter = ({filtering, search}) => {
  return (
    <div>
      <p>
        Filter Shown with <input onChange={filtering} value={search} />
      </p>
    </div>
  );
};

export default Filter