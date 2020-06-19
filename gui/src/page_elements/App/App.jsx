import React from 'react';
import './App.css';
import { Header } from '../../components/Header'
import { TurtleTravel } from '../../components/TurtleTravel'

export const App = () => {
  return (
    <div className="App">
      <Header />
      <TurtleTravel />
    </div>
  );
}
