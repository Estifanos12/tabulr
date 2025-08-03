import { useCallback, useState } from 'react'
import { toast } from 'sonner'

import { logger } from '@/utils/log'
type CopiedValue = string | null

type CopyFn = (text: string) => Promise<boolean>

type CopyToClipboardProps = {
  message?: string
}

export function useCopyToClipboard({ message = "Copied to clipboard" }: CopyToClipboardProps): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const copy: CopyFn = useCallback(async text => {
    if (!navigator?.clipboard) {
      logger.info('Clipboard not supported')
      return false
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      toast.success(message)
      return true
    } catch (error) {
      logger.error('Copy failed ' + error)
      setCopiedText(null)
      return false
    }
  }, [])

  return [copiedText, copy]
}