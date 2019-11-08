import React from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

function SignOut() {
    return (
        <div>
            <Button component={Link} to="/" size="small" variant="outlined" color="default">
                Sign Out
            </Button>
        </div>
    )
}

export default SignOut