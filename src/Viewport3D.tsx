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

  file

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

    //this.setupScene()
    //this.loadCADAsset('data/Dead_eye_bearing.zcad')
  }

  componentDidUpdate() {
    if (this.props.file) {
      const file = 'data/' + this.props.file[0].path
      this.loadCADAsset(file)
    }
  }
  setupScene() {
    const material = new Material('surfaces', 'SimpleSurfaceShader')
    material.getParameter('BaseColor')?.setValue(new Color(0.5, 0.5, 0.5))
    const sphere = new Sphere(1.0, 20, 20)

    const createSphere = (name: string, position: Vec3) => {
      const geomItem = new GeomItem(name, sphere, material, new Xfo(position))
      return geomItem
    }

    const geomItem0 = createSphere('sphere0', new Vec3(0, 0, 0))
    const geomItem1 = createSphere('sphere1', new Vec3(0, 5, 0))
    const geomItem2 = createSphere('sphere2', new Vec3(0, -5, 0))
    const geomItem3 = createSphere('sphere3', new Vec3(5, 0, 0))
    const geomItem4 = createSphere('sphere5', new Vec3(-5, 0, 0))

    // Add geometry to the SceneTree and also create a hierarchy of geometry by parenting geometry.
    this.scene.getRoot().addChild(geomItem0)
    this.scene.getRoot().addChild(geomItem1)
    geomItem1.addChild(geomItem2)
    geomItem2.addChild(geomItem3)
    geomItem2.addChild(geomItem4)
  }

  loadCADAsset(filepath: string) {
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
