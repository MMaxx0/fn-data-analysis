import { tmdb } from "@/api";
import type { MovieCastMember } from "@/types/movies";
// @ts-ignore
import fs from "node:fs";

const actorsIds = new Set<number>();
const nodes: MovieCastMember[] = [];

const actorId = import.meta.env.VITE_TMDB_ACTOR_ID;
const actorCredits = await tmdb.getActorMovieCredits(actorId);

for (const movie of actorCredits) {
  const cast = await tmdb.getMovieCast(movie.id);

  for (const actor of cast) {
    if (!actorsIds.has(actor.id)) {
      actor.relatedMovie = movie.original_title;
      nodes.push(actor);
      actorsIds.add(actor.id);
    }
    actorsIds.add(actor.id);
  }
}

fs.writeFileSync("src/data/nodes.json", JSON.stringify(nodes));
