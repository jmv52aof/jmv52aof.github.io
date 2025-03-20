import { backButton } from "@telegram-apps/sdk-react"
import { useEffect } from "react"

interface Props {
    onReturn: () => void
}

export default function BackButton(props: Props) {
    useEffect(() => {
        if (backButton.isSupported() && backButton.isMounted()){
            backButton.show()
            backButton.onClick(props.onReturn)
        }
        return () => {
            backButton.offClick(props.onReturn)
            backButton.hide()
        }
    }, [props])
    
    return null
}