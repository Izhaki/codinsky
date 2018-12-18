Feature: Functions

  Scenario: Arrow function with block.

    Given the following code:
      """
      const doSomething = () => {
        doA();
        doB();
      }
      """
    Then the simplified ast should be:
      | type               |
      | VariableDeclarator |
      | ..CallExpression   |
      | ..CallExpression   |
