import { ReactNode } from "react";

export type NodeType = {
  id: number;
  color: string;
  children: NodeType[];
};

export type WrapperType = {
  children: ReactNode;
};
