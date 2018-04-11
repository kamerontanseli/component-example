import { el, store } from "./core";

export const INITIAL_STATE = { count: 0 };

export const increment = state =>
  Object.assign({}, state, {
    count: state.count + 1
  });

export const decrement = state =>
  Object.assign({}, state, {
    count: state.count - 1
  });

export const Counter = ({ count, increment, decrement }) =>
  el("div", {}, [
    el("h2", {}, [`Count: ${count}`]),
    el("button", { onclick: increment }, ["+"]),
    el("button", { onclick: decrement }, ["-"])
  ]);
