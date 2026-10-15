import { render, screen } from "@testing-library/react";
import TournamentLeaderboardPage from "../pages/TournamentLeaderboardPage";
import { MemoryRouter } from "react-router-dom";

jest.mock("../services/lineupService", () => ({
  getTournamentLineups: jest.fn().mockResolvedValue([])
}));

jest.mock("../context/AuthContext", () => ({
  useAuth: () => ({ user: { _id: "123", name: "Jake" } })
}));

describe("TournamentLeaderboardPage", () => {
  test("shows 'Leaderboard Unavailable' when no lineups exist", async () => {
    render(
      <MemoryRouter initialEntries={["/tournament/abc/leaderboard"]}>
        <TournamentLeaderboardPage />
      </MemoryRouter>
    );

    expect(await screen.findByText("Leaderboard Unavailable")).toBeInTheDocument();
  });
});
