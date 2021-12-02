import { Scene } from '@zeainc/zea-engine'
import { useEffect, useState } from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'

import { Viewport3D } from './Viewport3D'
import { ZeaTreeViewWrapper } from './ZeaTreeViewWrapper'

import 'react-reflex/styles.css'
import './App.css'
import Dropzone from 'react-dropzone'

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

const App = () => {
  const [scene] = useState<Scene>(new Scene())
  const [file, setFile] = useState<any>(null)
  const [open, setOpen] = useState<boolean>(true)
  useEffect(() => {
    console.log('hi')
  })

  return (
    <ReflexContainer orientation="horizontal">
      <ReflexElement size={50}>
        <Popup open={open} modal nested>
          {(close: any) => (
            <div className="modal">
              <button className="close" onClick={close}>
                &times;
              </button>

              <Dropzone
                onDrop={(acceptedFiles) => {
                  setFile(acceptedFiles)
                  setOpen(false)
                }}
              >
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
            </div>
          )}
        </Popup>
        Header
      </ReflexElement>
      <ReflexElement>
        <ReflexContainer orientation="vertical">
          <ReflexElement size={200}>
            <ZeaTreeViewWrapper scene={scene} />
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement>
            <Viewport3D scene={scene} file={file} />
          </ReflexElement>
        </ReflexContainer>
      </ReflexElement>
    </ReflexContainer>
  )
}

export default App
