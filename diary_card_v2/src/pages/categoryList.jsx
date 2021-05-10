import React from 'react';
import Typography from "@material-ui/core/Typography";
import Layout from '../Layout';
import CategoryList from '../components/CategoryListComponent';

export default () => { 
  return (
    <Layout>
    <div style={{ marginTop: '60px', marginLeft: '80px'}}>
      <Typography variant="h4" className="mb-4">Your Categories</Typography>
      <CategoryList />
    </div>
  </Layout>
  )
}