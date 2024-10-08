'use client'

import { cn } from '@/lib/utils'
import { Todo } from '@/types/custom'
import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Checkbox } from './ui/checkbox'
import { Trash2 } from 'lucide-react'
import { deleteTodo, updateTodo } from '@/app/actions'
import { useFormStatus } from 'react-dom'

const TodoItem = ({ todo }: { todo: Todo }) => {
  return (
    <form>
      <TodoCard todo={todo} />
    </form>
  )
}

export default TodoItem

export function TodoCard({ todo }: { todo: Todo }) {
  const { pending } = useFormStatus()
  return (
    <Card className={cn('w-full', pending && 'opacity-30')}>
      <CardContent className="flex items-start gap-3 p-3">
        <span className="size-10 flex items-center justify-center">
          <Checkbox
            disabled={pending}
            checked={Boolean(todo.is_complete)}
            onCheckedChange={async (val) => {
              if (val === 'indeterminate') return
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
