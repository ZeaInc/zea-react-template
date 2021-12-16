import { TreeItem } from '@zeainc/zea-engine'
import { MenuItem } from './MenuItem'

const ContextMenu = (props: any) => {
  const { position, contextItem } = props
  const hideModel = () => {
    if (contextItem instanceof TreeItem) {
      contextItem.visibleParam.value = false
    }
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
