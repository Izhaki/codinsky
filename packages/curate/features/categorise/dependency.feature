Feature: Dependency

  Scenario: require (default)
    Given the following code:
      """
      const x = require('codinsky');
      """
    Then the simplified ast should be:
      | type               | category   | subCategory |
      | VariableDeclarator | dependency | commonJS    |
      | ..Identifier       | dependency | commonJS    |

  Scenario: require (keys)
    Given the following code:
      """
      const { x, y } = require('codinsky');
      """
    Then the simplified ast should be:
      | type               | category   | subCategory |
      | VariableDeclarator | dependency | commonJS    |
      | ..ObjectProperty   | dependency | commonJS    |
      | ..ObjectProperty   | dependency | commonJS    |

  Scenario: import statement (default)
    Given the following code:
      """
      import codinsky from 'codinsky';
      """
    Then the simplified ast should be:
      | type                     | category   | subCategory |
      | ImportDeclaration        | dependency | es6         |
      | ..ImportDefaultSpecifier | dependency | es6         |

  Scenario: import statement (keys)
    Given the following code:
      """
      import { x, y } from 'codinsky';
      """
    Then the simplified ast should be:
      | type                | category   | subCategory |
      | ImportDeclaration   | dependency | es6         |
      | ..ImportSpecifier   | dependency | es6         |
      | ..ImportSpecifier   | dependency | es6         |

  Scenario: import statement (keys)
    Given the following code:
      """
      import * as d3 from 'd3';
      """
    Then the simplified ast should be:
      | type                       | category   | subCategory |
      | ImportDeclaration          | dependency | es6         |
      | ..ImportNamespaceSpecifier | dependency | es6         |
