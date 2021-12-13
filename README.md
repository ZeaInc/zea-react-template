# Zea + React

This is a template app which intregrates Zea's tools (such as the
[Zea Engine](https://www.zea.live/en/zea-engine)) and React.

## Getting Started

Clone this repository to your local machine, and then in the project directory run:

```bash
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Features

Plugins:

- [Zea-CAD](https://docs.zea.live/zea-cad/#/)
- [Zea-UX](https://docs.zea.live/zea-ux/#/)
- [Zea-Tree-View](https://github.com/ZeaInc/zea-tree-view)

Debugging features:

- FPS display
- Tree weight cost <br>
  to enable this feature, in ZeaTreeViewWrapper, set appData.displayTreeComplexity to equal true
  ```tsx
  appData.displayTreeComplexity = true
  current.setTreeItem(scene.getRoot(), appData)
  ```
  This feature color codes each tree node to indicate the size of the subtree when expanded.
  Red means that the tree has high levels of complexity, darker tones mean relatively less complexity.
