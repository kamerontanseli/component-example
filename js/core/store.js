import { renderToDOM } from './index'

export const app = (initialState, reducers, component)=> {
  let _state = Object.assign({}, initialState)
  const rootNode = document.createElement('div')

  const render = ()=> {
    renderToDOM(component(_state, dispatch), rootNode);
  }

  const dispatch = (action, payload)=> {
    if (action in reducers) {
      _state = reducers[action](_state, payload)
      render()
    }
  }

  render()

  return rootNode
}