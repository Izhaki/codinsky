import { traverse, forEachChild } from '../traversal';

const keep = node => {
  node.keep = true;
};
const ignore = node => {
  node.keep = false;
};

const isKeep = node => node.keep === true;

export default ast => {
  const enter = node => {
    const { children } = node;
    switch (node.type) {
      case 'Program': {
        keep(node);
        forEachChild(node, keep);
        break;
      }

      case 'BlockStatement': {
        forEachChild(node, keep);

        if (node.childCount <= 1) {
          ignore(node);
        }
        break;
      }

      case 'IfStatement': {
        keep(node);
        keep(children.consequent);
        if (children.alternate) {
          // In case alternate is not a block
          keep(children.alternate);
        }
        break;
      }

      case 'SwitchStatement': {
        keep(node);
        children.cases.forEach(switchCase => {
          if (switchCase.children.consequent === undefined) return;
          if (switchCase.children.consequent.length !== 1) {
            keep(switchCase);
          }
          switchCase.children.consequent.forEach(keep);
        });
        break;
      }

      case 'TryStatement': {
        keep(node);
        keep(children.block);
        if (children.handler) {
          keep(children.handler.children.body);
        }
        if (children.finalizer) {
          keep(children.finalizer);
        }
        break;
      }

      case 'ClassBody': {
        children.body.forEach(keep);
        break;
      }

      case 'ThrowStatement': {
        keep(node);
        break;
      }

      case 'VariableDeclaration': {
        // Only if the node is already marked as keep, replace it with its
        // children. This is to prevent, for example, the following loop initialisation
        // from showing:
        // for (let i = 0; ... ; ...) { ... }
        if (isKeep(node)) {
          children.declarations.forEach(keep);
          ignore(node);
        }
        break;
      }

      case 'VariableDeclarator': {
        if (isKeep(node)) {
          if (children.id.type === 'ObjectPattern') {
            const { properties } = children.id.children;
            properties.forEach(keep);
          }
        }
        break;
      }

      // e.g.
      // export function something() { ... }
      case 'ExportDefaultDeclaration':
      case 'ExportNamedDeclaration': {
        keep(children.declaration);
        break;
      }

      case 'ExpressionStatement': {
        ignore(node);
        keep(children.expression);
        break;
      }

      case 'ImportDeclaration': {
        ignore(node);
        children.specifiers.forEach(keep);
        break;
      }
      default:
    }
  };

  const exit = node => {
    const { children } = node;
    switch (node.type) {
      case 'IfStatement': {
        if (children.alternate) {
          if (children.alternate.type === 'IfStatement') {
            // Ignore else-if so to the branches are siblings rather than nested.
            ignore(children.alternate);
          }
        }
        break;
      }
      default:
    }
  };

  traverse(ast, { enter, exit });
  return ast;
};
