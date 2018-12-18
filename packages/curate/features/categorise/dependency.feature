Feature: Dependency

  Scenario: require (default)
    Given the following code:
      """
      const x = require('codinsky');
      """
    Then the simplified ast should be:
      | type               | category   | subCategory |
      | VariableDeclarator | dependency | commonJS    |

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
      | type                   | category   | subCategory |
      | ImportDefaultSpecifier | dependency | es6         |

  Scenario: import statement (keys)
    Given the following code:
      """
      import { x, y } from 'codinsky';
      """
    Then the simplified ast should be:
      | type            | category   | subCategory |
      | ImportSpecifier | dependency | es6         |
      | ImportSpecifier | dependency | es6         |
