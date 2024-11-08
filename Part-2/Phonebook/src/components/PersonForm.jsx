const PersonForm = ({handleSubmit, newName, newNum, setNewName, setNewNum }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input
          type="text"
          onChange={(e) => setNewName(e.target.value)}
          value={newName}
        />
      </div>
      <br />
      <div>
        number:{" "}
        <input
          type="text"
          onChange={(e) => setNewNum(e.target.value)}
          value={newNum}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm