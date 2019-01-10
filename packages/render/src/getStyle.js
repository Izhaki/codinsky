const theme = {
  path: {
    stroke: '#fdf6e3',
    fill: '#93a1a1',
  },
  '.process.main': {
    fill: 'none',
  },
  '.dependency': {
    fill: '#353461',
  },
  '.export': {
    fill: '#353461',
  },
  '.process.declaration': {
    fill: '#19A150',
  },
  '.process.invocation': {
    fill: '#57c785',
  },
  '.state': {
    fill: '#2a7b9b',
  },
  '.flow.loop': {
    fill: '#f3c100',
  },
  '.flow.branching': {
    fill: '#ea5933',
  },
  '.flow.branch': {
    fill: '#ea5933',
  },
  '.flow.return': {
    fill: '#ed8d13',
  },
  '.flow.break': {
    fill: '#ed8d13',
  },
  '.flow.continue': {
    fill: '#ed8d13',
  },
  '.flow.exception': {
    fill: '#c8213a',
  },
  '.class': {
    fill: '#3d3d6b',
  },
};

const map = (mapper, obj) =>
  Object.entries(obj)
    .map(mapper)
    .join('');

const propMaaper = ([prop, value]) => `  ${prop}: ${value}; \n`;
const classMapper = ([cls, props]) => `${cls} {\n${map(propMaaper, props)}}\n`;

export default () => map(classMapper, theme);
