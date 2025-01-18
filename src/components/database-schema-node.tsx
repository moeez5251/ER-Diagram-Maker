import { counter } from "../../context/context"
import { useContext, useRef, useState } from "react";
import { Node, NodeProps, Position } from "@xyflow/react";
import { v4 as uuidv4 } from 'uuid';
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { BaseNode } from "@/components/base-node";
import { LabeledHandle } from "@/components/labeled-handle";
import { CloudCog } from "lucide-react";
type DatabaseSchemaNode = Node<{
  label: string;
  schema: { title: string; type: string }[];
}>;

export function DatabaseSchemaNode({
  data,
  selected,
}: NodeProps<DatabaseSchemaNode>) {
  const countervalue = useContext(counter)
  const [label, setLabel] = useState(data.label);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  };
  const handlerowclick = (event: React.ChangeEvent<HTMLElement>) => {
    // let  parent=event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    let parent = event.target.parentElement.parentElement.parentElement.parentElement;
    console.log(parent);
    parent.remove();

  }
  const handleclick = (event: React.ChangeEvent<HTMLElement>) => {
    let parent = event.target.parentElement.parentElement.parentNode.parentNode.parentElement.parentElement.parentNode.firstElementChild.value
    const newField = { title: "no-name", type: "text" };
    countervalue.setNodes(prevNodes => 
      prevNodes.map(node => 
        node.data.label === parent  
          ? {
              ...node,  
              data: {
                ...node.data,  
                schema: [
                  ...node.data.schema,  
                  newField  
                ]
              }
            }
          : node  
      )
    );
  }
  return (
    <BaseNode className="p-0" selected={selected}>
      <input
        onChange={handleChange}
        className="rounded-tl-md rounded-tr-md bg-blue-800 p-2 text-center text-sm text-white dark:bg-neutral-800 dark:text-neutral-400 w-full border-none outline-none cursor-grab focus:bg-blue-900 cursor-pointer"
        type="text"
        value={label}
      />
      <table className="border-spacing-10 overflow-visible">
        <TableBody>
          {data.schema.map((entry) => (
            <TableRow key={uuidv4()} id={uuidv4()} className="relative text-xs hover:bg-cyan-400  ">
              <TableCell className="pl-0 pr-6 font-bold">
                <LabeledHandle
                  id={uuidv4()}
                  title={entry.title}
                  type="target"
                  position={Position.Left}
                />
              </TableCell>
              <TableCell className="py-2 px-2 gap-3  text-center flex items-end justify-center font-normal cursor-pointer" >
                <div onClick={handlerowclick} title="remove record" >

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
                <div onClick={handleclick} title="add record" >

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
              <TableCell className="pr-0 text-center font-normal">
                <LabeledHandle
                  id={uuidv4()}
                  title={entry.type}
                  type="source"
                  position={Position.Right}
                  className="p-0"
                  handleClassName="p-0"
                  labelClassName="p-0"
                />
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </table>
    </BaseNode>
  );
}
