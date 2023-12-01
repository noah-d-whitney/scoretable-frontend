import { Icon, IconBallBasketball, IconHome } from '@tabler/icons-react';

type Route = {
  path: string;
  label: string;
  icon: Icon;
  isAction: boolean;
};

const Routes: Route[] = [
  { path: '/home', label: 'Home', icon: IconHome, isAction: false },
  { path: '/game', label: 'Games', icon: IconBallBasketball, isAction: false },
  { path: '/tournament', label: 'Tournaments', icon: IconBallBasketball, isAction: false },
  { path: '/league', label: 'Leagues', icon: IconBallBasketball, isAction: false },
  { path: '/player', label: 'Players', icon: IconBallBasketball, isAction: false },
];

export default Routes;
