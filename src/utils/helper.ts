import { AlignmentType, NodeType } from './types';

export function generateColor() {
  const possibleColors = 16777215;
  return '#' + Math.floor(Math.random() * possibleColors).toString(16);
}

type AddNodeFunctionType = {
  node: NodeType;
  alignment: AlignmentType;
  id: number;
  color: string;
  lastNodeId: number;
};

export function addNode({
  node,
  alignment,
  id,
  color,
  lastNodeId,
}: AddNodeFunctionType) {
  // checking if the current node is the target node
  const tempNode = node;
  if (tempNode.id === id) {
    tempNode.alignment = alignment;
    tempNode.children = [
      {
        id: lastNodeId + 1,
        alignment: 'horizontal',
        children: [],
        color: tempNode.color,
      },
      { id: lastNodeId + 2, alignment: 'horizontal', children: [], color },
    ];
    tempNode.color = '#374151';
    return tempNode;
  }

  let newNode = {};
  newNode = node.children.map((el) => {
    return addNode({ node: el, alignment, id, color, lastNodeId });
  });

  return { ...node, children: newNode } as NodeType;
}

export function getOppositeIndex(index: number) {
  return (index + 1) % 2;
}

export function deleteNode(node: NodeType, id: number) {
  if (node.children.length > 0) {
    const length = node.children.length;
    for (let i = 0; i < length; i++) {
      const currentNode = node.children[i];
      if (currentNode.id === id) {
        const oppositeNode = node.children[getOppositeIndex(i)];
        node.alignment = oppositeNode.alignment;
        node.children = oppositeNode.children;
        node.color = oppositeNode.color;
      }
    }
    return node;
  }
  return node;
}
