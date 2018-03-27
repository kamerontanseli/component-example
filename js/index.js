/** @jsx h */
import { h } from "./core";
import { app } from "./core/store";

const main = app(
  {
    todos: []
  },
  {
    ADD_TODO: (state, todo) => {
      const todos = JSON.parse(JSON.stringify(state.todos));
      todos.push({ complete: false, todo });
      return { todos };
    },
    TOGGLE_TODO: (state, index) => {
      const todos = JSON.parse(JSON.stringify(state.todos));
      todos[index] = Object.assign({}, todos[index], {
        complete: !todos[index].complete
      });
      return { todos };
    }
  },
  ({ todos }, dispatch) => (
    <div>
      <input
        type="text"
        autofocus
        onkeydown={e => {
          if (e.keyCode === 13) {
            dispatch("ADD_TODO", e.currentTarget.value);
            e.currentTarget.value = "";
            e.currentTarget.focus()
          }
        }}
      />
      <ul>
        {todos.map((todo, index) => (
          <li>
            <input
              onclick={() => dispatch("TOGGLE_TODO", index)}
              type="checkbox"
              checked={todo.complete}
            />
            {" "+todo.todo}
          </li>
        ))}
      </ul>
    </div>
  )
);

document.body.appendChild(main);
