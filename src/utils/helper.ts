import { AlignmentType, NodeType } from "./types";

export function generateColor() {
  const possibleColors = 16777215;
  return "#" + Math.floor(Math.random() * possibleColors).toString(16);
}

type AddNodeFunctionType = {
  node: NodeType;
  alignment: AlignmentType;
  id: number;
  color: string;
  totalNodes: number;
};

export function addNode({ node, alignment, id, color, totalNodes }: AddNodeFunctionType) {
  // checking if the current node is the target node
  const tempNode = node;
  if (tempNode.id === id) {
    tempNode.alignment = alignment;
    tempNode.children = [
      { id: totalNodes + 1, alignment: "horizontal", children: [], color: tempNode.color },
      { id: totalNodes + 2, alignment: "horizontal", children: [], color },
    ];
    tempNode.color = "#374151";
    return tempNode;
  }

  let newNode = {};
  newNode = node.children.map((el) => {
    return addNode({ node: el, alignment, id, color, totalNodes });
  });

  return { ...node, children: newNode } as NodeType;
}
