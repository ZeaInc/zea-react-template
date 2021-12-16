import { MenuItem } from './MenuItem'

const ContextMenu = (props: any) => {
  const { position, selected } = props
  const hideModel = () => {
    selected.visibleParam.value = false
  }
  return (
    <div
      style={{ top: position.y, left: position.x }}
      className="custom-context-menu"
    >
      <MenuItem text={'Hide'} onClick={hideModel}></MenuItem>
    </div>
  )
}
export { ContextMenu }
