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

  Scenario: If statement with a then and else statement
    Given the following code:
      """
      if (a)
        doSomething()
      else
        doSomething()
      """
    Then the simplified ast should be:
      | type             |
      | IfStatement      |
      | ..CallExpression |
      | ..CallExpression |

  Scenario: If statement with a single-child then block statement
    Given the following code:
      """
      if (a) {
        doSomething()
      }
      """
    Then the simplified ast should be:
      | type             |
      | IfStatement      |
      | ..CallExpression |

  Scenario: If statement with a single-child block statement in both then and else.
    Given the following code:
      """
      if (a) {
        doSomething()
      } else {
        doSomething()
      }
      """
    Then the simplified ast should be:
      | type             |
      | IfStatement      |
      | ..CallExpression |
      | ..CallExpression |

  Scenario: If statement with a multi-child then block statement
    Given the following code:
      """
      if (a) {
        doSomething()
        doSomething()
      }
      """
    Then the simplified ast should be:
      | type               |
      | IfStatement        |
      | ..BlockStatement   |
      | ....CallExpression |
      | ....CallExpression |

  Scenario: If statement with a multi-child then and else block statements
    Given the following code:
      """
      if (a) {
        doSomething()
        doSomething()
      } else {
        doSomething()
        doSomething()
      }
      """
    Then the simplified ast should be:
      | type               |
      | IfStatement        |
      | ..BlockStatement   |
      | ....CallExpression |
      | ....CallExpression |
      | ..BlockStatement   |
      | ....CallExpression |
      | ....CallExpression |

  Scenario: If statement with a multi-child then statement and single-child else block statement
    Given the following code:
      """
      if (a) {
        doSomething()
        doSomething()
      } else {
        doSomething()
      }
      """
    Then the simplified ast should be:
      | type               |
      | IfStatement        |
      | ..BlockStatement   |
      | ....CallExpression |
      | ....CallExpression |
      | ..CallExpression   |

  Scenario: If statement with an else-if else statement
    With else-if condition as below, each is a branch of the parent if node.

    Given the following code:
      """
      if (a) {
        doSomething()
        doSomething()
      } else if (b) {
        doSomething()
      } else {
        doSomething()
      }
      """
    Then the simplified ast should be:
      | type               |
      | IfStatement        |
      | ..BlockStatement   |
      | ....CallExpression |
      | ....CallExpression |
      | ..CallExpression   |
      | ..CallExpression   |
