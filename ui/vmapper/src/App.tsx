import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MapView } from './components/MapView';

function App() {
  return (
    <div className="App">
      <MapView fields={["partnerId", "unitCode", "deliveryAddress"]} />
    </div>
  );
}

export default App;
