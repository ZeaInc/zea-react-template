import { Scene, resourceLoader } from '@zeainc/zea-engine'
import { useEffect, useState } from 'react'
import SplitPane from 'react-split-pane'

import { Header } from '../Header/Header'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import { Viewport3D } from '../Viewport3D/Viewport3D'

import { ZeaTreeViewWrapper } from '../ZeaTreeViewWrapper/ZeaTreeViewWrapper'

import './Main.css'

const Main = () => {
  const [scene] = useState<Scene>(new Scene())
  const [progressValue, setProgressValue] = useState<number>(0)
  const [appData, setAppData] = useState(null)

  useEffect(() => {
    resourceLoader.on('progressIncremented', (event) => {
      setProgressValue(event.percent)
    })
  })

  return (
    <div className="Main">
      <Header />

      <SplitPane defaultSize={300} minSize={10} split="vertical" style={{}}>
        <div className="Main__left-pane">
          <ZeaTreeViewWrapper scene={scene} appData={appData}/>
        </div>
        <div className="Main__main-pane">
          <Viewport3D scene={scene} setAppData={setAppData} />

          {progressValue > 0 && progressValue < 1 && (
            <ProgressBar value={progressValue} />
          )}
        </div>
      </SplitPane>
    </div>
  )
}

export { Main }
