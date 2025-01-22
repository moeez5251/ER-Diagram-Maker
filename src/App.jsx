import { ReactFlow, MiniMap, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import { DatabaseSchemaNode } from "@/components/database-schema-node";
import { ZoomSelect } from "@/components/zoom-select";
import '@xyflow/react/dist/style.css';
import { AnimatedSVGEdge } from './components/AnimatedSVG';
import './App.css'
import { useCallback, useState } from 'react';
import { counter } from '../context/context';
import { v4 as uuidv4 } from 'uuid';
import { inputscounter } from '../context/context1';
function App() {
  const edgeTypes = {
    animatedSvg: AnimatedSVGEdge,
  };


  const defaultNodes = [

  ];

  const defaultEdges = [
    {
      id: "products-warehouses",
      source: "1",
      target: "2",
      sourceHandle: "warehouse_id",
      targetHandle: "id",
    },
    {
      id: "products-suppliers",
      source: "1",
      target: "3",
      sourceHandle: "supplier_id",
      targetHandle: "id",
    },
  ];

  const nodeTypes = {
    databaseSchema: DatabaseSchemaNode,
  };

  const [nodes, setNodes] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
  const [inp, setinp] = useState({
    inputname: "",
    inputtype: "",
  })
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  const defaultEdgeOptions = {
    type: 'animatedSvg',

  };
  let oldname = {};
  const handleadding = () => {
    setNodes(
      [...nodes, {
        id: uuidv4(),
        position: { x: Math.floor(Math.random() * (350 - 200 + 1)) + 200, y: Math.floor(Math.random() * (350 - 200 + 1)) + 200 },
        type: "databaseSchema",
        data: {
          label: "db",
          schema: [
            { title: "any_name", type: "text" },
          ],
        },
      }]
    )
  }
  const inpchange = (e) => {
    setinp({ ...inp, [e.target.name]: e.target.value })
  }
  const handleclick = () => {
    const newField = { title: inp.inputname, type: inp.inputtype };

    let index;
    setNodes(prevNodes =>
      prevNodes.map(node => {
        if (node.data.label === inp.parent) {
           index = node.data.schema.findIndex(field => field.title === inp.targetnode);


          if (index !== -1) {
            return {
              ...node,
              data: {
                ...node.data,
                schema: [
                  ...node.data.schema.slice(0, index),
                  ...node.data.schema.slice(index + 1)
                ]
              }
            };
          }
        }
        return node;
      })
    );
  setNodes(prevNodes =>
      prevNodes.map(node =>
        node.data.label === inp.parent
          ? {
              ...node,
              data: {
                ...node.data,
                schema: node.data.schema.length === 0
                  ? [newField] // If schema is empty, add newField at 0th index
                  : [
                      ...node.data.schema.slice(0, index),
                      newField,
                      ...node.data.schema.slice(index)
                    ]
              }
            }
          : node
      )
    );
    
    console.log(nodes);
    setinp({
      inputname:"",
      inputtype:""
    })
  }
  return (
    <>
      <inputscounter.Provider value={{ inp, setinp }}>
        <counter.Provider value={{ nodes, setNodes }}>
          <div className='bg-[#efedf5] w-full h-full font-ubuntu font-normal'>
            <div className='flex absolute items-end w-full  mx-8  gap-6 top-3 '>
              <div>
                <div>
                  <label className="block text-gray-800 font-semibold text-sm w-fit"
                  >Input Name</label
                  >
                  <div className="mt-2">
                    <input
                      type="text"
                      name="inputname"
                      className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                      placeholder='Change name for record'
                      onChange={inpchange}
                      value={inp.inputname}
                    />
                  </div>
                </div>

              </div>
              <div>
                <div>
                  <label className="block text-gray-800 font-semibold text-sm w-fit"
                  >Input Data Type</label
                  >
                  <div className="mt-2">
                    <input
                      type="text"
                      name="inputtype"
                      className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                      placeholder='Change type for record'
                      onChange={inpchange}
                      value={inp.inputtype}
                    />
                  </div>
                </div>

              </div>
              <div onClick={handleclick} className='cursor-pointer' title='save'>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={36}
                  height={36}
                  fill="none"
                  className="injected-svg"
                  color="#151715"
                  data-src="https://cdn.hugeicons.com/icons/bookmark-03-solid-rounded.svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#151715"
                    fillRule="evenodd"
                    d="M20.24 2.963c-.818-.908-1.867-1.324-3.191-1.522-1.281-.19-2.918-.19-4.986-.19h-.126c-2.068 0-3.705 0-4.986.19-1.324.198-2.373.614-3.19 1.522-.807.897-1.168 2.03-1.34 3.46-.171 1.407-.171 3.212-.171 5.525s0 4.222.17 5.629c.173 1.431.534 2.564 1.34 3.46.818.908 1.867 1.324 3.191 1.522 1.281.191 2.918.191 4.987.191h.124c2.069 0 3.706 0 4.987-.191 1.323-.198 2.373-.614 3.19-1.521.807-.897 1.168-2.03 1.34-3.461.171-1.407.171-3.316.171-5.629 0-2.313 0-4.118-.17-5.524-.173-1.432-.534-2.564-1.34-3.461ZM12 2.961c1.289 0 2.354 0 3.25.039v6.826c0 .648-.015 1.129-.054 1.403a2.622 2.622 0 0 1-.6-.325c-.531-.417-1.66-1.276-1.922-1.38A1.46 1.46 0 0 0 12 9.349c-.269 0-.49.083-.674.177-.27.105-1.394.963-1.923 1.379-.243.166-.441.273-.588.321-.04-.274-.065-.75-.065-1.399V3c.896-.038 1.961-.039 3.25-.039Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div style={{ boxShadow: "inset 0px 0px 7px 1px rgb(170 170 187)" }} className=' drop-shadow-md blur-0 w-11/12 h-[80%]  mx-auto relative top-28 rounded-xl'>

              <div style={{ height: '100%', width: "100%" }}>
                <ReactFlow
                  defaultNodes={defaultNodes}
                  edges={edges}
                  onEdgesChange={onEdgesChange}
                  nodes={nodes}
                  onConnect={onConnect}
                  nodeTypes={nodeTypes}
                  edgeTypes={edgeTypes}
                  defaultEdgeOptions={defaultEdgeOptions}
                  fitView
                >
                  <ZoomSelect />
                  <MiniMap />
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
      </inputscounter.Provider>
    </>
  )
}

export default App
