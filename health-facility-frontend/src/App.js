import React from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ConsultatiionList from './components/ConsultationList';
import './App.css'; // Ensure the CSS is imported correctly

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Health Facility</h1>
        <LoginForm />
        <RegisterForm />
        <ConsultatiionList />
      </header>
    </div>
  );
}

export default App;
