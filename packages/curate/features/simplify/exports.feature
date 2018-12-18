Feature: Exports

  Scenario: Name export

    Given the following code:
      """
      export const doSomething = () => { doA(); }
      """
    Then the simplified ast should be:
      | type                   |
      | ExportNamedDeclaration |
      | ..VariableDeclarator   |
      | ....CallExpression     |

  Scenario: Default export

    Given the following code:
      """
      export default () => { doA(); }
      """
    Then the simplified ast should be:
      | type                      |
      | ExportDefaultDeclaration  |
      | ..ArrowFunctionExpression |
      | ....CallExpression        |
