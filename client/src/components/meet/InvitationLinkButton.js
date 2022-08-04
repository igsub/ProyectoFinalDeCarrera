import React, { useState } from 'react'
import { Button } from '@material-ui/core'

const InvitationLinkButton = ({ path }) => {

    const [buttonState, setButtonState] = useState({color: "secondary", text: "Copy invitation link"})
    const copyToClipboard = () => {       
        navigator.clipboard.writeText(path)
        setButtonState({ text: "Copied!"})
    }

    return (
        <Button variant="contained" color={buttonState.color} onClick={copyToClipboard}>{buttonState.text}</Button>
    )
}

export default InvitationLinkButton