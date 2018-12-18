Feature: Try Catch Finally Blocks

  Scenario: Try catch finally block with single-statement blocks
    Given the following code:
      """
      try {
        doSomething();
      } catch {
        isDispatching = true;
      } finally {
        isDispatching = false;
      }
      """
    Then the simplified ast should be:
      | type                   |
      | TryStatement           |
      | ..CallExpression       |
      | ..AssignmentExpression |
      | ..AssignmentExpression |

  Scenario: Try catch finally block with multi-statement blocks
    Given the following code:
      """
      try {
        doSomething();
        doSomething();
      } catch {
        isDispatching = true;
        isDispatching = true;
      } finally {
        isDispatching = false;
        isDispatching = false;
      }
      """
    Then the simplified ast should be:
      | type                     |
      | TryStatement             |
      | ..BlockStatement         |
      | ....CallExpression       |
      | ....CallExpression       |
      | ..BlockStatement         |
      | ....AssignmentExpression |
      | ....AssignmentExpression |
      | ..BlockStatement         |
      | ....AssignmentExpression |
      | ....AssignmentExpression |
