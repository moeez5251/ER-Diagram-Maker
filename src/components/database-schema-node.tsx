import { counter } from "../../context/context"
import { useContext, useRef, useState, useEffect } from "react";
import { Node, NodeProps, Position } from "@xyflow/react";
import { v4 as uuidv4 } from 'uuid';
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { BaseNode } from "@/components/base-node";
import { LabeledHandle } from "@/components/labeled-handle";
type DatabaseSchemaNode = Node<{
  id: string
  label: string;
  schema: { title: string; type: string, id: string }[];
}>;

export function DatabaseSchemaNode({
  data,
  selected,
  id,
  positionAbsoluteX,
  positionAbsoluteY
}: NodeProps<DatabaseSchemaNode>) {
  const countervalue = useContext(counter)
  const [label, setLabel] = useState(data.label);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    for (const nodes of countervalue.nodes) {
      if (nodes.id === event.target.parentElement.parentElement.getAttribute("data-id")) {
        nodes.data.label = event.target.value;
      }
    }
    setLabel(event.target.value);
  };
  const handlerowclick = async (event: React.ChangeEvent<HTMLElement>) => {
    const rowid = event.target.parentElement.parentElement.parentElement.parentElement.id;
    for (const index of countervalue.nodes) {
      let a = index.data.schema.findIndex(field => field.id === rowid);
      if (a !== -1) {
        countervalue.setNodes(prevNodes =>
          prevNodes.map(node => {
            if (node.id === id) {

              if (node.data.schema.length === 1) {
                return null;
              }

              return {
                ...node,
                data: {
                  ...node.data,
                  schema: [
                    ...node.data.schema.slice(0, a),
                    ...node.data.schema.slice(a + 1)
                  ]
                }
              };
            }
            return node;
          }).filter(node => node !== null)
        );

      }
    }
  }
  const handleclick = (event: React.ChangeEvent<HTMLElement>) => {
    const newField = { title: "no-name", id: uuidv4() };
    const rowid = event.target.parentElement.parentElement.parentElement.parentElement.id;
    for (const index of countervalue.nodes) {
      let a = index.data.schema.findIndex(field => field.id === rowid);
      if (a || a === 0) {
        countervalue.setNodes(prevNodes =>
          prevNodes.map(node =>
            node.id === id
              ? {
                ...node,
                data: {
                  ...node.data,
                  schema: [
                    ...node.data.schema.slice(0, a),
                    newField,
                    ...node.data.schema.slice(a)
                  ]
                }
              }
              : node
          )
        );
        return;
      }
    }
  }
  const handlemore = (e) => {
    if (document.getElementById(e.target.getAttribute("data-id"))) {
      document.getElementById(e.target.getAttribute("data-id")).classList.toggle("right-animate")
    }
  }
  useEffect(() => {
    if (NaN) {
      return;
    }
    if (positionAbsoluteX) {
      countervalue.setNodes(prevNodes =>
        prevNodes.map(node =>
          node.id === id
            ? {
              ...node,
              position: {

                x: positionAbsoluteX.toFixed(2),
                y: positionAbsoluteY.toFixed(2)
              }
            }
            : node
        )
      );
    }
    return () => {

    }
  }, [positionAbsoluteX])
  return (
    <BaseNode className="bg-gray-200 py-2 rounded-md w-44 relative before:w-1 before:h-6 before:bg-orange-800  before:z-10 before:absolute before:block before:rounded-lg before:left-[0.5px] before:top-[7px] shadow-lg " selected={selected}>
      <div className="flex items-center px-3 w-full">

        <input
          onChange={handleChange}
          onClick={() => console.log(selected)}
          className="bg-transparent font-bold border-none outline-none text-sm w-[90%] "
          type="text"
          value={"produts"}
          id={id}
        />
        <div className="cursor-pointer">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="none"
            className="injected-svg"
            color="#000"
            data-src="https://cdn.hugeicons.com/icons/more-horizontal-circle-01-solid-standard.svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="#000"
              d="M17 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0ZM9.5 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0ZM2 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Z"
            />
          </svg>
        </div>
      </div>
      <table className="border-spacing-10  w-full overflow-hidden">
        <TableBody>
          {data.schema.map((entry) => (
            <TableRow key={uuidv4()} id={entry.id} className=" text-xs overflow-hidden m-2 relative transition-all right-0 ">

              <TableCell className="w-[95%]"  >
                <LabeledHandle
                  id={entry.id}
                  title={entry.title}
                  type="source"
                  
                  position={Position.Right}
                  handleClassName="p-0"
                  labelClassName="p-0"
                  className="record-type"
                />
              </TableCell>
              <TableCell className="absolute -right-10 gap-2 flex items-center h-full " >
                <div className="cursor-pointer" onClick={handlerowclick} title="remove record" >

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="none"
                    className="injected-svg"
                    color="#fc0d0d"
                    data-src="https://cdn.hugeicons.com/icons/delete-02-bulk-rounded.svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#fc0d0d"
                      d="M19.582 15.656c-.076 1.254-.137 2.248-.262 3.042-.128.815-.333 1.494-.742 2.087a4.742 4.742 0 0 1-1.417 1.345c-.612.377-1.295.541-2.108.62H8.927c-.813-.079-1.497-.244-2.11-.621A4.741 4.741 0 0 1 5.4 20.781c-.41-.594-.613-1.273-.74-2.09-.124-.795-.184-1.79-.259-3.046L3.75 4.75h16.5l-.668 10.906Z"
                      opacity={0.4}
                    />
                    <path
                      fill="#fc0d0d"
                      fillRule="evenodd"
                      d="M9.5 17.965a.75.75 0 0 1-.75-.75v-6a.75.75 0 0 1 1.5 0v6a.75.75 0 0 1-.75.75ZM14.5 10.465a.75.75 0 0 1 .75.75v6a.75.75 0 1 1-1.5 0v-6a.75.75 0 0 1 .75-.75ZM13.347 1.283c.565.05 1.097.223 1.553.563.337.251.571.56.771.893.186.309.373.694.585 1.131l.426.88H21a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h4.41l.356-.78c.206-.453.388-.852.57-1.172.198-.346.431-.666.773-.928.461-.354 1.003-.533 1.58-.586.436-.04.874-.034 1.311-.033.51 0 .97-.002 1.347.032ZM9.607 4.75h4.853a13.822 13.822 0 0 0-.503-.983c-.193-.32-.423-.46-.788-.493-.26-.023-.597-.024-1.135-.024-.55 0-.897 0-1.163.025-.374.034-.607.18-.797.513-.125.218-.26.51-.466.962Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="cursor-pointer" onClick={handleclick} title="add record" >

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="none"
                    className="injected-svg"
                    color="#0f7831"
                    data-src="https://cdn.hugeicons.com/icons/add-circle-solid-rounded.svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#0f7831"
                      fillRule="evenodd"
                      d="M12 22.75C6.063 22.75 1.25 17.937 1.25 12S6.063 1.25 12 1.25 22.75 6.063 22.75 12 17.937 22.75 12 22.75ZM13 8a1 1 0 1 0-2 0v3H8a1 1 0 1 0 0 2h3v3a1 1 0 1 0 2 0v-3h3a1 1 0 1 0 0-2h-3V8Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </TableCell>
              <TableCell  >
                <div className="cursor-pointer mr-2" onMouseEnter={(e) => handlemore(e)}>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="none"
                    color="#000"
                    data-src="https://cdn.hugeicons.com/icons/more-vertical-circle-02-solid-standard.svg"
                    viewBox="0 0 24 24"
                    data-id={entry.id}
                  >
                    <path

                      fill="#000"
                      fillRule="evenodd"
                      d="M12 22.75C6.063 22.75 1.25 17.937 1.25 12S6.063 1.25 12 1.25 22.75 6.063 22.75 12 17.937 22.75 12 22.75Zm0-16a1.25 1.25 0 1 0 0 2.5h.009a1.25 1.25 0 0 0 0-2.5H12Zm0 4a1.25 1.25 0 1 0 0 2.5h.009a1.25 1.25 0 0 0 0-2.5H12Zm0 4a1.25 1.25 0 1 0 0 2.5h.009a1.25 1.25 0 0 0 0-2.5H12Z"
                      clipRule="evenodd"
                      data-id={entry.id}
                    />
                  </svg>
                </div>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </table>
    </BaseNode>
  );
}
