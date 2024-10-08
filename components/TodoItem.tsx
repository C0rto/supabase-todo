'use client'

import { cn } from '@/lib/utils'
import { Todo } from '@/types/custom'
import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Checkbox } from './ui/checkbox'
import { Trash2 } from 'lucide-react'

const TodoItem = ({ todo }: { todo: Todo }) => {
  return (
    <form>
      <TodoCard todo={todo} />
    </form>
  )
}

export default TodoItem

export function TodoCard({ todo }: { todo: Todo }) {
  return (
    <Card className={cn('w-full')}>
      <CardContent className="flex items-start gap-3 p-3">
        <span className="size-10 flex items-center justify-center">
          <Checkbox />
        </span>
        <p className={cn('flex-1 pt-2 min-w-0 break-words')}>{todo.task}</p>
        <Button variant="ghost" size="icon">
          <Trash2 />
          <span className="sr-only">Delete Todo</span>
        </Button>
      </CardContent>
    </Card>
  )
}
