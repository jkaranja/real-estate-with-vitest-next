import { render, screen } from "@testing-library/react";
import CreateForm from "./CreateForm";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormState: () => [() => {}, null],
  useFormStatus: () => [() => {}, null],
}));

describe("AddListing", () => {
  describe("Render", () => {
    it("should render bedrooms input", async () => {
      render(<CreateForm />);
      const bedroomsInputEl = screen.getByTestId("bedrooms");
      expect(bedroomsInputEl).toBeInTheDocument();
      //expect(bedroomsInputEl).toHaveAttribute("name", "username");

      // ARRANGE
      //The render method renders a React element into the DOM.
      // ACT
      //The fireEvent method allows you to fire events to simulate user actions.
      //await userEvent.click(screen.getByText("Load Greeting"));
      //await screen.findByRole("heading");

      // ASSERT
      // assert that ...
      // const paragraph = screen.getByRole("paragraph", { level: 1 });
      // expect(paragraph).toBeInTheDocument();
      // // toHaveTextContent, a custom matcher from jest-dom.
      // expect(screen.getByRole("paragraph")).toHaveTextContent("Loading...");
      // //expect(screen.getByRole("button")).toBeDisabled();
    });
  });

  // describe("Behavior", () => {});
});
