
import Demo from './main';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

it("should be valid", async () => {
    render(<Demo />);   
    expect(screen.getByPlaceholderText("Search users")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("searchBy")).toBeInTheDocument();
  });