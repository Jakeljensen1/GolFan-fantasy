import { render, screen } from "@testing-library/react";
import UserLineup from "../components/UserLineup";

describe("UserLineup", () => {
  const lineup = {
    tournament: { name: "Masters" },
    entries: [
      { _id: "1", golferId: { name: "Tiger Woods", imageUrl: "tiger.png" } },
      { _id: "2", golferId: { name: "Rory McIlroy", imageUrl: "rory.png" } }
    ]
  };

  test("renders tournament name and all golfers", () => {
    render(<UserLineup lineup={lineup} />);

    expect(screen.getByText("Tournament: Masters")).toBeInTheDocument();
    expect(screen.getByText("Tiger Woods")).toBeInTheDocument();
    expect(screen.getByText("Rory McIlroy")).toBeInTheDocument();
  });
});
