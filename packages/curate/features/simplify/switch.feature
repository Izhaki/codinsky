Feature: Switch statements

  Scenario: A switch statement
    Given the following code:
      """
      switch (tag) {
        case 'iframe':
        case 'object':
          trapBubbledEvent(TOP_LOAD, domElement);
          props = rawProps;
          break;
        case 'source': {
          trapBubbledEvent(TOP_ERROR, domElement);
          props = rawProps;
          break;
        }
        default:
          props = rawProps;
      }
      """
    Then the simplified ast should be:
      | type                     |
      | SwitchStatement          |
      | ..SwitchCase             |
      | ..SwitchCase             |
      | ....CallExpression       |
      | ....AssignmentExpression |
      | ....BreakStatement       |
      | ..BlockStatement         |
      | ....CallExpression       |
      | ....AssignmentExpression |
      | ....BreakStatement       |
      | ..AssignmentExpression   |
