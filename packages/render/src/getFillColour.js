export default d => {
  const { category, subCategory } = d.data;
  switch (`${category}/${subCategory}`) {
    case 'process/main':
      return 'none';
    case 'dependency/commonJS':
    case 'dependency/es6':
    case 'export/es6':
      return '#353461';
    case 'process/declaration':
      return '#00baad';
    case 'process/invocation':
      return '#57c785';
    case 'state/declaration':
    case 'state/mutation':
      return '#2a7b9b';
    case 'flow/loop':
      return '#f3c100';
    case 'flow/branching':
      return '#ea5933';
    case 'flow/branch':
      return '#ea5933';
    case 'flow/return':
    case 'flow/break':
    case 'flow/continue':
      return '#ed8d13';
    case 'flow/exception':
      return '#c8213a';
    case 'class':
      return '#3d3d6b';
    default:
      return '#93a1a1';
  }
};
