import { useQuery } from "@tanstack/react-query";
import { actorQueries } from "@/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { BedIcon } from "lucide-react";
import type { MovieCastMember } from "@/types/movies";

export function ActorWidget({
  actorNode,
  collaboratorsNumber,
}: {
  actorNode: MovieCastMember | null;
  collaboratorsNumber: number | undefined;
}) {
  const {
    data: actor,
    isFetching,
    isRefetching,
  } = useQuery(actorQueries.detail(actorNode?.id ?? ""));
  const mainActorId = Number(import.meta.env.VITE_TMDB_ACTOR_ID);

  if (!actor) {
    return (
      <Card className="z-100 w-100">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BedIcon />
            </EmptyMedia>
            <EmptyTitle className="flex gap-1 items-center">
              No actor selected {isFetching && <Spinner />}
            </EmptyTitle>
            <EmptyDescription>
              You haven't selected any actors yet. Get started by selecting a
              node from the graph.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Card>
    );
  }

  return (
    <Card className="z-100 w-100 max-h-[calc(100vh-80px)] overflow-y-auto">
      <CardHeader>
        <CardTitle className="flex gap-2 text-xl items-center">
          {actor.name} {isRefetching && <Spinner />}
        </CardTitle>
        {actor.known_for_department && (
          <CardDescription>
            Known for: {actor.known_for_department}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {actor.profile_path && (
          <img
            src={`https://image.tmdb.org/t/p/w154/${actor.profile_path}`}
            className="self-center rounded-lg w-[154px] h-[231px] bg-gray-400"
          />
        )}
        {actor.biography ? (
          <div className="flex flex-col gap-1">
            <div className="font-bold">Biography</div>
            <p className="max-h-50 overflow-y-auto">{actor.biography}</p>
          </div>
        ) : (
          <p>No biography available</p>
        )}
        {actor.place_of_birth && (
          <p>
            <span className="font-bold">Place of birth:</span>{" "}
            {actor.place_of_birth}
          </p>
        )}
        {actor.birthday && (
          <p>
            <span className="font-bold">Birthday:</span> {actor.birthday}
          </p>
        )}
        {actor.deathday && (
          <p>
            <span className="font-bold">Date of death:</span> {actor.deathday}
          </p>
        )}
        {actor.also_known_as.length > 0 && (
          <div className="flex flex-col gap-1">
            <div className="font-bold">Also known as</div>
            <ul className="list-disc list-inside">
              {actor.also_known_as.map((alias) => (
                <li key={alias}>{alias}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      {actorNode?.relatedMovie && (
        <CardFooter className="text-sm">
          {actor.id !== mainActorId && (
            <p>
              Acted with main actor in:{" "}
              <span className="font-medium">{actorNode.relatedMovie}</span>
            </p>
          )}
          {actor.id === mainActorId && collaboratorsNumber !== undefined && (
            <p>
              Number of collaborators in this graph:{" "}
              <span className="font-medium">{collaboratorsNumber - 1}</span>
            </p>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
