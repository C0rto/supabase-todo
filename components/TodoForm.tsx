'use client'

import { addTodo } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'
import { useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { TodoOptimisticUpdate } from './TodoList'
import { Todo } from '@/types/custom'

function FormContent() {
  const { pending } = useFormStatus()
  return (
    <>
      <Textarea
        disabled={pending}
        minLength={4}
        name="todo"
        required
        placeholder="Add a new todo"
      />
      <Button type="submit" size="icon" className="min-w-10" disabled={pending}>
        <Send className="h-5 w-5" />
        <span className="sr-only">Submit Todo</span>
      </Button>
    </>
  )
}

const TodoForm = ({
  optimisticUpdate,
}: {
  optimisticUpdate: TodoOptimisticUpdate
}) => {
  const formRef = useRef<HTMLFormElement>(null)
  return (
    <Card>
      <CardContent className="p-3">
        <form
          className="flex gap-4"
          ref={formRef}
          action={async (data) => {
            const newTodo: Todo = {
              id: -1,
              inserted_at: '',
              user_id: '',
              is_complete: false,
              task: data.get('todo') as string,
            }

            optimisticUpdate({ action: 'create', todo: newTodo })
            await addTodo(data)
            formRef.current?.reset()
          }}
        >
          <FormContent />
        </form>
      </CardContent>
    </Card>
  )
}

export default TodoForm
