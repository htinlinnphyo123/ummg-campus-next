import { useState, useEffect } from 'react'

export default function useHeaderToggler() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsHeaderVisible(scrollPosition > 150)
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)
    
    // Cleanup listener on unmount
    return () => window.removeEventListener('scroll', handleScroll)
  }, []) // Remove isHomePage dependency since it's not used

  return {
    isHeaderVisible
  }
}
