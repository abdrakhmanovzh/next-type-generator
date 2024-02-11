'use client'

import { ClipboardCheck, Clipboard } from 'lucide-react'
import { useState } from 'react'

import { Button } from './ui/button'

interface Props {
  code: string
}

export function CodeResult({ code }: Props) {
  const [copied, setCopied] = useState(false)

  function copyToClipboard() {
    navigator.clipboard.writeText(code)
    setCopied(true)
  }

  return (
    <div className="relative mt-10 w-full max-w-3xl rounded-md border border-neutral-300 p-4 dark:border-neutral-800">
      <Button
        className="absolute right-2 top-2"
        onClick={copyToClipboard}
        variant={'ghost'}
        size={'icon'}
      >
        {copied ? <ClipboardCheck size={20} /> : <Clipboard size={20} />}
      </Button>
      <pre className="font-mono font-medium">{code}</pre>
    </div>
  )
}
