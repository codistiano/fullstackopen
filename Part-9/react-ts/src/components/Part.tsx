type Props = {
    name: string;
    exerciseCount: number;
    description?: string;
    groupProjectCount?: number;
    backgroundMaterial?: string;
    requirements?: string[];
}

const Part = ({ name, exerciseCount, description, groupProjectCount, backgroundMaterial, requirements }: Props) => {
  return (
    <div>
      <p><strong>{name} {exerciseCount}</strong></p>
      {description && <p>{description}</p>}
      {typeof groupProjectCount === "number" && <p>Group projects: {groupProjectCount}</p>}
      {backgroundMaterial && <p>Background: <a href={backgroundMaterial}>{backgroundMaterial}</a></p>}
      {requirements && <p>Requirements: {requirements.join(", ")}</p>}
    </div>
  )
}

export default Part