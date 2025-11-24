import { Scene, resourceLoader, TreeItem } from '@zeainc/zea-engine'
import { useEffect, useState } from 'react'
import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import { ContextMenu } from '../ContextMenu/ContextMenu'
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
  const [selected, setSelected] = useState<TreeItem>()

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

  return (
    <div
      className="Main"
      onContextMenu={showContextMenu}
      onClick={hideContextMenu}
    >
      {isShown && (
        <ContextMenu position={position} contextItem={selected}></ContextMenu>
      )}

      <Header />

      <div className="Main__split-container">
        <Allotment>
          <Allotment.Pane minSize={30} preferredSize={300}>
            <div className="Main__left-pane">
              <ZeaTreeViewWrapper scene={scene} appData={appData} />
            </div>
          </Allotment.Pane>
          <Allotment.Pane>
            <div className="Main__main-pane">
              <Viewport3D
                scene={scene}
                setAppData={setAppData}
                setSelected={setSelected}
              />
              {progressValue > 0 && progressValue < 1 && (
                <ProgressBar value={progressValue} />
              )}
              <div className="fps-display">
                <ZeaFPSDisplayWrapper appData={appData}></ZeaFPSDisplayWrapper>
              </div>
            </div>
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  )
}

export { Main }
