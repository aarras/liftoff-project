import React from 'react';
import Layout from '../Layout';
import Category from '../components/CategoryComponent';

export default () => { 
  return (
    <Layout>
      <div style={{ marginTop: '60px', marginLeft: '80px'}}>
        <Category />
      </div>
    </Layout>
  )
}