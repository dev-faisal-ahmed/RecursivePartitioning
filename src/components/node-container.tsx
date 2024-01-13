import { useAppContext } from "../hooks/use-app-context";
import { AlignmentType, NodeType } from "../utils/types";

export function NodeContainer({ children, color, id, alignment }: NodeType) {
  const { state, dispatch } = useAppContext();
  const buttonClassName = `bg-gray-300 py-1 px-3 rounded text-gray-700 font-semibold w-8 h-8 flex items-center justify-center`;

  console.log({ id, alignment });

  function handleAddNode(alignment: AlignmentType) {
    dispatch({ type: "ADD_NODE", payload: { id, alignment } });
  }

  return (
    <div
      key={id}
      style={{ backgroundColor: color, flexDirection: alignment === "vertical" ? "row" : "column" }}
      className="flex items-center justify-center w-full h-full gap-2"
    >
      {!children || children.length === 0 ? (
        <div className="flex items-center gap-1">
          <button onClick={() => handleAddNode("vertical")} className={buttonClassName}>
            V
          </button>
          <button onClick={() => handleAddNode("horizontal")} className={buttonClassName}>
            H
          </button>
          {state.totalNodes !== 1 && <button className={buttonClassName}>-</button>}
        </div>
      ) : (
        <>
          {children.map((el) => (
            <NodeContainer key={el.id} {...el} />
          ))}
        </>
      )}
    </div>
  );
}
