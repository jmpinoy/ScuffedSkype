import React from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { TextField } from '@material-ui/core'

class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.displayName = this.displayName.bind(this)
    }

    displayName = () => {
        console.log(document.getElementsByClassName("MuiInputBase-root")[0].children[0].value)
    }

    render() {
        return (
            <div id="flex-parent">
                <div id="flex-child">
                    <div id="signin-head">
                        <i class="fas fa-user-circle fa-3x"></i>
                        <h1>Sign In</h1>
                    </div>
                    <div id="display-name">
                        <TextField
                            InputLabelProps={{
                                style: {
                                    width: '100%',
                                }
                            }}
                            label="Display Name"
                        />
                        <br />
                    </div>
                    <br />
                    <div id="signin-button">
                        <Button onClick={(e) => {this.displayName(e)}}
                            component={Link}
                            to="/displayuser"
                            size="small"
                            variant="outlined"
                            color="default">
                            Connect
                    </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn