import { useState, useCallback, useRef } from 'react'
import { ReactFlow, MiniMap, applyEdgeChanges, applyNodeChanges, addEdge } from '@xyflow/react';
import { DatabaseSchemaNode } from "@/components/database-schema-node";
import { ZoomSelect } from "@/components/zoom-select";
import '@xyflow/react/dist/style.css';
import { AnimatedSVGEdge } from './components/AnimatedSVG';
import './App.css'
function App() {
  const edgeTypes = {
    animatedSvg: AnimatedSVGEdge,
  };
  const defaultNodes = [
    {
      id: "1",
      position: { x: 0, y: 0 },
      type: "databaseSchema",
      data: {
        label: "Products",
        schema: [
          { title: "id", type: "uuid" },
          { title: "name", type: "varchar" },
          { title: "description", type: "varchar" },
          { title: "warehouse_id", type: "uuid" },
          { title: "supplier_id", type: "uuid" },
          { title: "price", type: "money" },
          { title: "quantity", type: "int4" },
        ],
      },
    },
    {
      id: "2",
      position: { x: 350, y: -100 },
      type: "databaseSchema",
      data: {
        label: "Warehouses",
        schema: [
          { title: "id", type: "uuid" },
          { title: "name", type: "varchar" },
          { title: "address", type: "varchar" },
          { title: "capacity", type: "int4" },
        ],
      },
    },
    {
      id: "3",
      position: { x: 350, y: 200 },
      type: "databaseSchema",
      data: {
        label: "Suppliers",
        schema: [
          { title: "id", type: "uuid" },
          { title: "name", type: "varchar" },
          { title: "description", type: "varchar" },
          { title: "country", type: "varchar" },
        ],
      },
    },
  ];

  const defaultEdges = [
    {
      id: "products-warehouses",
      source: "1",
      target: "2",
      sourceHandle: "warehouse_id",
      targetHandle: "id",
      type: 'animatedSvg'
    },
    {
      id: "products-suppliers",
      source: "1",
      target: "3",
      sourceHandle: "supplier_id",
      targetHandle: "id",
      type: 'animatedSvg'

    },
  ];

  const nodeTypes = {
    databaseSchema: DatabaseSchemaNode,
  };

  return (
    <div className='bg-[#efedf5] w-full h-full font-ubuntu font-normal'>
      <div style={{ boxShadow: "inset 0px 0px 7px 1px rgb(170 170 187)" }} className=' drop-shadow-md blur-0 w-11/12 h-[80%]  mx-auto relative top-20 rounded-xl'>

        <div style={{ height: '100%', width: "100%" }}>
          <ReactFlow
            defaultNodes={defaultNodes}
            defaultEdges={defaultEdges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
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
          <div className='bg-[#efedf5] px-2 py-3 rounded-md shadow-md shadow-gray-600 cursor-pointer'>
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
  )
}

export default App
