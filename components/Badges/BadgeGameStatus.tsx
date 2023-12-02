import { Badge, BadgeProps } from '@mantine/core';
import { GameStatus } from '@/app/api/types';

type BadgeGameStatusProps = {
  status: GameStatus;
};

export default function BadgeGameStatus(props: BadgeGameStatusProps & BadgeProps) {
  const { status, ...badgeProps } = props;
  let badgeColor;
  let badgeLabel;
  switch (status) {
    case 'not-started':
      badgeColor = 'gray';
      badgeLabel = 'Not Started';
      break;
    case 'in-progress':
      badgeColor = 'green';
      badgeLabel = 'In Progress';

      break;
    case 'finished':
      badgeColor = 'blue';
      badgeLabel = 'Finished';

      break;
    case 'canceled':
      badgeColor = 'red';
      badgeLabel = 'Canceled';

      break;
  }
  return (
    <Badge {...badgeProps} color={badgeColor}>
      {badgeLabel}
    </Badge>
  );
}
