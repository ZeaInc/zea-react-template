import { Scene } from '@zeainc/zea-engine'
import { useEffect, useState } from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'

import { Viewport3D } from './Viewport3D'
import { ZeaTreeViewWrapper } from './ZeaTreeViewWrapper'

import 'react-reflex/styles.css'
import './App.css'

const App = () => {
  const [scene] = useState<Scene>(new Scene())

  useEffect(() => {
    console.log('hi')
  })

  return (
    <ReflexContainer orientation="horizontal">
      <ReflexElement size={50}>Header</ReflexElement>
      <ReflexElement>
        <ReflexContainer orientation="vertical">
          <ReflexElement size={200}>
            <ZeaTreeViewWrapper scene={scene} />
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <Viewport3D scene={scene} />
          </ReflexElement>
        </ReflexContainer>
      </ReflexElement>
    </ReflexContainer>
  )
}

export default App
