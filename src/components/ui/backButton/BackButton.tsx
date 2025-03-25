// import { backButton } from "@telegram-apps/sdk-react"
import { useEffect } from "react"

interface Props {
    onReturn: () => void
}

export default function BackButton(props: Props) {
    // @ts-ignore
    window.Telegram.WebApp.onEvent("backButtonClicked", props.onReturn);
    return null
}