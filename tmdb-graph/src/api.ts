import axios from "axios";
import { queryOptions, keepPreviousData } from "@tanstack/react-query";
import type { MovieCredits } from "@/types/movies";
import type { ActorDetails, ActorMovieCredits } from "@/types/persons";

const tmdbClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    Accept: "application/json",
  },
});

export class tmdb {
  static async getActorMovieCredits(actorId: number | string) {
    const response = await tmdbClient.get<ActorMovieCredits>(
      `/person/${actorId}/movie_credits`
    );
    return response.data.cast;
  }

  private static getMovieCredits(movieId: number | string) {
    return tmdbClient.get<MovieCredits>(`/movie/${movieId}/credits`);
  }

  static async getMovieCast(movieId: number | string) {
    const response = await this.getMovieCredits(movieId);
    return response.data.cast;
  }

  static async getActorDetails(actorId: number | string) {
    const response = await tmdbClient.get<ActorDetails>(`/person/${actorId}`);
    return response.data;
  }
}

export const actorQueries = {
  all: () => ["actors"],
  details: () => [...actorQueries.all(), "details"],
  detail: (actorId: number | string) =>
    queryOptions({
      queryKey: [...actorQueries.details(), actorId],
      queryFn: () => tmdb.getActorDetails(actorId),
      enabled: !!actorId,
      placeholderData: keepPreviousData,
    }),
};
