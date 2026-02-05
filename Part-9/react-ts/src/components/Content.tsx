import Part from "./Part";
import type { CoursePart } from "../App";

type Props = {
  courseParts: CoursePart[];
};

const Content = ({ courseParts }: Props) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`,
    );
  };

  return (
    <>
      {courseParts.map((element) => {
        switch (element.kind) {
          case "basic":
            return (
              <Part
                name={element.name}
                exerciseCount={element.exerciseCount}
                description={element.description}
              />
            );
          case "group":
            return (
              <Part
                name={element.name}
                exerciseCount={element.exerciseCount}
                groupProjectCount={element.groupProjectCount}
              />
            );
          case "background":
            return (
              <Part
                name={element.name}
                exerciseCount={element.exerciseCount}
                backgroundMaterial={element.backgroundMaterial}
              />
            );
          case "special":
            return (
              <Part
                name={element.name}
                exerciseCount={element.exerciseCount}
                description={element.description}
                requirements={element.requirements}
              />
            );
          default:
            return assertNever(element);
        }
      })}
    </>
  );
};

export default Content;
