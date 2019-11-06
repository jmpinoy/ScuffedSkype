import React from 'react'
import Button from '@material-ui/core/Button'
import { TextField } from '@material-ui/core'

function SignIn() {
    return (
        <div id="flex-parent">
            <div id="flex-child">
                <div id="signin-head">
                    <i class="fas fa-user-circle fa-3x"></i>
                    <h1>Sign In</h1>
                </div>
                <div id="display-name">
                    <TextField placeholder={{style: {textAlign: 'center'}}} placeholder = "Hello World" inputProps={{ style: {textAlign: 'center'} }} label="Display Name" />
                    <br />
                </div>
                <br />
                <div id="signin-button">
                    <Button size="small" variant="outlined" color="default">
                        Connect
                </Button>
                </div>
            </div>
        </div>
    )
}

export default SignIn