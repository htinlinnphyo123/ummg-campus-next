import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
export default function useHeaderToggler() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  const router = useRouter()
  const isHomePage = router.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      // Only apply scroll-based visibility on homepage
      if (isHomePage) {
        setIsHeaderVisible(scrollPosition > 150)
      } else {
        setIsHeaderVisible(true)
      }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)
    
    // Set initial state
    handleScroll()
    
    // Cleanup listener on unmount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  return {
    isHeaderVisible
  }
}
