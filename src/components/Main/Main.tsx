import { Scene, resourceLoader } from '@zeainc/zea-engine'
import { useEffect, useState } from 'react'
import SplitPane from 'react-split-pane'
import { ZeaFPSDisplayWrapper } from '../FPSDisplay/ZeaFPSDisplayWrapper'

import { Header } from '../Header/Header'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import { Viewport3D } from '../Viewport3D/Viewport3D'

import { ZeaTreeViewWrapper } from '../ZeaTreeViewWrapper/ZeaTreeViewWrapper'

import './Main.css'

const Main = () => {
  const [scene] = useState<Scene>(new Scene())
  const [progressValue, setProgressValue] = useState<number>(0)
  const [appData, setAppData] = useState(null)

  const [isShown, setIsShown] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    resourceLoader.on('progressIncremented', (event) => {
      const fraction = event.percent / 100

      setProgressValue(fraction)
    })
  })

  const showContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    // Disable the default context menu
    event.preventDefault()

    setIsShown(false)
    const newPosition = {
      x: event.pageX,
      y: event.pageY,
    }

    setPosition(newPosition)
    setIsShown(true)
  }

  const hideContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsShown(false)
  }
  const [selectedValue, setSelectedValue] = useState<String>()
  const doSomething = (selectedValue: String) => {
    setSelectedValue(selectedValue)
  }
  return (
    <div
      className="Main"
      onContextMenu={showContextMenu}
      onClick={hideContextMenu}
    >
      {isShown && (
        <div
          style={{ top: position.y, left: position.x }}
          className="custom-context-menu"
        >
          <div className="option" onClick={() => doSomething('Option 1')}>
            Option #1
          </div>
          <div className="option" onClick={() => doSomething('Option 2')}>
            Option #2
          </div>
          <div className="option" onClick={() => doSomething('Option 3')}>
            Option #3
          </div>
        </div>
      )}

      <Header />

      <SplitPane defaultSize={300} minSize={30} split="vertical" style={{}}>
        <div className="Main__left-pane">
          <ZeaTreeViewWrapper scene={scene} appData={appData} />
        </div>
        <div className="Main__main-pane">
          <Viewport3D scene={scene} setAppData={setAppData} />
          {progressValue > 0 && progressValue < 1 && (
            <ProgressBar value={progressValue} />
          )}
          <div className="fps-display">
            <ZeaFPSDisplayWrapper appData={appData}></ZeaFPSDisplayWrapper>
          </div>
        </div>
      </SplitPane>
    </div>
  )
}

export { Main }
