import { ReactFlow, useNodesState, useEdgesState, addEdge,reconnectEdge } from '@xyflow/react';
import { DatabaseSchemaNode } from "@/components/database-schema-node";
import { ZoomSelect } from "@/components/zoom-select";
import '@xyflow/react/dist/style.css';
import { AnimatedSVGEdge } from './components/AnimatedSVG';
import './App.css'
import { useCallback, useState, useEffect,useRef} from 'react';
import { counter } from '../context/context';
import { v4 as uuidv4 } from 'uuid';
import connectionline from './components/connectionline';
function App() {
  const edgeTypes = {
    animatedSvg: AnimatedSVGEdge,
  };


  const initialNodes = [
  ];

  const initialEdges = [];

  const nodeTypes = {
    databaseSchema: DatabaseSchemaNode,
  };
 
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const edgeReconnectSuccessful = useRef(true);
 
  const onConnect = useCallback((params) => 
    setEdges((eds) => addEdge({ ...params, id: uuidv4() }, eds)), [], );
  const handleadding = () => {
    setNodes(
      [...nodes, {
        id: uuidv4(),
        position: { x: Math.floor(Math.random() * (350 - 200 + 1)) + 200, y: Math.floor(Math.random() * (350 - 200 + 1)) + 200 },
        type: "databaseSchema",
        data: {
          label: "db",
          schema: [
            { title: "any_name", id: uuidv4() },
          ],
        },
      }]
    )
  }

  useEffect(() => {

    let a = JSON.parse(localStorage.getItem("data-sets"));
    let b = JSON.parse(localStorage.getItem("edges-data"));
      console.log(b);
    if (a) {
      setNodes(a)
    }
    if (b) {
      setEdges(b);
    }

    return () => {

    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("data-sets", JSON.stringify(nodes))
    }, 50);
    return () => {

    }
  }, [nodes])

  localStorage.setItem("edges-data", JSON.stringify(edges))
  useEffect(() => {
    return () => {

    }
  }, [edges])
  
  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);
 
  const onReconnect = useCallback((oldEdge, newConnection) => {
    edgeReconnectSuccessful.current = true;
    setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
    console.log(edges);
  }, []);
 
  const onReconnectEnd = useCallback((_, edge) => {
    if (!edgeReconnectSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
 
    edgeReconnectSuccessful.current = true;
  }, []);
  return (
    <>
        <counter.Provider value={{ nodes, setNodes }}>
          <div className='bg-[#efedf5] w-full h-full font-ubuntu font-normal'>
           
            <div style={{ boxShadow: "inset rgb(167 167 167 / 54%) 0px -7px 20px 0px" }} className=' drop-shadow-md blur-0 w-11/12 h-[83%]  mx-auto relative top-20 rounded-xl'>

              <div style={{ height: '100%', width: "100%" }}>
                <ReactFlow
                  defaultNodes={initialNodes}
                  edges={edges}
                  onEdgesChange={onEdgesChange}
                  nodes={nodes}
                  onConnect={onConnect}
                  nodeTypes={nodeTypes}
                  edgeTypes={edgeTypes}
                  connectionLineComponent={connectionline}
                  fitView
                  onReconnect={onReconnect}
                  onReconnectStart={onReconnectStart}
                  onReconnectEnd={onReconnectEnd}
                >
                  <ZoomSelect />
                </ReactFlow>
              </div>
              <div className='flex absolute right-8 -top-8 gap-5'>
                <div onClick={() => { document.querySelector(".sidebar").classList.add("left-14") }} className='bg-[#efedf5] px-2 py-3 rounded-md shadow-md shadow-gray-600 cursor-pointer'>
                  <img className='w-7 invert' src="assets/Icon.webp" alt="" />
                </div>
                <div onClick={() => { if (document.querySelector(".sidebar").classList.contains("left-14")) { document.querySelector(".sidebar").classList.remove("left-14") } }} className='bg-[#efedf5] px-2 py-3 rounded-md shadow-md shadow-gray-600 cursor-pointer'>
                  <img className='w-7 rotate-180 ' src="assets/Icon.webp" alt="" />
                </div>
                <div onClick={handleadding} className='bg-[#efedf5] px-2 py-3 rounded-md shadow-md shadow-gray-600 cursor-pointer'>
                  <img className='w-7' src="assets/Add.webp" alt="" />
                </div>
              </div>
            </div>
            <div style={{ boxShadow: "0.5px 0.5px 10px 0px #5d5d5d" }} className='sidebar absolute bg-[#efedf5] h-[90%] w-[20%] top-[8%] -left-full shadow-xl shadow-slate-400 rounded-2xl z-10 transition-all duration-500 overflow-y-auto py-3 px-4 overflow-x-hidden'>
              <div style={{ boxShadow: "inset 1px 1px 5px 0px #645c5c" }} className='flex gap-3 items-center shadow-lg   px-3 py-2 rounded-full '>
                <div>

                  <svg xmlns="http://www.w3.org/2000/svg" width={28} height={24} fill="none">
                    <path
                      fill="brown"
                      fillRule="evenodd"
                      d="M1 11C1 5.477 5.477 1 11 1s10 4.477 10 10a9.958 9.958 0 0 1-2.257 6.329L23 21.586 21.586 23l-4.257-4.257A9.958 9.958 0 0 1 11 21C5.477 21 1 16.523 1 11Zm10-8a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z"
                      clipRule="evenodd"

                    />
                  </svg>
                </div>
                <input className='bg-transparent outline-none text-md ' type="text" placeholder='Search table,columns ...' />
              </div>
            </div>

          </div>
        </counter.Provider>
    </>
  )
}

export default App
