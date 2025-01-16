import { useState, useCallback,useRef } from 'react'
import { ReactFlow, MiniMap, applyEdgeChanges, applyNodeChanges,addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './App.css'
function App() {
  const initialNodes = [
   {
    
   }
  ];
  const initialEdges = [ ];
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );
    const onConnect = useCallback(
      (params) => setEdges((eds) => addEdge(params, eds)),
      [],
    );
  return (
    <div className='bg-[#efedf5] w-full h-full'>
      <div style={{boxShadow:"inset 0px 0px 7px 1px rgb(170 170 187)"}} className=' drop-shadow-md blur-0 w-4/5 h-[80%] mx-auto relative top-20 rounded-xl'>
        <div className='flex absolute right-8 -top-8 gap-5'>
          <div className='bg-[#efedf5] px-2 py-3 rounded-md shadow-md shadow-gray-600 cursor-pointer'>
          <img className='w-7 invert' src="assets/Icon.webp" alt="" />
          </div>
          <div  className='bg-[#efedf5] px-2 py-3 rounded-md shadow-md shadow-gray-600 cursor-pointer'>
          <img className='w-7 rotate-180 ' src="assets/Icon.webp" alt="" />
          </div>
          <div  className='bg-[#efedf5] px-2 py-3 rounded-md shadow-md shadow-gray-600 cursor-pointer'>
          <img className='w-7' src="assets/Add.webp" alt="" />
          </div>
        </div>
      </div>
      {/* <div style={{ height: '100%' }}>
        <ReactFlow nodes={nodes}
         onNodesChange={onNodesChange}
         edges={edges}
         onEdgesChange={onEdgesChange}
         onConnect={onConnect}
         fitView
         >
         <MiniMap />
         </ReactFlow>
      </div> */}
         </div>
  )
}

export default App
