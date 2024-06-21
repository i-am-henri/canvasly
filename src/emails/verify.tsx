// Email for receiving the verification code
import React from "react"
export default function verify({code}: {code: string}) {
    return (
        <html lang="en">
            <head>
                <title>Please verify your Email</title>
            </head>
            <body>
                <h2>
                    Hey, please verify your email
                </h2>
                <code>
                    <a href={`https://localhost:3000/api/verify?code=${code}`}>Please go here</a>
                </code>
            </body>
        </html>
    )
}