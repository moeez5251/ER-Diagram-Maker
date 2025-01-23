import { ReactFlow, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import { DatabaseSchemaNode } from "@/components/database-schema-node";
import { ZoomSelect } from "@/components/zoom-select";
import '@xyflow/react/dist/style.css';
import { AnimatedSVGEdge } from './components/AnimatedSVG';
import './App.css'
import { useCallback, useState, useEffect } from 'react';
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
    localStorage.setItem("data-sets", JSON.stringify(nodes))
  }
  const inpchange = (e) => {
    setinp({ ...inp, [e.target.name]: e.target.value })
  }
  const handleclick = () => {

    if (inp.inputname.trim() === "" || inp.inputtype.trim() === "") {
      return;
    }
    const newField = { title: inp.inputname, type: inp.inputtype };

    let index;
    setNodes(prevNodes =>
      prevNodes.map(node => {
        if (node.id === inp.parent) {
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
        node.id === inp.parent
          ? {
            ...node,
            data: {
              ...node.data,
              schema: node.data.schema.length === 0
                ? [newField]
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
    localStorage.setItem("data-sets", JSON.stringify(nodes))
    setinp({
      inputname: "",
      inputtype: ""
    })
  }


  useEffect(() => {

    let a = JSON.parse(localStorage.getItem("data-sets"));
    if(a){
      setNodes(a)
    }
   
    return () => {
    }
  }, [])

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
              <button onClick={handleclick}
                className="flex justify-center gap-2 items-center shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-blue-800 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-3 py-2 overflow-hidden border-2 rounded-full group"
              >
                Save
                <svg
                  className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                  viewBox="0 0 16 19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    className="fill-gray-800 group-hover:fill-gray-800"
                  ></path>
                </svg>
              </button>

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
