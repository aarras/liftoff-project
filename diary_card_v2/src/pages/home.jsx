import React from 'react'
import Typography from "@material-ui/core/Typography"
import Layout from '../Layout'
import UserComponent from '../components/UserComponent'
import DateComponent from '../components/DateComponent'

export default () => {  
  return (
    <Layout>
      <div style={{ marginTop: '60px' , marginLeft: '80px'}}>
        <Typography variant="h4">Welcome back!</Typography>
        <DateComponent />
        <UserComponent />
      </div>
    </Layout>
  )
}