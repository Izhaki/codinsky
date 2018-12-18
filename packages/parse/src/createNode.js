export default babelNode => {
  const node = {
    type: babelNode.type,
    loc: babelNode.loc,
    childCount: 0,
    children: {},
    declarations: [],
    invocations: [],
    reads: [],
  };

  if (babelNode.type === 'Identifier') {
    node.name = babelNode.name;
  }

  return node;
};
