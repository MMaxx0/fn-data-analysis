/**
 * Base person information shared between cast and crew in movie credits
 */
interface BaseMovieCredit {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
}

/**
 * Cast member in a movie's credits
 */
export interface MovieCastMember extends BaseMovieCredit {
  cast_id: number;
  character: string;
  order: number;
  relatedMovie?: string;
}

/**
 * Crew member in a movie's credits
 */
export interface MovieCrewMember extends BaseMovieCredit {
  department: string;
  job: string;
}

/**
 * Response from /movie/{movie_id}/credits endpoint
 */
export interface MovieCredits {
  id: number;
  cast: MovieCastMember[];
  crew: MovieCrewMember[];
}
