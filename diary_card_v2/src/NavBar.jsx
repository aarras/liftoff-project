import React from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar } from '@material-ui/core'

export const NavBar = ({ color }) => (
<AppBar color={color}>
    <Toolbar>
        <Link to="/">
            <Button color="primary" variant="contained">Home</Button>
        </Link>
        <Link to="/forms">
            <Button color="primary" variant="contained">Forms</Button>
        </Link>
        <Link to="/view_logs">
            <Button color="primary" variant="contained">View Logs</Button>
        </Link>
        <Link to="/page4">
            <Button color="primary" variant="contained">Page Four</Button>
        </Link>
    </Toolbar>
</AppBar>
)