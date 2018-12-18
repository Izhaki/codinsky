Feature: Throw statement

  Scenario: Throw statement
    Given the following code:
      """
      if (x > 0) {
        throw new Error('Some error');
      }
      """
    Then the simplified ast should be:
      | type             |
      | IfStatement      |
      | ..ThrowStatement |
