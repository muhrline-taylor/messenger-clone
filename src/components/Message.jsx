import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import "../static/css/Message.css";

const Message = ({ message, username, thisUser }) => {
    const isUser = username === thisUser;
    return (
        <div className={`message ${isUser && 'message_user'}`}>
            <Card className={isUser ? "message_userCard" : "message_guestCard"}>
                <CardContent>
                    <Typography
                        color="white"
                        variant="h5"
                        component="h2"
                    >
                        {!isUser && `${username || 'Unknown User'}:`} {message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Message;
