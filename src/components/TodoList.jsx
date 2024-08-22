import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { toggleTodo, toggleShowCompletedTodos } from '../redux/actions';

const StyledTodo = styled.li`
  text-decoration: ${pr => (pr.$complete ? 'line-through' : 'initial')};
  cursor: pointer;
`;

export default function TodoList() {
  const todos = useSelector(state => state.todosState.todos);
  const showCompletedTodos = useSelector(state => state.todosState.showCompletedTodos);
  const dispatch = useDispatch();

  return (
    <div id="todos">
      <h3>Todos</h3>
      <ul>
        {todos
          .filter(todo => showCompletedTodos || !todo.complete)
          .map(todo => (
            <StyledTodo
              onClick={() => dispatch(toggleTodo(todo.id))}
              $complete={todo.complete}
              key={todo.id}
            >
              <span>
                {todo.label}
                {todo.complete && ' ✔️'}
              </span>
            </StyledTodo>
          ))}
      </ul>
      <button onClick={() => dispatch(toggleShowCompletedTodos())}>
        {showCompletedTodos ? 'Hide' : 'Show'} completed todos
      </button>
    </div>
  );
}

