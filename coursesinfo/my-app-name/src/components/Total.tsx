interface TotalProps {
    exercises: number
  }
  
  const Total = ({ exercises }: TotalProps) => {
    return (
      <p>Total number of exercises: {exercises}</p>
    )
  }

export default Total