const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Content = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return (
    <div>
      {parts.map((part) => {
        return <Parts key={part.id} part={part} />;
      })}
      <p>
        <strong>Total of {total} exercises</strong>
      </p>
    </div>
  );
};

const Parts = ({ part }) => {
  return (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  );
};

export default Course