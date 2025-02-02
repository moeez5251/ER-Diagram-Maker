import { ReactFlow, useNodesState, useEdgesState, addEdge, reconnectEdge } from '@xyflow/react';
import { DatabaseSchemaNode } from "@/components/database-schema-node";
import { ZoomSelect } from "@/components/zoom-select";
import '@xyflow/react/dist/style.css';
import './App.css'
import { useCallback, useEffect, useRef, useState } from 'react';
import { counter } from '../context/context';
import { v4 as uuidv4 } from 'uuid';
import connectionline from './components/connectionline';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "./components/ui/select"

function App() {


  const initialNodes = [
  ];

  const initialEdges = JSON.parse(localStorage.getItem("edges-data")) === null ? [] : JSON.parse(localStorage.getItem("edges-data"));
  const nodeTypes = {
    databaseSchema: DatabaseSchemaNode,
  };
  const [selection, setselection] = useState([])
  const [input, setinput] = useState("")
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const edgeReconnectSuccessful = useRef(true);
  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge({ ...params, id: uuidv4() }, eds));
  }, []);

  const handleadding = () => {
    setNodes(
      [...nodes, {
        id: uuidv4(),
        position: { x: Math.floor(Math.random() * (300 - 200 + 1)) + 200, y: Math.floor(Math.random() * (300 - 200 + 1)) + 200 },
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
      setselection(nodes);
    }, 50);
    return () => {

    }
  }, [nodes])

  useEffect(() => {
    localStorage.setItem("edges-data", JSON.stringify(edges))
    return () => {

    }
  }, [edges])

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback((oldEdge, newConnection) => {
    edgeReconnectSuccessful.current = true;
    setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
  }, []);

  const onReconnectEnd = useCallback((_, edge) => {
    if (!edgeReconnectSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeReconnectSuccessful.current = true;
  }, []);
  const handlechange = (e) => {
    setinput(e.target.value);
    let a = nodes.filter((item) => {
      return item.data.label.includes(e.target.value) || item.data.schema.some((i) => i.title.includes(e.target.value))
    })
    setselection(a);
  }
  const handleclick = () => {
    document.querySelector(".sidebar").classList.add("left-14")
  }
  const handleremove = () => {
    if (document.querySelector(".sidebar").classList.contains("left-14")) {

      document.querySelector(".sidebar").classList.remove("left-14")
    }
  }

  return (
    <>
      <counter.Provider value={{ nodes, setNodes, edges, setEdges }}>
        <div className='bg-[#efedf5] w-full h-full font-ubuntu font-normal'>
          <div title='open' onClick={handleclick} className='absolute top-5 left-14 border border-black p-1 rounded-lg cursor-pointer'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={30}
              height={30}
              fill="none"
              className="injected-svg"
              color="#141415"
              data-src="https://cdn.hugeicons.com/icons/menu-02-solid-standard.svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="#141415"
                fillRule="evenodd"
                d="M3 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1ZM3 12a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1ZM3 19a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Z"
                clipRule="evenodd"
              />
            </svg>

          </div>
          <div style={{ boxShadow: "inset rgb(167 167 167 / 54%) 0px -7px 20px 0px" }} className=' drop-shadow-md blur-0 w-11/12 h-[83%]  mx-auto relative top-20 rounded-xl'>

            <div style={{ height: '100%', width: "100%" }}>
              <ReactFlow
                defaultNodes={initialNodes}
                edges={edges}
                onEdgesChange={onEdgesChange}
                nodes={nodes}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                connectionLineComponent={connectionline}
                fitView
                onReconnect={onReconnect}
                onReconnectStart={onReconnectStart}
                onReconnectEnd={onReconnectEnd}

                onNodeDragStop={(event, node) => {
                  setNodes(prevNodes =>
                    prevNodes.map(n =>
                      n.id === node.id
                        ? {
                          ...n,
                          position: {
                            x: node.position.x,
                            y: node.position.y
                          }
                        }
                        : n
                    )
                  );
                }}
              >

                <ZoomSelect />
              </ReactFlow>
            </div>
            <div className='flex absolute right-8 -top-8 gap-5'>
              <div title='add new table' onClick={handleadding} className='bg-[#efedf5] px-2 py-3 rounded-md shadow-md shadow-gray-600 cursor-pointer'>
                <img className='w-7' src="assets/Add.webp" alt="" />
              </div>
            </div>
          </div>
          <div style={{ boxShadow: "0.5px 0.5px 10px 0px #5d5d5d" }} className='sidebar absolute bg-[#efedf5] h-[90%] w-1/2 lg:w-[20%] md:w-[40%] top-[5%] -left-full shadow-xl shadow-slate-400 rounded-2xl z-10 transition-all duration-500 overflow-y-auto py-3 px-4 overflow-x-hidden'>
            <div title='close' onClick={handleremove} className='relative left-[90%] my-1 cursor-pointer'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                height={30}
                fill="none"
                className="injected-svg"
                color="#141415"
                data-src="https://cdn.hugeicons.com/icons/multiplication-sign-solid-rounded.svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#141415"
                  fillRule="evenodd"
                  d="M5.116 5.116a1.25 1.25 0 0 1 1.768 0L12 10.232l5.116-5.116a1.25 1.25 0 0 1 1.768 1.768L13.768 12l5.116 5.116a1.25 1.25 0 0 1-1.768 1.768L12 13.768l-5.116 5.116a1.25 1.25 0 0 1-1.768-1.768L10.232 12 5.116 6.884a1.25 1.25 0 0 1 0-1.768Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div style={{ boxShadow: "inset 1px 1px 5px 0px #645c5c" }} className='flex gap-3 items-center 
            shadow-lg   px-3 py-2 rounded-full '>

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
              <input className='bg-transparent outline-none text-md ' value={input} onChange={handlechange} type="text" placeholder='Search table,columns ...' />
            </div>
            {
              selection.length === 0 && <div className='text-center text-lg font-semibold mt-5'>No Table to show</div> ||
              selection.map((node, index) => {
                return (
                  <Select key={uuidv4()}>
                    <SelectTrigger className="w-full  my-4 border-none outline-none font-semibold text-xl">
                      <SelectValue className='font-semibold' placeholder={node.data.label} />
                    </SelectTrigger>

                    <SelectContent >
                      {
                        node.data.schema.map((item, index) => {
                          return (
                            <SelectGroup key={uuidv4()}>
                              <SelectItem className='font-medium text-md cursor-pointer hover:drop-shadow-md' value={uuidv4()}>{item.title}</SelectItem>
                            </SelectGroup>
                          )
                        })
                      }

                    </SelectContent>
                  </Select>
                )
              }
              )}
          </div>

          <footer className='flex items-center justify-around bg-blue-800 text-white py-1 font-semibold w-full absolute bottom-0'>
            <div>
              ER Diagram Maker
            </div>
            <div>
              &copy; CopyRight 2025
            </div>
            <div>By Xheikh Moeez</div>
          </footer>
        </div>
      </counter.Provider>
    </>
  )
}

export default App
