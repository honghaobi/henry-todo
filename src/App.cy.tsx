import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("App Component", () => {
  beforeEach(() => {
    const queryClient = new QueryClient();
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );
  });

  it("renders the task list correctly", () => {
    cy.get("ul").should("exist");
    cy.get("ul li").should("have.length", 5);
  });

  it("adds a new task correctly", () => {
    const newTaskTitle = "Test New Task";
    cy.get('input[type="text"]').type(newTaskTitle);
    cy.get("form").submit();
    cy.get("ul li").last().should("contain.text", newTaskTitle);
  });

  it("marks a task as completed correctly", () => {
    cy.get("ul li div").first().click();
    cy.get("ul li").first().get(".fa-check").should("exist");
  });

  it("updates a task correctly", () => {
    const updatedTaskTitle = "Updated Task Title";
    cy.get("button[aria-label='Edit Task']").first().click();
    cy.get("input").first().type("{selectall}{backspace}");
    cy.get("input").first().type(updatedTaskTitle);
    cy.get("input").first().type("{enter}");
    cy.get("ul li").first().should("contain.text", updatedTaskTitle);
  });

  it("removes a task correctly", () => {
    cy.get("button[aria-label='Delete Task']").first().click();
    cy.get("ul li").should("have.length", 4);
  });
});
