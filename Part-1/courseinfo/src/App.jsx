const Header = (props) => {  // The Header Componenet
  return <h1>{props.course}</h1>;
};

const Part = (props) => {  // The Part Componenet
  return (
    <p>{props.part}: {props.exercise} exercises</p>
  )
}

const Content = (props) => {   // The Content Componenet
  return (
    <div>
      <Part part={props.parts[0]} exercise={props.exercises[0]} />
      <Part part={props.parts[1]} exercise={props.exercises[1]} />
      <Part part={props.parts[2]} exercise={props.exercises[2]} />
    </div>
  );
};

const Total = (props) => {  // The Total Componenet
  return (
    <p>
      Number of exercise:
      {props.exercises[0] + props.exercises[1] + props.exercises[2]}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const parts = [part1, part2, part3];  // An array of parts
  const exercises = [exercises1, exercises2, exercises3];  // An array of exercises

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total exercises={exercises} />
    </div>
  );
};

export default App;
