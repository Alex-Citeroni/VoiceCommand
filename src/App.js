import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import LogsPage from './LogsPage';
import { LogProvider } from './LogContext';

function App() {
  return (
    <LogProvider>
      <Router>
        <Routes>
          <Route path="/VoiceCommand" element={<HomePage />} />
          <Route path="/VoiceCommand/pier" element={<LogsPage />} />
        </Routes>
      </Router>
    </LogProvider>
  );
}

export default App;
