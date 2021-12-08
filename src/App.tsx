import { Scene, resourceLoader } from '@zeainc/zea-engine'
import { useEffect, useState } from 'react'
import SplitPane from 'react-split-pane'

import { ProgressBar } from './components/ProgressBar'
import { Viewport3D } from './components/Viewport3D/Viewport3D'

import { ZeaTreeViewWrapper } from './ZeaTreeViewWrapper'

import './App.css'

const App = () => {
  const [scene] = useState<Scene>(new Scene())
  const [progressValue, setProgressValue] = useState<number>(0)

  useEffect(() => {
    resourceLoader.on('progressIncremented', (event) => {
      setProgressValue(event.percent)
    })
  })

  return (
    <div className="App">
      <SplitPane split="vertical" minSize={10} defaultSize={300}>
        <div>
          <ZeaTreeViewWrapper scene={scene} />
        </div>
        <div className="App__main-pane">
          <Viewport3D scene={scene} />

          {progressValue > 0 && progressValue < 1 && (
            <ProgressBar value={progressValue} />
          )}
        </div>
      </SplitPane>
    </div>
  )
}

export default App
