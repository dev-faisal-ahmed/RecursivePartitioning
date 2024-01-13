import { useContext } from "react";
import { AppContext } from "../context-api/app-context";

export function useAppContext() {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("Can not access the context");
  return appContext;
}
