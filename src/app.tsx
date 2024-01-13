import { NodeContainer } from "./components/node-container";
import { useAppContext } from "./hooks/use-app-context";

export function App() {
  const { state } = useAppContext();

  return (
    <div className="h-screen">
      <NodeContainer {...state.node} />
    </div>
  );
}
