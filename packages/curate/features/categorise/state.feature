Feature: State

  Scenario: Variable declaration
    Given the following code:
      """
      const x = 6;
      """
    Then the simplified ast should be:
      | type               | category | subCategory |
      | VariableDeclarator | state    | declaration |

  Scenario: Variable declaration (object)
    Given the following code:
      """
      const { x, y } = getCentre();
      """
    Then the simplified ast should be:
      | type               | category | subCategory |
      | VariableDeclarator | state    | declaration |
      | ..ObjectProperty   | state    | declaration |
      | ..ObjectProperty   | state    | declaration |

  Scenario: Variable assignment
    Given the following code:
      """
      x = 6;
      """
    Then the simplified ast should be:
      | type                 | category | subCategory |
      | AssignmentExpression | state    | mutation  |

  Scenario: Update expression
    Given the following code:
      """
      x--;
      """
    Then the simplified ast should be:
      | type             | category | subCategory |
      | UpdateExpression | state    | mutation  |

  Scenario: Delete
    Given the following code:
      """
      delete x;
      """
    Then the simplified ast should be:
      | type             | category | subCategory |
      | UnaryExpression  | state    | mutation    |

