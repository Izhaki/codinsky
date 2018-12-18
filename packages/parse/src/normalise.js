import { VISITOR_KEYS } from '@babel/types';
import createNode from './createNode';

const { isArray } = Array;

const getNode = babelNode => {
  const node = createNode(babelNode);
  const keys = VISITOR_KEYS[babelNode.type];
  if (keys) {
    for (const key of keys) {
      const babelChild = babelNode[key];
      if (babelChild) {
        if (isArray(babelChild)) {
          node.childCount += babelChild.length;
          node.children[key] = babelChild.map(getNode);
        } else {
          node.childCount += 1;
          node.children[key] = getNode(babelChild);
        }
      }
    }
  }
  return node;
};

export default ast => getNode(ast);
