'use client';

import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Flex,
  Grid,
  LoadingOverlay,
  Switch,
  Table,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { ReactElement, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import {
  IconCaretUpDown,
  IconCheck,
  IconPlus,
  IconRowRemove,
  IconSwitch,
  IconX,
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import Link from 'next/link';
import LoadingSuspense from '@/components/Utility/LoadingSuspense';
import useTeams, { teamDto } from '@/hooks/useTeams';
import MultiSelectWidget from '@/app/(dashboard)/team/[pin]/MultiSelectWidget';
import { playerDto } from '@/hooks/usePlayers';

export default function TeamDetailView({ params }: { params: { pin: string } }) {
  const { pin } = params;
  const {
    getTeam,
    assignPlayers,
    unassignPlayer,
    toggleTeamActive,
    updating,
    loading,
    error,
  } = useTeams();
  const {
    assignLineup,
    error: assignLineupError,
    updating: assignLineupUpdating,
  } = useTeams();
  const [team, setTeam] = useState<teamDto | null>(null);
  const [assignPlayer, setAssignPlayer] = useState(false);
  const [reorderLineup, setReorderLineup] = useState(false);
  const [swapEls, setSwapEls] = useState<playerDto[]>([]);

  useEffect(() => {
    if (swapEls.length === 2) {
      const t = team!;

      const player1Idx = t.players.findIndex(p => p.pin === swapEls[0].pin);
      const player2Idx = t.players.findIndex(p => p.pin === swapEls[1].pin);
      const player1Num = swapEls[0].lineup_pos;
      const player2Num = swapEls[1].lineup_pos;
      t.players[player2Idx].lineup_pos = player1Num;
      t.players[player1Idx].lineup_pos = player2Num;
      t.players.sort((a, b) => a.lineup_pos! - b.lineup_pos!);
      assignLineup(t.pin, t.players.filter(p => p.lineup_pos)
        .map(p => p.pin))
        .then(res => setTeam(res));
      setSwapEls([]);
      setTeam(t);
    }
  }, [swapEls]);

  function toggleSwapEl(pl: playerDto) {
    setSwapEls((cur) => cur.includes(pl) ? cur.filter(p => p.pin !== pl.pin) : [...cur, pl]);
  }

  useEffect(() => {
    getTeam(pin)
      .then(t => setTeam(t))
      .catch(e => {
        if (e.response.status === 404) {
          // TODO make 404 work
          notFound();
        }
      });
  }, [pin]);

  function handleToggleTeamActive() {
    toggleTeamActive(team!.pin, !team!.is_active)
      .then(res => setTeam(res));
  }

  function handleAddToTeam(teamPin: string, playerPins: string[]) {
    notifications.show({
      id: `add-player-to-team-${teamPin}`,
      title: 'Adding Player(s) to Team',
      loading: true,
      message: 'Selected players are being added to team',
      withBorder: true,
      radius: 'md',
      color: 'orange',
    });

    assignPlayers(teamPin, playerPins)
      .then(res => {
        setTeam(res);
        notifications.update({
          id: `add-player-to-team-${teamPin}`,
          title: 'Player(s) Added to Team',
          loading: false,
          message: 'Selected players successfully added to team',
          withBorder: true,
          radius: 'md',
          color: 'green',
          icon: <IconCheck size={16} />,
          autoClose: 4000,
        });
      })
      .catch((e) => {
        notifications.update({
          id: `add-player-to-team-${teamPin}`,
          title: 'Something Went Wrong',
          loading: false,
          message: `Could not add selected players to team: ${e}`,
          withBorder: true,
          radius: 'md',
          color: 'red',
          icon: <IconX size={16} />,
          autoClose: 4000,
        });
      });
  }

  function handleAddToLineup(t: teamDto, p: playerDto) {
    const lineup: string[] = [];
    t.players.forEach(pl => {
      if (pl.lineup_pos) lineup.push(pl.pin);
    });
    lineup.push(p.pin);

    notifications.show({
      id: `add-player-to-lineup-${p.pin}`,
      title: 'Adding Player to Lineup',
      loading: true,
      message: `${p.first_name} ${p.last_name} is being added to ${t.name}`,
      withBorder: true,
      radius: 'md',
      color: 'orange',
    });

    assignLineup(t.pin, lineup)
      .then(res => {
        setTeam(res);
        notifications.update({
          id: `add-player-to-lineup-${p.pin}`,
          title: 'Player Added to Lineup',
          loading: false,
          message: `${p.first_name} ${p.last_name} successfully added to ${t.name}`,
          withBorder: true,
          radius: 'md',
          color: 'green',
          icon: <IconCheck size={16} />,
          autoClose: 4000,
        });
      })
      .catch(() => {
        notifications.update({
          id: `add-player-to-lineup-${p.pin}`,
          title: 'Something Went Wrong',
          loading: false,
          message: `Could not add ${p.first_name} ${p.last_name} to ${t.name}: ${assignLineupError}`,
          withBorder: true,
          radius: 'md',
          color: 'red',
          icon: <IconX size={16} />,
          autoClose: 4000,
        });
      });
  }

  function handleRemoveFromLineup(t: teamDto, p: playerDto) {
    const lineup = t.players.filter(pl => pl.pin !== p.pin && pl.lineup_pos)
      .map(pl => pl.pin);

    notifications.show({
      id: `remove-player-from-lineup-${p.pin}`,
      title: 'Removing Player from Lineup',
      loading: true,
      message: `${p.first_name} ${p.last_name} is being removed from ${t.name}'s lineup`,
      withBorder: true,
      radius: 'md',
      color: 'orange',
    });

    assignLineup(t.pin, lineup)
      .then(res => {
        setTeam(res);
        notifications.update({
          id: `remove-player-from-lineup-${p.pin}`,
          title: 'Player Removed from Lineup',
          loading: false,
          message: `${p.first_name} ${p.last_name} successfully removed from ${t.name}'s lineup`,
          withBorder: true,
          radius: 'md',
          color: 'green',
          icon: <IconCheck size={16} />,
          autoClose: 4000,
        });
      })
      .catch(() => {
        notifications.update({
          id: `remove-player-from-lineup-${p.pin}`,
          title: 'Something Went Wrong',
          loading: false,
          message: `Could not remove ${p.first_name} ${p.last_name} from ${t.name}'s lineup: ${error}`,
          withBorder: true,
          radius: 'md',
          color: 'red',
          icon: <IconX size={16} />,
          autoClose: 4000,
        });
      });
  }

  function handleRemoveFromTeam(t: teamDto, p: playerDto) {
    notifications.show({
      id: `remove-player-from-team-${p.pin}`,
      title: 'Removing Player from Team',
      loading: true,
      message: `${p.first_name} ${p.last_name} is being removed from ${t.name}`,
      withBorder: true,
      radius: 'md',
      color: 'orange',
    });

    unassignPlayer(t.pin, p.pin)
      .then(res => {
        setTeam(res);
        notifications.update({
          id: `remove-player-from-team-${p.pin}`,
          title: 'Player Removed from Team',
          loading: false,
          message: `${p.first_name} ${p.last_name} successfully removed from ${t.name}`,
          withBorder: true,
          radius: 'md',
          color: 'green',
          icon: <IconCheck size={16} />,
          autoClose: 4000,
        });
      })
      .catch(() => {
        notifications.update({
          id: `remove-player-from-team-${p.pin}`,
          title: 'Something Went Wrong',
          loading: false,
          message: `Could not remove ${p.first_name} ${p.last_name} from ${t.name}: ${assignLineupError}`,
          withBorder: true,
          radius: 'md',
          color: 'red',
          icon: <IconX size={16} />,
          autoClose: 4000,
        });
      });
  }

  function generatePlayerCard(t: teamDto, reorder: boolean): ReactElement {
    const playerRows = t.players.map(p =>
      <Table.Tr>
        <Table.Td width={30}>
          {p.lineup_pos ?
            <Text
              size="lg"
              fw={700}
            >{p.lineup_pos}
            </Text> :
            <ActionIcon
              variant="light"
              size="sm"
              radius="xl"
              mt={7}
              ml={-5}
              onClick={() => handleAddToLineup(t, p)}
            ><IconPlus size={14} />
            </ActionIcon>}
        </Table.Td>
        <Table.Td
          width={50}
          opacity={p.lineup_pos ? 1 : 0.5}
        >
          <Avatar
            size="md"
          >{p.first_name.slice(0, 1) + p.last_name.slice(0, 1)}
          </Avatar>
        </Table.Td>
        <Table.Td
          width={45}
          opacity={p.lineup_pos ? 1 : 0.5}
        >
          <Badge
            variant="light"
            color="orange"
          >
            {p.number}
          </Badge>
        </Table.Td>
        <Table.Td opacity={p.lineup_pos ? 1 : 0.5}>
          <Text size="md" component={Link} href={`/player/${p.pin}`}>
            {`${p.first_name} ${p.last_name}`}
          </Text>
        </Table.Td>
        <Table.Td width={50}>
          <Flex gap={5}>
            <Tooltip
              label={'Remove player' +
                ' from lineup'}
              openDelay={750}
              disabled={!p.lineup_pos}
            >
              <ActionIcon
                variant="transparent"
                color="gray"
                onClick={() => handleRemoveFromLineup(t, p)}
                disabled={!p.lineup_pos}
              >
                <IconRowRemove size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip
              label={'Remove player' +
                ' from team'}
              openDelay={750}
            >
              <ActionIcon
                variant="light"
                color="red"
                onClick={() => handleRemoveFromTeam(t, p)}
              >
                <IconX size={16} />
              </ActionIcon>
            </Tooltip>
          </Flex>
        </Table.Td>
      </Table.Tr>
    );

    const playerRowsReorder = t.players.map(p =>
      <Table.Tr>
        <Table.Td width={30}>
          {p.lineup_pos ?
            <Text
              size="lg"
              fw={700}
            >{p.lineup_pos}
            </Text> :
            <ActionIcon
              variant="light"
              size="sm"
              radius="xl"
              disabled
              mt={7}
              ml={-5}
              onClick={() => handleAddToLineup(t, p)}
            ><IconPlus size={14} />
            </ActionIcon>}
        </Table.Td>
        <Table.Td
          width={50}
          opacity={p.lineup_pos ? 1 : 0.5}
        >
          <Avatar
            size="md"
          >{p.first_name.slice(0, 1) + p.last_name.slice(0, 1)}
          </Avatar>
        </Table.Td>
        <Table.Td
          width={45}
          opacity={p.lineup_pos ? 1 : 0.5}
        >
          <Badge
            variant="light"
            color="orange"
          >
            {p.number}
          </Badge>
        </Table.Td>
        <Table.Td opacity={p.lineup_pos ? 1 : 0.5}>
          <Text size="md">
            {`${p.first_name} ${p.last_name}`}
          </Text>
        </Table.Td>
        <Table.Td width={50}>
          {p.lineup_pos ?
            <Checkbox
              size="md"
              checked={swapEls.includes(p)}
              onChange={() => toggleSwapEl(p)}
              icon={IconSwitch}
              variant="outline"
            /> : null}
        </Table.Td>
      </Table.Tr>
    );

    if (t.players.length > 0) {
      return <Flex
        direction="column"
        gap="xs"
        my="xl"
      >
        <Title order={3} fw="normal">Players</Title>
        <Button.Group>
          <Button
            variant="default"
            size="sm"
            leftSection={<IconPlus size={14} />}
            onClick={() => setAssignPlayer(true)}
            loading={assignPlayer}
          >Assign Player
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => setReorderLineup(true)}
            leftSection={<IconCaretUpDown size={14} />}
            loading={reorderLineup}
          >Reorder Lineup
          </Button>
        </Button.Group>
        <MultiSelectWidget
          callbackFn={(pins) => {
            handleAddToTeam(t.pin, pins);
          }}
          cancelFn={() => setAssignPlayer(false)}
          show={assignPlayer}
          loading={loading}
          team={team!}
        />
        <Card
          withBorder
          shadow="md"
          radius="md"
          px="lg"
          py="xs"
        >
          <LoadingOverlay
            visible={assignLineupUpdating}
            zIndex={1000}
            overlayProps={{
              radius: 'sm',
              blur: 2,
            }}
          />
          <Table
            verticalSpacing="sm"
          >
            <Table.Tbody>
              {reorder ? playerRowsReorder : playerRows}
            </Table.Tbody>
          </Table>
          {reorder ?
            <Flex align="center" justify="center" gap="sm" mt="sm">
              <Button
                onClick={() => {
                  setReorderLineup(false);
                }}
                variant="light"
                loading={assignLineupUpdating}
              >Done
              </Button>
            </Flex> : null}
        </Card>
      </Flex>;
    }

    return <Card>
      No Players
    </Card>;
  }

  function generateSettingsSection() {
    return <Flex
      direction="column"
      gap="xs"
      my="xl"
    >
      <Title order={3} fw="normal">Settings</Title>
      <Grid gutter="xs">
        <Grid.Col span={4}>
          <Card
            withBorder
            shadow="md"
            radius="md"
            px="lg"
            py="xs"
          >
            <Title order={4} my="sm">Active</Title>
            <Text size="sm" c="dimmed">Controls whether this team is
              active. An
              inactive
              team cannot be assigned to games or have players
              assigned to it.
            </Text>
            <Switch
              size="sm"
              radius="md"
              my="md"
              color="green"
              onChange={handleToggleTeamActive}
              checked={team?.is_active}
              disabled={updating}
            />
          </Card>
        </Grid.Col>
      </Grid>
    </Flex>;
  }

  function render(): ReactElement {
    if (team) {
      return (<>
        <Flex
          justify="space-between"
          align="center"
        >
          <Title order={1}>{team.name}</Title>
          <Badge
            size="xl"
            variant="light"
            radius="md"
          >{team.pin.toUpperCase()}
          </Badge>
        </Flex>
        <Flex
          gap="sm"
          my="md"
        >
          <Badge
            size="lg"
            color={team.is_active ? 'green' : 'red'}
            variant="dot"
          >{team.is_active ? 'active' : 'inactive'}
          </Badge>
          <Badge
            size="lg"
            variant="default"
            rightSection={team.size}
          >Size
          </Badge>
        </Flex>
        {generatePlayerCard(team, reorderLineup)}
        {generateSettingsSection()}
      </>);
    }

    return <></>;
  }

  return <LoadingSuspense
    loading={loading}
    loadingText="Team loading, please wait..."
  >
    {render()}
  </LoadingSuspense>;
}
