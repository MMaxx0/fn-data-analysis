/**
 * Base movie information shared between cast and crew entries
 */
interface BaseActorMovieCredit {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credit_id: string;
}

/**
 * Cast member entry in actor's movie credits
 */
export interface CastMovieCredit extends BaseActorMovieCredit {
  character: string;
  order: number;
}

/**
 * Crew member entry in actor's movie credits
 */
export interface CrewMovieCredit extends BaseActorMovieCredit {
  department: string;
  job: string;
}

/**
 * Response from /person/{person_id}/movie_credits endpoint
 */
export interface ActorMovieCredits {
  cast: CastMovieCredit[];
  crew: CrewMovieCredit[];
  id: number;
}

/**
 * Response from /person/{person_id} endpoint
 */
export interface ActorDetails {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
}
