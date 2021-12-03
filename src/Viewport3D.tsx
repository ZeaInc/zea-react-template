import React from 'react'

import {
  Scene,
  GLRenderer,
  Vec3,
  Material,
  Sphere,
  GeomItem,
  Color,
  Xfo,
} from '@zeainc/zea-engine'

//@ts-ignore
//import { CADAsset } from '@zeainc/zea-cad'
import { CADAsset } from '../node_modules/@zeainc/zea-cad/dist/index.umd.js'

//import { CADAsset } = zeaCAD
class Viewport3D extends React.Component<any, any> {
  scene: Scene
  renderer?: GLRenderer
  canvasRef: React.RefObject<any>

  file: any

  constructor(props: any) {
    super(props)

    this.scene = props.scene
    this.file = props.file
    this.canvasRef = React.createRef()
  }

  // this method is called when the component is initially mounted and initially renders.
  componentDidMount() {
    this.renderer = new GLRenderer(this.canvasRef.current)
    this.renderer.setScene(this.scene)
    this.scene.setupGrid(10, 10)

    const camera = this.renderer.getViewport().getCamera()
    camera.setPositionAndTarget(new Vec3(6, 6, 5), new Vec3(0, 0, 1.5))
  }

  componentDidUpdate() {
    if (this.props.file) {
      const file = this.props.file[0].path
      const filepath = 'data/' + file
      const extension = file.split('.')[1]
      if (extension === 'zcad') {
        this.loadZCADAsset(filepath)
      } else {
        // TODO: send to zea cloud
      }
    }
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

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        className="screen"
        id="canvas"
        width="500px"
        height="500px"
      />
    )
  }
}

export { Viewport3D }
