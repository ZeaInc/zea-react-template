import '@zeainc/zea-tree-view'
import { useEffect, useRef } from 'react'

const ZeaTreeViewWrapper = (props: any) => {
  const ref = useRef<any>()

  useEffect(() => {
    const { current } = ref
    const { scene } = props
    if(!current.rootTreeItem)
      current.setTreeItem(scene.getRoot())
  })

  // @ts-ignore
  return <zea-tree-view ref={ref}></zea-tree-view>
}

export { ZeaTreeViewWrapper }
