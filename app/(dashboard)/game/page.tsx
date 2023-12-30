import Link from 'next/link';
import { Button } from '@mantine/core';

export default function GamesView() {
    return <Button component={Link} href="/game/create">Create Game</Button>;
}
