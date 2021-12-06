import {
  Scene,
  GLRenderer,
  Vec3,
  Material,
  Sphere,
  GeomItem,
  Color,
  Xfo,
  EnvMap,
} from '@zeainc/zea-engine'
import React from 'react'

import './Viewport3D.css'

//@ts-ignore
import { CADAsset } from '@zeainc/zea-cad'
class Viewport3D extends React.Component<any, any> {
  scene: Scene
  renderer?: GLRenderer
  canvasRef: React.RefObject<any>

  constructor(props: any) {
    super(props)

    this.scene = props.scene

    this.canvasRef = React.createRef()
  }

  // this method is called when the component is initially mounted and initially renders.
  componentDidMount() {
    this.renderer = new GLRenderer(this.canvasRef.current)
    this.renderer.setScene(this.scene)
    this.scene.setupGrid(10, 10)

    const camera = this.renderer.getViewport().getCamera()
    camera.setPositionAndTarget(new Vec3(6, 6, 5), new Vec3(0, 0, 1.5))

    const envMap = new EnvMap()
    envMap.load('data/StudioG.zenv')
    this.scene.setEnvMap(envMap)

    this.loadZCADAsset('data/HC_SRO4.zcad')
  }

  loadZCADAsset(filepath: string) {
    const asset = new CADAsset()
    asset.load(filepath).then(() => {
      this.renderer.frameAll()
    })
    asset.getGeometryLibrary().on('loaded', () => {
      postMessage('done-loading')
    })
    this.scene.getRoot().addChild(asset)
  }

  // The Viewport3D component needs a reference to the canvas in order to initialize.
  render() {
    return (
      <div className="Viewport3D">
        <canvas
          ref={this.canvasRef}
          className="screen"
          id="canvas"
          width="500px"
          height="500px"
        />
      </div>
    )
  }
}

export { Viewport3D }
