Feature: Loops

  Scenario: For loop with multi statement block body
    The body node of a for loop should be ignored.
    Given the following code:
      """
      for (let i = 0; i < items.length; i++) {
        console.log(i);
        console.log(items[i]);
      }
      """
    Then the simplified ast should be:
      | type             |
      | ForStatement     |
      | ..CallExpression |
      | ..CallExpression |


  Scenario: For-of loop with multi statement block body
    The body node of a for loop should be ignored.

    Given the following code:
      """
      for (const item of items) {
        item.selected = false;
        removeItem(item);
      }
      """
    Then the simplified ast should be:
      | type                   |
      | ForOfStatement         |
      | ..AssignmentExpression |
      | ..CallExpression       |

  Scenario: While loop with multi statement block body
    The body node of a for loop should be ignored.

    Given the following code:
      """
      while (x > 0) {
        console.log(x);
        x--;
      }
      """
    Then the simplified ast should be:
      | type               |
      | WhileStatement     |
      | ..CallExpression   |
      | ..UpdateExpression |
