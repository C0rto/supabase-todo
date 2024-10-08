'use server'

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
