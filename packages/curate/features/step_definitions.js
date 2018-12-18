/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { Given, Then } from 'cucumber';
import { expect } from 'chai';

import parse from '@codinsky/parse-js';
import curate from '../src';

const { isArray } = Array;
const trim = str => str.trim();
const csvToArray = str => str.split(',').map(trim);

Given('the following code:', function(source) {
  const ast = parse(source);
  this.result = curate(ast);
  // console.log(JSON.stringify(this.result, null, 4));
});

const extractDepth = row => {
  const str = row.type;
  const [, dots, type] = str.match(/^(\.*)([^.]*)$/);
  return {
    ...row,
    type,
    depth: dots ? dots.length / 2 : 0,
  };
};

Then('the simplified ast should be:', function(table) {
  const rows = table.hashes().map(extractDepth);

  const compare = (row, node) => {
    for (const key in row) {
      if (row[key] !== '') {
        const expected = isArray(node[key]) ? csvToArray(row[key]) : row[key];
        expect(expected).to.eql(node[key]);
      }
    }
  };

  const visit = depth => node => {
    node.depth = depth;
    const row = rows.shift();
    expect(row).to.exist;
    compare(row, node);
    node.children.forEach(visit(depth + 1));
  };

  this.result.children.forEach(visit(0));

  // Ensure we have tested all rows.
  expect(rows).to.be.empty;
});
