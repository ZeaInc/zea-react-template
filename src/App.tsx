import { Scene } from '@zeainc/zea-engine'
import { useEffect, useState } from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'

import { Viewport3D } from './Viewport3D'
import { ZeaTreeViewWrapper } from './ZeaTreeViewWrapper'

import 'react-reflex/styles.css'
import './App.css'
import Dropzone from 'react-dropzone'

const App = () => {
  const [scene] = useState<Scene>(new Scene())
  const [file, setFile] = useState<any>(null)

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
            <Dropzone onDrop={(acceptedFiles) => setFile(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
            <Viewport3D scene={scene} file={file} />
          </ReflexElement>
        </ReflexContainer>
      </ReflexElement>
    </ReflexContainer>
  )
}

export default App
