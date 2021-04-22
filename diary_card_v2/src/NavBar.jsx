import React from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar } from '@material-ui/core'

export const NavBar = ({ color }) => (
<AppBar color={color}>
    <Toolbar>
        <Link to="/">
            <Button color="lightBlue">Home</Button>
        </Link>
        <Link to="/forms">
            <Button>Forms</Button>
        </Link>
        <Link to="/view_logs">
            <Button>View Logs</Button>
        </Link>
        <Link to="/page4">
            <Button>Page Four</Button>
        </Link>
    </Toolbar>
</AppBar>
)