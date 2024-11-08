const Persons = ({ result, deleteFunc }) => {
  return (
    <>
      {result.map((person) => {
        return (
          <p key={person.name}>
            {person.name} {person.number}{" "}
            <button onClick={() => deleteFunc(person.id)}>Delete</button>
          </p>
        );
      })}
    </>
  );
};

export default Persons;
 