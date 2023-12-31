import { Button } from '@mantine/core';
import Link from 'next/link';

export default function PlayersView() {
    return <Button href="/player/create" component={Link}>Create
        Player
           </Button>;
}
