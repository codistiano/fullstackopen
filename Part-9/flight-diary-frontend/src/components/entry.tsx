import type { diary } from "../types";

interface Props {
  entry: diary;
}

const Entry = (props: Props) => {
  const { visibility, weather, date } = props.entry;
  return (
    <>
      <br />
      <h3>{date}</h3>
      <p>Visibility: {visibility}</p>
      <p>Weather: {weather}</p>
    </>
  );
};

export default Entry;
