import {
  Scene,
  TreeItem,
  Material,
  GeomItem,
  Cuboid,
  NumberParameter,
  Color,
  Xfo,
  Vec3,
} from '@zeainc/zea-engine'
// Until the Kinematics library is ported to TypeScript,
// we need this comment in order to ignore the transpiler errors.
// @ts-ignore
import { AttachmentConstraint } from '@zeainc/zea-kinematics'

const setupAnimation = (scene: Scene) => {
  const treeItem = new TreeItem('tree')
  scene.getRoot().addChild(treeItem)
  const timeParam = new NumberParameter('time', 0)
  treeItem.addParameter(timeParam)

  const cube1Material = new Material('cube1Material', 'SimpleSurfaceShader')
  cube1Material.getParameter('BaseColor').setValue(new Color(1, 0, 0))
  const cube1Item = new GeomItem(
    'aim',
    new Cuboid(0.1, 0.2, 0.3),
    cube1Material
  )
  treeItem.addChild(cube1Item)

  const cube2Material = new Material('cube2Material', 'SimpleSurfaceShader')
  cube2Material.getParameter('BaseColor').setValue(new Color(0, 1, 0))
  const cube2Item = new GeomItem(
    'aim',
    new Cuboid(0.1, 0.2, 0.3),
    cube2Material
  )
  treeItem.addChild(cube2Item)

  const cube3Material = new Material('cube3Material', 'SimpleSurfaceShader')
  cube3Material.getParameter('BaseColor').setValue(new Color(0, 0, 1))
  const cube3Item = new GeomItem(
    'aim',
    new Cuboid(0.1, 0.2, 0.3),
    cube3Material
  )
  treeItem.addChild(cube3Item)

  const cube1Xfo = new Xfo()
  cube1Xfo.tr.set(-1, 0, 0)
  cube1Item.getParameter('LocalXfo').setValue(cube1Xfo)

  const cube2Xfo = new Xfo()
  cube2Xfo.tr.set(0.5, 0, 0)
  cube2Item.getParameter('LocalXfo').setValue(cube2Xfo)

  const sttachmentConstraint = new AttachmentConstraint('AimOp')
  sttachmentConstraint.getInput('Time').setParam(timeParam)
  sttachmentConstraint
    .getOutput('Attached')
    .setParam(cube3Item.getParameter('GlobalXfo'))
  sttachmentConstraint.addAttachTarget(cube1Item.getParameter('GlobalXfo'), 0)
  sttachmentConstraint.addAttachTarget(
    cube2Item.getParameter('GlobalXfo'),
    2000
  )
  sttachmentConstraint.addAttachTarget(
    cube1Item.getParameter('GlobalXfo'),
    4000
  )

  let time = 0
  setInterval(() => {
    time += 20
    timeParam.setValue(time)

    cube1Xfo.ori.setFromAxisAndAngle(new Vec3(0, 0, 1), time * 0.001 * Math.PI)
    cube1Item.getParameter('LocalXfo').setValue(cube1Xfo)

    cube2Xfo.ori.setFromAxisAndAngle(new Vec3(0, 0, 1), time * -0.001 * Math.PI)
    cube2Item.getParameter('LocalXfo').setValue(cube2Xfo)

    if (time > 6000) time = 0
  }, 20)
}

export { setupAnimation }
