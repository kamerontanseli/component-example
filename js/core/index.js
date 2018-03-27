export const h = (type, props, ...children) => ({ type, props, children });

export const renderToDOM = (rootNode, renderTarget)=> {
  if (renderTarget.firstChild) renderTarget.removeChild(renderTarget.firstChild);
  renderTarget.appendChild(createElement(rootNode));
  return renderTarget;
}

export const createElement = (element)=> {
  if (typeof element !== "object") {
    return document.createTextNode(element);
  } else {
    if (typeof element.type === "function") {
      return createElement(element.type(element.props));
    } else {
      const el = document.createElement(element.type);
      Object.assign(el, element.props);
      element.children.forEach(child => {
        if (Array.isArray(child)) {
          child.forEach(innerChild =>
            el.appendChild(createElement(innerChild))
          );
        } else {
          el.appendChild(createElement(child));
        }
      });
      return el;
    }
  }
}
