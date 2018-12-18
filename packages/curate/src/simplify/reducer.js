import { forEachChild } from '../traversal';

export default ast => {
  let root;

  const visit = outNode => node => {
    if (node.keep) {
      const newNode = {
        type: node.type,
        loc: node.loc,
        category: node.category,
        subCategory: node.subCategory,
        declarations: node.declarations,
        invocations: node.invocations,
        reads: node.reads,
        children: [],
      };
      if (outNode) {
        outNode.children.push(newNode);
      } else {
        root = newNode;
      }
      forEachChild(node, visit(newNode));
    } else {
      if (outNode !== undefined) {
        outNode.declarations.push(...node.declarations);
        outNode.invocations.push(...node.invocations);
        outNode.reads.push(...node.reads);
      }
      forEachChild(node, visit(outNode));
    }
  };

  visit(root)(ast);
  return root;
};
