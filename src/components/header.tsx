import { ThemeModeToggle } from './theme-mode-toggle'

export function Header() {
  return (
    <header className="relative flex h-24 items-center justify-center">
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <ThemeModeToggle />
      </div>
      <h1 className="text-2xl font-medium text-neutral-900 dark:text-neutral-50">type generator</h1>
    </header>
  )
}
