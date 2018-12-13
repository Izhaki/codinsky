/* eslint-disable func-names, prefer-arrow-callback */

import { Given, Then } from 'cucumber';

Given('the following code:', function(source) {
  console.log(source);
});

Then('the simplified ast should be:', function(table) {
  console.log(table);
});
