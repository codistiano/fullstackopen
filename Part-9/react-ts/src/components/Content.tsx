type Props = {
    name: string;
    exerciseCount: number;
}

const Content = (props: Props) => {
  return (
    <p>{props.name} {props.exerciseCount}</p>
  )
}

export default Content