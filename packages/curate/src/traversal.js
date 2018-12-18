export const isFunction = node =>
  node && node.type === 'ArrowFunctionExpression';

// We use flatten with getChildren as some children (like body) are an array, not nodes.
const flatten = (acc, item) => acc.concat(item);
const getChildren = node => Object.values(node.children).reduce(flatten, []);

export const forEachChild = (node, callback) => {
  getChildren(node).forEach(callback);
};

export const traverse = (root, handlers) => {
  const { enter, exit } = handlers;
  const visit = node => {
    if (enter) enter(node);
    forEachChild(node, visit);
    if (exit) exit(node);
  };
  visit(root);
};
