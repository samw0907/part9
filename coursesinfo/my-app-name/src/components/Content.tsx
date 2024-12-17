import Part from "./Part"
import { CoursePart } from "../App"

interface ContentProps {
  parts: CoursePart[]
}

const Content = ({ parts }: ContentProps) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  )
}

export default Content
