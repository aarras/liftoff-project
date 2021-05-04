import React from 'react';
import Typography from "@material-ui/core/Typography";
import Layout from '../Layout';
import FormList from '../components/FormListComponent';

export default () => { 
  return (
    <Layout>
    <div style={{ marginTop: '60px', marginLeft: '80px'}}>
      <Typography variant="h4" className="mb-4">Your Forms</Typography>
      <FormList />
    </div>
  </Layout>
  )
}