import React from 'react';
import './App.css';
import { HCanvasView } from './components/HCanvas';
import { HPalletView } from './components/HPallet';
import { HEdge } from './elements/HEdge';

function App() {
  const [selectedEdge, setSelectedEdge] = React.useState<HEdge|null>(null);
  
  return (
    <div className='App'>
        <HCanvasView setSelectedEdge={setSelectedEdge} />
        {selectedEdge && <HPalletView selectedEdge={selectedEdge} />}
    </div>
  );
}

export default App;
