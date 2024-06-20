import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import LogsPage from './LogsPage';
import { LogProvider } from './LogContext';

function App() {
  return (
    <LogProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/logs" element={<LogsPage />} />
        </Routes>
      </Router>
    </LogProvider>
  );
}

export default App;
