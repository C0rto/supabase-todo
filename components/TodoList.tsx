'use client'

import { Todo } from '@/types/custom'
import TodoItem from './TodoItem'
import TodoForm from './TodoForm'
import { useOptimistic } from 'react'

export type Action = 'delete' | 'update' | 'create'

export function todoReducer(
  state: Array<Todo>,
  { action, todo }: { action: Action; todo: Todo }
) {
  switch (action) {
    case 'delete':
      return state.filter((item) => item.id !== todo.id)
    case 'update':
      return state.map((t) => (t.id === todo.id ? todo : t))
    case 'create':
      return [todo, ...state]
    default:
      return state
  }
}

export type TodoOptimisticUpdate = (action: {
  action: Action
  todo: Todo
}) => void

const TodoList = ({ todos }: { todos: Array<Todo> }) => {
  const [optimisticTodos, optimisticTodosUpdate] = useOptimistic(
    todos,
    todoReducer
  )

  return (
    <>
      <TodoForm optimisticUpdate={optimisticTodosUpdate} />
      <div className="w-full flex flex-col gap-4">
        {optimisticTodos?.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              key={todo.id}
              optimisticUpdate={optimisticTodosUpdate}
            />
          )
        })}
      </div>
    </>
  )
}

export default TodoList
