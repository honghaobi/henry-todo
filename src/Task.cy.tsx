import Task from "./Task";

describe("Task", () => {
  it("should mount with title", () => {
    cy.mount(
      <Task
        id={1}
        title="Make Bread"
        completed={false}
        removeTask={() => {}}
        updateTask={() => {}}
        toggleCompleteTask={() => {}}
      />,
    );
    cy.contains("Make Bread");
  });
  it("should show input field when edit button is clicked", () => {
    cy.mount(
      <Task
        id={1}
        title="Make Bread"
        completed={false}
        removeTask={() => {}}
        updateTask={() => {}}
        toggleCompleteTask={() => {}}
      />,
    );

    cy.get("button[aria-label='Edit Task']").click();

    cy.get("input").should("exist");
  });
  it("should update task title on Update button click", () => {
    const updateTaskMock = cy.stub().as("updateTask");

    cy.mount(
      <Task
        id={1}
        title="Make Bread"
        completed={false}
        removeTask={() => {}}
        updateTask={updateTaskMock}
        toggleCompleteTask={() => {}}
      />,
    );

    cy.get("button[aria-label='Edit Task']").click();
    cy.get("input").type("{selectall}{backspace}Cook Dinner");
    cy.contains("Update").click();
    cy.get("@updateTask").should("have.been.calledWith", 1, "Cook Dinner");
  });
  it("should mark task as completed on click if not already completed", () => {
    const toggleCompleteTaskMock = cy.stub().as("toggleCompleteTask");

    cy.mount(
      <Task
        id={1}
        title="Make Bread"
        completed={false}
        removeTask={() => {}}
        updateTask={() => {}}
        toggleCompleteTask={toggleCompleteTaskMock}
      />,
    );

    cy.contains("Make Bread").click();
    cy.get("@toggleCompleteTask").should("have.been.calledWith", 1);
  });
  it("should delete task on delete button click", () => {
    const removeTaskMock = cy.stub().as("removeTask");

    cy.mount(
      <Task
        id={1}
        title="Make Bread"
        completed={true}
        removeTask={removeTaskMock}
        updateTask={() => {}}
        toggleCompleteTask={() => {}}
      />,
    );

    cy.get("button[aria-label='Delete Task']").click();
    cy.get("@removeTask").should("have.been.calledWith", 1);
  });
  it("should update task title on pressing Enter key", () => {
    const updateTaskMock = cy.stub().as("updateTask");
    cy.mount(
      <Task
        id={1}
        title="Make Bread"
        completed={true}
        removeTask={() => {}}
        updateTask={updateTaskMock}
        toggleCompleteTask={() => {}}
      />,
    );

    cy.get("button[aria-label='Edit Task']").click();
    cy.get("input").type("{selectall}{backspace}Cook Dinner{enter}");
    cy.get("@updateTask").should("have.been.calledWith", 1, "Cook Dinner");
  });
  it("should display check icon for completed task", () => {
    cy.mount(
      <Task
        id={1}
        title="Make Bread"
        completed={true}
        removeTask={() => {}}
        updateTask={() => {}}
        toggleCompleteTask={() => {}}
      />,
    );

    cy.get(".fa-check").should("exist");
  });
});
