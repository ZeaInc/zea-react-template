import './ProgressBar.css'

interface Props {
  value: number
}

const ProgressBar = (props: Props) => {
  const { value } = props

  return (
    <div className="ProgressBar">
      <progress className="ProgressBar__progress" value={value} />
    </div>
  )
}

export { ProgressBar }
