'use server'

import { Todo } from '@/types/custom'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// form action

export async function addTodo(formData: FormData) {
  const supabase = createClient()
  const text = formData.get('todo') as string | null

  if (!text) {
    throw new Error('Text is required!')
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('You need to be logged in')
  }

  const { error } = await supabase
    .from('todos')
    .insert({ task: text, user_id: user.id })

  if (error) {
    throw new Error('Error adding todo')
  }

  revalidatePath('/')
}

export async function deleteTodo(id: number) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('You need to be logged in')
  }

  const { error } = await supabase
    .from('todos')
    .delete()
    .match({ user_id: user.id, id })

  if (error) {
    throw new Error('Error deleting todo')
  }

  revalidatePath('/')
}

export async function updateTodo(todo: Todo) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('You need to be logged in')
  }

  const { error } = await supabase
    .from('todos')
    .update(todo)
    .match({ user_id: user.id, id: todo.id })

  if (error) {
    throw new Error('Error updating todo')
  }

  revalidatePath('/')
}
