import { CoursePart } from "../App"

interface PartProps {
  part: CoursePart
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises)
          <br />
          <em>{part.description}</em>
        </p>
      )
    case "group":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises)
          <br />
          project exercises: {part.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises)
          <br />
          <em>{part.description}</em>
          <br />
          background reading material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
        </p>
      )
    default:
      return <p>Unknown course part</p>
  }
}

export default Part
