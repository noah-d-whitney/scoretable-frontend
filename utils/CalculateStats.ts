import { GameTeamDTO } from '@/app/api/types';

type TeamStats = {
  score: number;
  fga: number;
  fgm: number;
  fgp: number;
  three_m: number;
  three_a: number;
  three_p: number;
  fta: number;
  ftm: number;
  ftp: number;
  fouls: number;
  to: number;
  ast: number;
  bl: number;
  st: number;
  rb: number;
};

export function CalcGameStats(team: GameTeamDTO): TeamStats {
  const stats = {
    score: 0,
    fga: 0,
    fgm: 0,
    fgp: 0,
    three_m: 0,
    three_a: 0,
    three_p: 0,
    fta: 0,
    ftm: 0,
    ftp: 0,
    fouls: 0,
    to: 0,
    ast: 0,
    bl: 0,
    st: 0,
    rb: 0,
  };

  team.players.forEach((player) => {
    stats.score += player.points;
    stats.fga += player.fga;
    stats.fgm += player.fgm;
    stats.fgp = Math.round((stats.fgm / stats.fga) * 100);
    stats.three_a += player.three_a;
    stats.three_m += player.three_m;
    stats.three_p = Math.round((stats.three_m / stats.three_a) * 100);
    stats.fta += player.fta;
    stats.ftm += player.ftm;
    stats.ftp = Math.round((stats.ftm / stats.fta) * 100);
    stats.fouls += player.fouls;
    stats.to += player.to;
    stats.ast += player.assists;
    stats.bl += player.blocks;
    stats.st += player.steals;
    stats.rb += player.rebounds;
  });

  return stats;
}
