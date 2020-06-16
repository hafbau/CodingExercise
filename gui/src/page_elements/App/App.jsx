import React from 'react';
import './App.css';
import { Header } from '../../components/Header'
import { TurtleTravel } from '../../components/TurtleTravel'
import { Uploader } from '../../components/Uploader'

export const App = () => {
  return (
    <div className="App">
      <Header />
      <TurtleTravel />
    </div>
  );
}
