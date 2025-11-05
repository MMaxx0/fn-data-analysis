import { useState } from "react";
import { ActorWidget } from "@/components/ActorWidget";
import type { MovieCastMember } from "@/types/movies";
import { useRef } from "react";
import { useGraph } from "@/hooks/useGraph";

export default function App() {
  const [selectedActorNode, setSelectedActorNode] =
    useState<MovieCastMember | null>(null);
  const graphContainerRef = useRef<HTMLDivElement>(null);

  const { graph } = useGraph({
    containerRef: graphContainerRef,
    onNodeClick: (payload) => handleActorNodeClick(payload.node),
  });

  function handleActorNodeClick(node: string) {
    setSelectedActorNode(JSON.parse(node));
  }

  return (
    <>
      <div ref={graphContainerRef} className="absolute h-screen w-screen z-2" />
      <div id="overlay" className="p-10 w-fit relative z-3">
        <ActorWidget actorNode={selectedActorNode} collaboratorsNumber={graph?.size}/>
      </div>
    </>
  );
}
