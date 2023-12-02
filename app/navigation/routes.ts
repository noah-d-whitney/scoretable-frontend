import {
  Icon,
  IconBallBasketball,
  IconHome,
  IconTournament,
  IconUser,
  IconUsersGroup,
} from '@tabler/icons-react';

type Route = {
  path: string;
  label: string;
  icon: Icon;
  isAction: boolean;
};

const Routes: Route[] = [
  { path: '/home', label: 'Home', icon: IconHome, isAction: false },
  { path: '/game', label: 'Games', icon: IconBallBasketball, isAction: false },
  { path: '/tournament', label: 'Tournaments', icon: IconTournament, isAction: false },
  { path: '/league', label: 'Leagues', icon: IconUsersGroup, isAction: false },
  { path: '/player', label: 'Players', icon: IconUser, isAction: false },
];

export default Routes;
