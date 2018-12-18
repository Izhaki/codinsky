Feature: If statements

  Scenario: If statement with a then statement
    Given the following code:
      """
      class Chunk {
	      constructor(name) {
		      this.id = null;
        }

        get entry() {
          throw new Error(ERR_CHUNK_ENTRY);
        }

        set entry(data) {
          throw new Error(ERR_CHUNK_ENTRY);
        }

        hasEntryModule() {
          return !!this.entryModule;
        }
      }
      """
    Then the simplified ast should be:
      | type                     |
      | ClassDeclaration         |
      | ..ClassMethod            |
      | ....AssignmentExpression |
      | ..ClassMethod            |
      | ....ThrowStatement       |
      | ..ClassMethod            |
      | ....ThrowStatement       |
      | ..ClassMethod            |
      | ....ReturnStatement      |
