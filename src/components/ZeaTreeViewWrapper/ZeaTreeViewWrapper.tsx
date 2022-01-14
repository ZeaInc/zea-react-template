import '@zeainc/zea-tree-view'

import { useEffect, useRef } from 'react'

const ZeaTreeViewWrapper = (props: any) => {
  const ref = useRef<any>()

  useEffect(() => {
    const { current } = ref
    const { scene, appData } = props

    if (!current.rootTreeItem && appData) {
      appData.displayTreeComplexity = false
      current.setTreeItem(scene.getRoot(), appData)
    }
  })

  // @ts-ignore
  // See:
  // https://custom-elements-everywhere.com/libraries/react/results/results.html
  return <zea-tree-view ref={ref}></zea-tree-view>
}

export { ZeaTreeViewWrapper }
