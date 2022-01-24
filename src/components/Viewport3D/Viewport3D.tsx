import {
  Scene,
  GLRenderer,
  Vec3,
  EnvMap,
  Color,
  TreeItem,
  InstanceItem,
  AssetLoadContext,
  Material,
  CADAsset,
  CADBody,
  PMIItem,
} from '@zeainc/zea-engine'
import { SelectionManager } from '@zeainc/zea-ux'
import type { AppData } from '@zeainc/zea-ux'
import React from 'react'

import './Viewport3D.css'

class Viewport3D extends React.Component<any, any> {
  scene: Scene
  renderer?: GLRenderer
  selectionManager?: SelectionManager
  canvasRef: React.RefObject<any>

  constructor(props: any) {
    super(props)

    this.scene = props.scene

    this.state = {
      setAppData: props.setAppData,
      setSelected: props.setSelected,
    }
    this.canvasRef = React.createRef()
  }

  // this method is called when the component is initially mounted and initially renders.
  componentDidMount() {
    this.renderer = new GLRenderer(this.canvasRef.current)
    this.renderer.setScene(this.scene)
    this.scene.setupGrid(10, 10)

    const camera = this.renderer.getViewport().getCamera()
    camera.setPositionAndTarget(new Vec3(6, 6, 5), new Vec3(0, 0, 1.5))

    // use environment map for lighting
    const envMap = new EnvMap()
    envMap.load('data/StudioG.zenv')
    this.scene.setEnvMap(envMap)

    // appData is used in initializing the selectionManager and ZeaTreeView web component
    const appData: AppData = {
      scene: this.scene,
      renderer: this.renderer,
      selectionManager: null,
      parentItem: null,
      session: null,
    }

    // Setup SelectionManager for highlights
    this.selectionManager = new SelectionManager(appData, {
      selectionOutlineColor: new Color(1, 1, 0.2, 0.1),
      branchSelectionOutlineColor: new Color(1, 1, 0.2, 0.1),
    })

    appData.selectionManager = this.selectionManager

    //send appData back to App.tsx, then to ZeaTreeViewWrapper.
    this.state.setAppData(appData)

    // Setup TreeView Display
    this.loadCADAsset('data/HC_SRO4.zcad', 'data/HC_SRO4.zcad')
    this.setPointerEvents()
  }

  // setup highlights, and other pointer events
  setPointerEvents() {
    const highlightColor = new Color('#F9CE03')
    highlightColor.a = 0.1
    const filterItem = (item: TreeItem) => {
      while (item && !(item instanceof CADBody) && !(item instanceof PMIItem)) {
        item = item.getOwner() as TreeItem
      }
      if (item.getOwner() instanceof InstanceItem) {
        item = item.getOwner() as TreeItem
      }
      return item
    }
    this.renderer.getViewport().on('pointerDown', (event) => {
      if (event.intersectionData) {
        const geomItem = filterItem(event.intersectionData.geomItem)
        if (geomItem) {
          // set selected in main
          this.props.setSelected(geomItem)
          console.log(geomItem.getPath())

          const geom = event.intersectionData.geomItem.geomParam.value
          console.log(
            geom.getNumVertices(),
            event.intersectionData.geomItem.geomIndex
          )
          let item = event.intersectionData.geomItem
          while (item) {
            const globalXfo = item.localXfoParam.value
            console.log(item.getName(), globalXfo.sc.toString())
            item = item.getOwner()
          }
        }
      }
    })

    this.renderer.getViewport().on('pointerUp', (event: any) => {
      // Detect a right click
      if (event.button === 0 && event.intersectionData) {
        // // if the selection tool is active then do nothing, as it will
        // // handle single click selection.s
        // const toolStack = toolManager.toolStack
        // if (toolStack[toolStack.length - 1] == selectionTool) return

        // To provide a simple selection when the SelectionTool is not activated,
        // we toggle selection on the item that is selcted.
        const item = filterItem(event.intersectionData.geomItem)
        if (item) {
          if (!event.shiftKey) {
            this.selectionManager.toggleItemSelection(item, !event.ctrlKey)
          } else {
            const items = new Set<TreeItem>()
            items.add(item)
            this.selectionManager.deselectItems(items)
          }
        }
      }
    })
  }

  loadCADAsset(zcad: any, filename: string) {
    const asset = new CADAsset(filename)

    const context = new AssetLoadContext()
    // pass the camera in wth the AssetLoadContext so that
    // PMI classes can bind to it.
    //@ts-ignore
    context.camera = this.renderer.getViewport().getCamera()
    asset.load(zcad, context).then(() => {
      const materials = asset.getMaterialLibrary().getMaterials()
      materials.forEach((material: Material) => {
        // Convert linear space values to gamma space values.
        // The shaders assume gamma space values, to convert to linear at render time.
        const baseColorParam = material.getParameter('BaseColor')
        if (baseColorParam) {
          const baseColor = baseColorParam.value.toGamma()
          baseColorParam.setValue(baseColor)
        }
      })

      this.renderer.frameAll()
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
