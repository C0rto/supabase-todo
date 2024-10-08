import { Todo } from '@/types/custom'
import React from 'react'
import TodoItem from './TodoItem'
import TodoForm from './TodoForm'

const TodoList = ({ todos }: { todos: Array<Todo> }) => {
  return (
    <>
      <TodoForm />
      <div className="w-full flex flex-col gap-4">
        {todos?.map((todo) => {
          return <TodoItem todo={todo} key={todo.id} />
        })}
      </div>
    </>
  )
}

export default TodoList
