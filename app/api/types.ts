export type GameSummaryDTO = {
  id: string;
  team1Name: string;
  team2Name: string;
  tournamentName?: string;
  Team1Starters: string[];
  Team2Starters: string[];
  GameFormat: GameFormat;
  GameStatus: GameStatus;
  DateTime: Date;
};

export type TeamDTO = {
  id: string;
};

export type PlayerDTO = {
  id: string;
  firstName: string;
  lastName: string;
  number: number;
  teams: TeamSummaryDTO[];
  tournaments: TournamentSummaryDTO[];
  leagues: LeagueSummaryDTO[];
};

export type TeamSummaryDTO = {
  id: string;
  name: string;
};

export type TournamentSummaryDTO = {};
export type LeagueSummaryDTO = {};

export type GameFormat = '1v1' | '2v2' | '3v3' | '4v4' | '5v5';
export type GameStatus = 'not-started' | 'in-progress' | 'finished';
