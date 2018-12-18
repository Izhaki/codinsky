Feature: Exports

  Scenario: Name export

    Given the following code:
      """
      export const doSomething = () => { doA(); }
      """
    Then the simplified ast should be:
      | type                   | category | subCategory |
      | ExportNamedDeclaration | export   | es6         |
      | ..VariableDeclarator   |          |             |
      | ....CallExpression     |          |             |

  Scenario: Default export

    Given the following code:
      """
      export default () => { doA(); }
      """
    Then the simplified ast should be:
      | type                      | category | subCategory |
      | ExportDefaultDeclaration  | export   | es6         |
      | ..ArrowFunctionExpression |          |             |
      | ....CallExpression        |          |             |
