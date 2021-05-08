import React from 'react';
import Typography from "@material-ui/core/Typography";
import Layout from '../Layout';
import InputList from '../components/InputListComponent';

export default () => { 
  return (
    <Layout>
    <div style={{ marginTop: '60px', marginLeft: '80px'}}>
      <Typography variant="h4" className="mb-4">Your Inputs</Typography>
      <InputList />
    </div>
  </Layout>
  )
}