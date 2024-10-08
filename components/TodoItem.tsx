'use client'

import { cn } from '@/lib/utils'
import { Todo } from '@/types/custom'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Checkbox } from './ui/checkbox'
import { Trash2 } from 'lucide-react'
import { deleteTodo, updateTodo } from '@/app/actions'
import { useFormStatus } from 'react-dom'
import { TodoOptimisticUpdate } from './TodoList'

const TodoItem = ({
  todo,
  optimisticUpdate,
}: {
  todo: Todo
  optimisticUpdate: TodoOptimisticUpdate
}) => {
  return (
    <form>
      <TodoCard todo={todo} optimisticUpdate={optimisticUpdate} />
    </form>
  )
}

export default TodoItem

export function TodoCard({
  todo,
  optimisticUpdate,
}: {
  todo: Todo
  optimisticUpdate: TodoOptimisticUpdate
}) {
  const { pending } = useFormStatus()
  const [isChecked, setIsChecked] = useState(todo.is_complete)
  return (
    <Card className={cn('w-full', pending && 'opacity-30')}>
      <CardContent className="flex items-start gap-3 p-3">
        <span className="size-10 flex items-center justify-center">
          <Checkbox
            disabled={pending}
            checked={Boolean(isChecked)}
            onCheckedChange={async (val) => {
              if (val === 'indeterminate') return
              setIsChecked(val)
              await updateTodo({ ...todo, is_complete: val })
            }}
          />
        </span>
        <p className={cn('flex-1 pt-2 min-w-0 break-words')}>{todo.task}</p>
        <Button
          disabled={pending}
          variant="ghost"
          size="icon"
          formAction={async () => {
            optimisticUpdate({ action: 'delete', todo })
            await deleteTodo(todo.id)
          }}
        >
          <Trash2 />
          <span className="sr-only">Delete Todo</span>
        </Button>
      </CardContent>
    </Card>
  )
}
