export type GameSummaryDTO = {
  id: string;
  team1: GameTeamDTO;
  team2: GameTeamDTO;
  tournament?: string;
  league?: string | null;
  GameFormat: GameFormat;
  GameStatus: GameStatus;
  dateTime: Date;
  periods: number;
  periodLength: number;
};

export type GameTeamDTO = {
  id: string;
  name: string;
  players: GamePlayerDTO[];
  score: number;
};

export type GamePlayerDTO = {
  id: string;
  name: string;
  number: number;
  points: number;
  rebounds: number;
  assists: number;
  blocks: number;
  steals: number;
  fgm: number;
  fga: number;
  ftm: number;
  fta: number;
  starter: boolean;
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
export type GameStatus = 'not-started' | 'in-progress' | 'finished' | 'canceled';

export type TeamGameDetails = { team1: GameTeamDTO; team2: GameTeamDTO };
