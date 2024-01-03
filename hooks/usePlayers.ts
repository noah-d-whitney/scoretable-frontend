import { useState } from 'react';

export default function usePlayers() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    return {
        getPlayers,
        error,
        loading,
    };
}
