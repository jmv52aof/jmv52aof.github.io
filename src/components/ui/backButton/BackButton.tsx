import { backButton } from "@telegram-apps/sdk-react"
import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router"


export default function BackButton() {
    const location = useLocation()
    const navigate = useNavigate()
  
    useEffect(() => {
      function onClick() {
        navigate(-1)
      }
      backButton.onClick(onClick)

      return () => backButton.offClick(onClick)
    }, [navigate])
  
    useEffect(() => {
      if (location.pathname === '/') {
        if (backButton.isSupported() && backButton.isMounted()) {            
            backButton.hide()
        }
      } else {
        if (backButton.isSupported() && backButton.isMounted()) {
            backButton.show()
        }
      }
    }, [location])
  
    return null
}