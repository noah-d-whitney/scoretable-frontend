import { scoreTableApiV1 } from "@/app/api/scoreTableApiV1";
import { useState } from "react";
import { metadata } from "./usePlayers";
import { teamDto } from "./useTeams";
import { DateValue } from "@mantine/dates";

export type gameType = "timed" | "target"
enum gameStatus {
    NOTSTARTED = 0,
    INPROGRESS,
    FINISHED,
    CANCELED,
}

export type gamesFilter = {
    sort?: string | null,
    page?: number | null,
    pageSize?: number | null
    beforeDate?: string | null,
    afterDate?: string | null,
    playerPins?: string[] | null,
    teamPins?: string[] | null,
    type?: gameType | null,
    teamSize?: number | null,
    status?: gameStatus | null,
}

export type gameDto = {
    pin_id: string
    status: gameStatus
    date_time: Date
    team_size: number
    type: gameType
    period_length: string | null
    period_count: number | null
    score_target: number | null
    home_team_pin: string | null
    away_team_pin: string | null
    teams: {
        home: teamDto | null
        away: teamDto | null
    } | null
}

export type gamesMetadata = {
    pag: metadata
    date_range: {
        after_date: DateValue
        before_date: DateValue
    } | null
    team_pins: string[] | null
    player_pins: string[] | null
    type: gameType | null
    team_size: number[] | null
    status: gameStatus | null
    includes: string[] | null
}

export default function useGames() {
    const [error, setError] = useState("");
    const [fetching, setFetching] = useState(true);

    async function getAllGames(filters: gamesFilter): Promise<{
        games: gameDto[],
        metadata: gamesMetadata,
    }> {
        try {
            setFetching(true);
            const res = await scoreTableApiV1.get<{
                games: gameDto[],
                metadata: gamesMetadata,
            }>("/game"
                + `?page=${filters.page || 1}`
                + `&page_size=${filters.pageSize || 10}`
                + (filters.sort ? `&sort=${filters.sort}` : "")
                + (filters.afterDate ? `&after_date=${filters.afterDate}` : "")
                + (filters.beforeDate ? `&before_date=${filters.beforeDate}` : "")
                + (filters.status ? `&status=${filters.status}` : "")
                + (filters.type ? `&type=${filters.type}` : "")
                + (filters.teamSize ? `&team_size=${filters.teamSize}` : "")
                + (filters.playerPins ? `&player_pins=${filters.playerPins}` : "")
                + (filters.teamPins ? `&team_pins=${filters.teamPins}` : "")
            );

            return res.data;
        } catch (e: any) {
            setError(e.response.data.error);
            return Promise.reject(e);
        } finally {
            setFetching(false);
        }
    }

    return {
        getAllGames,
        fetching,
        error,
    }
}