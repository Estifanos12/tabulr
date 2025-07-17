'use client' 
 
import { useEffect } from 'react'

import { Error as ErrorComponent } from '@/components/error'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  console.log(error.message)
  return (
    <ErrorComponent
      message={error.message || 'Something went wrong!'}
      label="Try again"
      description="Please try again or try refreshing the page. If the problem persists, please create an issue on the GitHub"
      action={() => reset()}
    />
  )
}