import '@zeainc/zea-tree-view'

import { useEffect, useRef } from 'react'

const ZeaTreeViewWrapper = (props: any) => {
  const ref = useRef<any>()

  useEffect(() => {
    const { current } = ref
    const { scene, appData } = props

    if (!current.rootTreeItem && appData) {
      console.log(appData)
      appData.displayTreeComplexity = false
      current.setTreeItem(scene.getRoot(), appData)
    }
  })

  // @ts-ignore
  return <zea-tree-view ref={ref}></zea-tree-view>
}

export { ZeaTreeViewWrapper }
