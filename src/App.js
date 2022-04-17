import './App.scss';
import AppRoute from './routes/appRoutes';
import "antd/dist/antd.css";
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <AppRoute />
    </div>
  );
}

export default App;
