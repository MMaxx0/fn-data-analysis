import { useEffect, useState } from "react";
import Graph from "graphology";
import Sigma from "sigma";
import nodes from "@/data/nodes.json";
import random from "graphology-layout/random";
import { NodeImageProgram } from "@sigma/node-image";
import type { SigmaNodeEventPayload } from "sigma/types";

// const nodes = nodess.slice(1400, 1500);

export function useGraph({
  containerRef,
  onNodeClick,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  onNodeClick?: (payload: SigmaNodeEventPayload) => void;
}) {
  const [graph, setGraph] = useState<Graph | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const graph = new Graph();

    const main = JSON.stringify(nodes[0]);

    graph.addNode(main, {
      label: "Ryan Gosling",
      size: 20,
      color: "gray",
      image: "/icon.avif",
      type: "image",
    });

    for (const node of nodes) {
      if (node.id === 30614) continue;

      graph.addNode(JSON.stringify(node), {
        label: node.name,
        size: 5,
        color: "#008cc2",
      });

      graph.addEdge(main, JSON.stringify(node), {
        color: "rgba(77, 41, 41, 0.1)",
        // label: node.relatedMovie || "",
        forceLabel: true,
      });
    }

    random.assign(graph, { scale: 100 });

    graph.setNodeAttribute(main, "x", 50);
    graph.setNodeAttribute(main, "y", 50);

    const renderer = new Sigma(graph, containerRef.current, {
      renderEdgeLabels: true,
      labelWeight: "bold",
      labelColor: {
        color: "black",
      },
      edgeLabelColor: {
        color: "black",
      },
      nodeProgramClasses: {
        image: NodeImageProgram,
      },
    });

    if (onNodeClick) {
      renderer.on("clickNode", onNodeClick);
    }

    setGraph(graph);

    return () => {
      renderer.kill();
    };
  }, []);

  return { graph };
}
