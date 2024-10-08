import { signOut } from '@/app/login/actions'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server'

export default async function Header() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <div className="container flex h-14 max-w-screen-2xl items-center mx-auto">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold">SupaTodo</span>
          </a>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {user !== null && (
            <form action={signOut} className="flex items-center gap-2">
              <Button size="sm">Sign Out</Button>
            </form>
          )}
        </div>
      </div>
    </header>
  )
}
