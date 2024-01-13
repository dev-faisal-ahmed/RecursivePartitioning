import { ReactNode } from "react";

export type AlignmentType = "vertical" | "horizontal";

export type NodeType = {
  id: number;
  color: string;
  children: NodeType[];
  alignment: AlignmentType;
};

export type WrapperType = {
  children: ReactNode;
};
