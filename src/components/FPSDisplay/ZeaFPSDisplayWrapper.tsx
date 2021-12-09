import './zea-fps-display'
import { useEffect, useRef } from 'react'

const ZeaFPSDisplayWrapper = (props: any) => {
  const ref = useRef<any>()

  useEffect(() => {
    const { current } = ref
    const { appData } = props
    if (appData) {
      current.renderer = appData.renderer
    }
  })

  // @ts-ignore
  return <zea-fps-display ref={ref}></zea-fps-display>
}

export { ZeaFPSDisplayWrapper }
