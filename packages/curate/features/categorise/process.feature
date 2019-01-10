Feature: Process

  Scenario: Function declaration
    Given the following code:
      """
      function log(something) {
        JSON.stringify(something, null, 4);
      }
      """
    Then the simplified ast should be:
      | type                | category   | subCategory |
      | FunctionDeclaration | process    | declaration |
      | ..CallExpression    |            |             |

  Scenario: Exported function declaration
    Given the following code:
      """
      export function log(something) {
        JSON.stringify(something, null, 4);
      }
      """
    Then the simplified ast should be:
      | type                   | category   | subCategory |
      | ExportNamedDeclaration |            |             |
      | ..FunctionDeclaration  | process    | declaration |
      | ....CallExpression     |            |             |

  Scenario: Exported arrow function declaration
    Given the following code:
      """
      export default () => { doA(); }
      """
    Then the simplified ast should be:
      | type                      | category | subCategory |
      | ExportDefaultDeclaration  |          |             |
      | ..ArrowFunctionExpression | process  | declaration |
      | ....CallExpression        |          |             |

  Scenario: Arrow function
    Given the following code:
      """
      const isDefined = x => x !== undefined;
      """
    Then the simplified ast should be:
      | type               | category   | subCategory |
      | VariableDeclarator | process    | declaration |

  Scenario: Class method
    Given the following code:
      """
      class Person {
        speak() {
          console.log('Hello!');
        }
      }
      """
    Then the simplified ast should be:
      | type               | category   | subCategory |
      | ClassDeclaration   |            |             |
      | ..ClassMethod      | process    | declaration |
      | ....CallExpression |            |             |

  Scenario: Invocation
    Given the following code:
      """
      items.push(item);
      """
    Then the simplified ast should be:
      | type           | category   | subCategory |
      | CallExpression | process    | invocation  |

  Scenario: Chai style expectation
    Given the following code:
      """
      expect(x).to.equal.true;
      """
    Then the simplified ast should be:
      # See explaination in categorise.js as for why this is MemberExpression
      | type             | category   | subCategory |
      | MemberExpression | process    | invocation  |

