import { traverse, isFunction, forEachChild } from './traversal';

const setCategory = (node, category, subCategory) => {
  node.category = category;
  node.subCategory = subCategory;
};

const isRequire = node =>
  node &&
  node.type === 'CallExpression' &&
  node.children.callee.name === 'require';

export default ast => {
  const enter = node => {
    switch (node.type) {
      case 'Program': {
        setCategory(node, 'process', 'main');
        break;
      }

      case 'SwitchStatement':
      case 'IfStatement':
      case 'TryStatement': {
        // Mark children as branch, this will be overriden when exiting the node
        // for all but block statemetns.
        forEachChild(node, child => {
          setCategory(child, 'flow', 'branch');
        });
        break;
      }
      default:
    }
  };

  const exit = node => {
    const { children } = node;
    switch (node.type) {
      case 'ExportDefaultDeclaration':
      case 'ExportNamedDeclaration': {
        setCategory(node, 'export', 'es6');
        break;
      }

      case 'SwitchStatement':
      case 'IfStatement':
      case 'TryStatement': {
        setCategory(node, 'flow', 'branching');
        break;
      }

      case 'ForStatement':
      case 'ForOfStatement':
      case 'ForInStatement':
      case 'WhileStatement': {
        setCategory(node, 'flow', 'loop');
        break;
      }

      case 'BreakStatement': {
        setCategory(node, 'flow', 'break');
        break;
      }

      case 'ContinueStatement': {
        setCategory(node, 'flow', 'continue');
        break;
      }

      case 'ReturnStatement': {
        setCategory(node, 'flow', 'return');
        break;
      }

      case 'VariableDeclarator': {
        const isObjectPattern = children.id.type === 'ObjectPattern';
        const declarations = isObjectPattern
          ? children.id.children.properties
          : [node];

        let category;
        let subCategory;
        if (isRequire(children.init)) {
          category = 'dependency';
          subCategory = 'commonJS';
        } else if (isFunction(node.children.init)) {
          category = 'process';
          subCategory = 'declaration';
        } else {
          category = 'state';
          subCategory = 'declaration';
        }
        setCategory(node, category, subCategory);
        declarations.forEach(declaration => {
          setCategory(declaration, category, subCategory);
        });

        break;
      }

      case 'CallExpression': {
        setCategory(node, 'process', 'invocation');
        break;
      }

      case 'FunctionDeclaration': {
        setCategory(node, 'process', 'declaration');
        break;
      }

      case 'ClassMethod': {
        setCategory(node, 'process', 'declaration');
        break;
      }

      case 'ImportSpecifier':
      case 'ImportDefaultSpecifier': {
        setCategory(node, 'dependency', 'es6');
        break;
      }

      case 'ThrowStatement': {
        setCategory(node, 'flow', 'exception');
        break;
      }

      case 'AssignmentExpression':
      case 'UpdateExpression': {
        setCategory(node, 'state', 'mutation');
        break;
      }
      default:
    }
  };

  setCategory(ast, 'root');
  traverse(ast, { enter, exit });
  return ast;
};
