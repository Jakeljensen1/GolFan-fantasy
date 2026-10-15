import { render, screen, fireEvent } from "@testing-library/react";
import LeaderboardRow from "../components/LeaderboardRow";

describe("LeaderboardRow", () => {
  const lineup = {
    user: {
      name: "Jake",
      imgUrl: "http://example.com/jake.png"
    },
    score: 12
  };

  test("renders rank, avatar, name, and score", () => {
    render(<LeaderboardRow lineup={lineup} rank={1} onSelect={() => { }} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Jake")).toBeInTheDocument();
    expect(screen.getByText("Score: 12")).toBeInTheDocument();

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", lineup.user.imgUrl);
  });

  test("calls onSelect when clicked", () => {
    const onSelect = jest.fn();
    render(<LeaderboardRow lineup={lineup} rank={1} onSelect={onSelect} />);

    fireEvent.click(screen.getByText("Jake"));
    expect(onSelect).toHaveBeenCalled();
  });
});
