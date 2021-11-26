import '@zeainc/zea-tree-view'
import { useEffect, useRef } from 'react'

const ZeaTreeViewWrapper = () => {
  const ref = useRef()

  useEffect(() => {
    const { current } = ref

    console.log(current)
  })

  // @ts-ignore
  return <zea-tree-view ref={ref}></zea-tree-view>
}

export { ZeaTreeViewWrapper }
