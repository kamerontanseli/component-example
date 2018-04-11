import { store } from "./core";
import { INITIAL_STATE, increment, decrement, Counter } from "./counter";

const app = store(INITIAL_STATE, { increment, decrement }, Counter);

document.body.appendChild(app);
