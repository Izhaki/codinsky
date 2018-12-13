Feature: If statements

  Scenario: If statement with a then statement
    Given the following code:
      """
      if (a)
        doSomething()
      """
    Then the simplified ast should be:
      | type             |
      | IfStatement      |
      | ..CallExpression |
