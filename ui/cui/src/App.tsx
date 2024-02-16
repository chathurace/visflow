import React from 'react';
import './App.css';
import { HCanvasView } from './components/HCanvas';
import { HPalletView } from './components/HPallet';
import { HEdge } from './elements/HEdge';
import { HNode } from './elements/HNode';
import { HNodeProperties } from './components/HNodeProperties';

function App() {
  const [selectedEdge, setSelectedEdge] = React.useState<HEdge|null>(null);
  const [selectedNode, setSelectedNode] = React.useState<HNode|null>(null);
  
  return (
    <div className='App'>
        <HCanvasView selectedNode={selectedNode} setSelectedEdge={setSelectedEdge} setSelectedNode={setSelectedNode} />
        {selectedEdge && <HPalletView selectedEdge={selectedEdge} />}
        {selectedNode && <HNodeProperties selectedNode={selectedNode} />}
    </div>
  );
}

export default App;
