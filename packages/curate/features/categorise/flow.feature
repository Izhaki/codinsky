Feature: Flow control categorisation

  Scenario: If statements
    Given the following code:
      """
      if (a)
        doSomething()
      """
    Then the simplified ast should be:
      | type             | category | subCategory |
      | IfStatement      | flow     | branching   |
      | ..CallExpression |          |             |

  Scenario: If statements branch block
    If the child of an if statement is a multi-statement block
    we mark it as 'branch'

    Given the following code:
      """
      if (a) {
        doSomething();
        doSomething();
      }
      """
    Then the simplified ast should be:
      | type               | category | subCategory |
      | IfStatement        |          |             |
      | ..BlockStatement   | flow     | branch      |
      | ....CallExpression |          |             |
      | ....CallExpression |          |             |

  Scenario: Return statements
    Given the following code:
      """
      function nothing() {
        return;
      }
      """
    Then the simplified ast should be:
      | type                | category | subCategory |
      | FunctionDeclaration |          |             |
      | ..ReturnStatement   | flow     | return      |

  Scenario: For loop
    Given the following code:
      """
      for (let i = 0; i < items.length; i++) {
        console.log(items[i]);
      }
      """
    Then the simplified ast should be:
      | type             | category | subCategory |
      | ForStatement     | flow     | loop        |
      | ..CallExpression |          |             |

  Scenario: For-of loop
    Given the following code:
      """
      for (const item of items) {
        item.selected = false;
      }
      """
    Then the simplified ast should be:
      | type                   | category | subCategory |
      | ForOfStatement         | flow     | loop        |
      | ..AssignmentExpression |          |             |

  Scenario: For-in loop
    Given the following code:
      """
      for (const key in obj) {
        console.log(key);
      }
      """
    Then the simplified ast should be:
      | type             | category | subCategory |
      | ForInStatement   | flow     | loop        |
      | ..CallExpression |          |             |

  Scenario: For-in loop
    Given the following code:
      """
      for (const key in obj) {
        if (key = 'ignore') continue
      }
      """
    Then the simplified ast should be:
      | type                  | category | subCategory |
      | ForInStatement        |          |             |
      | ..IfStatement         |          |             |
      | ....ContinueStatement | flow     | continue    |

  Scenario: While loop
    Given the following code:
      """
      while (x > 0) {
        console.log(x);
        x--;
      }
      """
    Then the simplified ast should be:
      | type               | category | subCategory |
      | WhileStatement     | flow     | loop        |
      | ..CallExpression   |          |             |
      | ..UpdateExpression |          |             |


  Scenario: Switch statement
    Given the following code:
      """
      switch (tag) {
        case 'object':
          props = rawProps;
          break;
      }
      """
    Then the simplified ast should be:
      | type                     | category | subCategory |
      | SwitchStatement          | flow     | branching   |
      | ..SwitchCase             |          |             |
      | ....AssignmentExpression |          |             |
      | ....BreakStatement       |          |             |

  Scenario: Break statement
    Given the following code:
      """
      switch (tag) {
        case 'object':
          props = rawProps;
          break;
      }
      """
    Then the simplified ast should be:
      | type                     | category | subCategory |
      | SwitchStatement          |          |             |
      | ..SwitchCase             |          |             |
      | ....AssignmentExpression |          |             |
      | ....BreakStatement       | flow     | break       |

  Scenario: Try catch block
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
      | type                   | category | subCategory |
      | TryStatement           | flow     | branching   |
      | ..CallExpression       |          |             |
      | ..AssignmentExpression |          |             |
      | ..AssignmentExpression |          |             |

  Scenario: Throw
    Given the following code:
      """
      throw new Error('An error');
      """
    Then the simplified ast should be:
      | type           | category | subCategory |
      | ThrowStatement | flow     | exception   |
