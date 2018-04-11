const el = (element, attrs, children) => {
  const dom = document.createElement(element);
  Object.assign(dom, attrs);
  children.forEach(child => {
    dom.appendChild(
      typeof child === "string" ? document.createTextNode(child) : child
    );
  });
  return dom;
};

const store = (state, reducers, component) => {
  let _state = state;
  const dispatch = {};
  const parent = el("div", {}, []);

  const render = () => {
    if (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
    parent.appendChild(component(Object.assign({}, _state, dispatch)));
  };

  Object.keys(reducers).forEach(key => {
    dispatch[key] = payload => {
      _state = reducers[key](_state, payload);
      render();
    };
  });

  render();

  return parent;
};

const Counter = ({ count, increment, decrement }) =>
  el("div", {}, [
    el("h2", {}, [`Count: ${count}`]),
    el("button", { onclick: increment }, ["+"]),
    el("button", { onclick: decrement }, ["-"])
  ]);

const app = store(
  { count: 0 },
  {
    increment(state, payload) {
      return Object.assign({}, state, {
        count: state.count + 1
      });
    },
    decrement(state, payload) {
      return Object.assign({}, state, {
        count: state.count - 1
      });
    }
  },
  Counter
);

document.body.appendChild(app);
