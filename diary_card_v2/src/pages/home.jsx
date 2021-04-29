import React from 'react'
import Typography from "@material-ui/core/Typography"
import Layout from '../Layout'
import UserComponent from '../components/UserComponent'

export default () => {
  return (
    <Layout>
      <div style={{ marginTop: '100px' , marginLeft: '80px'}}>
        <Typography variant="h4">Welcome back, firstName!</Typography>
        <UserComponent />
      </div>
    </Layout>
  )
}