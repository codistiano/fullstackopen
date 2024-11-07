const Persons = ({ result }) => {
  return (
    <>
      {result.map((person) => {
        return (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        );
      })}
    </>
  );
};

export default Persons;
