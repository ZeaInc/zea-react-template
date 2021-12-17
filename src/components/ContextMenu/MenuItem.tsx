const MenuItem = (props: any) => {
  const { text, onClick } = props

  return (
    <div className="option" onClick={() => onClick()}>
      {text}
    </div>
  )
}
export { MenuItem }
