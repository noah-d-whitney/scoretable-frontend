'use client';

import { Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { TeamSummaryDTO } from '@/app/api/types';
import LoadingSuspense from '@/components/Utility/LoadingSuspense';

export default function TeamDetailView({ params }: { params: { id: string } }) {
    const { id } = params;
    const [loading, setLoading] = useState<boolean>(true);
    const [team, setTeam] = useState<TeamSummaryDTO | null>(null);
    const { push } = useRouter();

    async function fetchTeam() {
        try {
            setLoading(true);
            const fetchedTeam = await axios.get(`../api/team/${id}`);
            setTeam(fetchedTeam.data);
            setLoading(false);
        } catch (e: any) {
            notifications.show({
                title: 'Error',
                message: `Team with ID ${id} could not be found`,
                autoClose: 5000,
                color: 'red',
                radius: 'md',
                withBorder: true,
            });
            push('/team');
        }
    }

    useEffect(() => {
        fetchTeam();
    }, []);

    return <LoadingSuspense
      loading={loading}
      loadingText="Team loading, please wait..."
    >
        {team
            ? <Title order={1}>
                {team.name}
              </Title>
            : null}
           </LoadingSuspense>;
}
