import React, { useState } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

import './App.css';
import Store from './Store';
import DashBoard from './Dashboard';

const { Header, Footer, Content } = Layout;

const TestWrapper = styled(Footer)`
  background: papayawhip;
  text-align: center;
  color: palevioletred;
  button {
    border: 2px solid palevioletred;
    border-radius: 6px;
  }
`;

function App() {
  const [message, setMessage] = useState('Empty Message.');
  const pingHandler = async () => (
    fetch('/ping')
      .then(res => res.json())
      .then(json => setMessage(json.message))
      .catch(err => console.log(err))
  )

  return (
    <Layout className="App"  style={{ height: '100vh' }}>
      <Header>
        <div className="logo" />
      </Header>
      <Content>
        <Store>
          <DashBoard />
        </Store>
      </Content>
      <TestWrapper>
        <p>
          Click to ping: <button onClick={pingHandler}>PING</button>
        </p>
        <p>
          {message}
        </p>
      </TestWrapper>
    </Layout>
  );
}

export default App;
