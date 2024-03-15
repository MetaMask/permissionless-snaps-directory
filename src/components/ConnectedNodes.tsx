/* eslint-disable */
import Jazzicon from '@metamask/jazzicon';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: number;
  isMain: boolean;
  location: number;
}

type NodeInput = {
  id: string;
  group: number;
  isMain: boolean;
};

interface Link extends d3.SimulationLinkDatum<Node> {}

export type ConnectedNodesProps = {
  nodes: NodeInput[];
  links: Link[];
};

export const ConnectedNodes: React.FC<{ data: ConnectedNodesProps }> = ({
  data,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const width = 1248;
    const height = 507;

    const links: Link[] = data.links.map((link) => ({ ...link }));
    const nodes: Node[] = data.nodes.map((node) => ({ ...node, location: 0 }));

    const mainNodeIndex = nodes.findIndex((node) => node.isMain);
    const mainNode = nodes[mainNodeIndex];

    const offsetMapX: Record<number, number> = {
      1: -380,
      2: 353,
      11: -540,
      12: -126,
      21: 246,
      22: 454,
      23: 246,
      24: 454,
    };

    const offsetMapY: Record<number, number> = {
      1: -45,
      2: -96,
      11: -288,
      12: -207,
      21: -255,
      22: -255,
      23: -255,
      24: -255,
    };

    for (let i = 2; i <= 3; i++) {
      const groupNodes = nodes.filter((groupNode) => groupNode.group === i);
      groupNodes.forEach((groupNode, index) => {
        const parentNodeId = links.find(
          (link) => link.target === groupNode.id,
        )?.source;
        const parentNode = nodes.find(
          (node) => node.id === parentNodeId,
        ) as Node;
        if (parentNode) {
          groupNode.location = parentNode.location * 10 + index + 1;
        }
      });
    }

    const getX = (node: Node) => {
      const offset = offsetMapX[node.location] || 0;
      return (mainNode.x as number) + offset;
    };

    const getY = (node: { location: number }) => {
      const offset = offsetMapY[node.location] || 0;
      return mainNode.y + offset;
    };

    const simulation = d3.forceSimulation(nodes).force(
      'link',
      d3.forceLink(links).id((node: any) => node.id),
    );

    simulation.nodes(nodes).alpha(1).restart();

    const svg = d3
      .select(svgRef.current)
      .attr('width', '100%')
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height + 100, width, height]);

    createLinks();

    createGlowObject();

    const jazzicons = createJazzicons();

    applyGlowToJazzions();

    convertJazziconsToCircle();

    return () => {
      simulation.stop();
    };

    function convertJazziconsToCircle() {
      jazzicons.each(function (node) {
        const size = node.isMain ? 70 : 35;
        const addr = node.id.trim().substring(19, 27);
        const seed = parseInt(addr, 16);
        const jazziconElement = Jazzicon(size, seed);

        // Access the inner SVG element
        const jazziconSvg = jazziconElement.querySelector('svg');

        const rect = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'rect',
        );
        rect.setAttribute('x', `${node.isMain ? '-50' : '-25'}`);
        rect.setAttribute('y', `${node.isMain ? '-50' : '-25'}`);
        rect.setAttribute('width', '200%');
        rect.setAttribute('height', '200%');
        rect.setAttribute('fill', jazziconElement.style.background);

        const mask = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'mask',
        );
        mask.setAttribute('id', `circleMask${node.index}`);

        const circle = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'circle',
        );
        const circleRadius = node.isMain ? '48' : '24';
        circle.setAttribute('cx', '0');
        circle.setAttribute('cy', '0');
        circle.setAttribute('r', circleRadius);
        circle.setAttribute('fill', 'white');

        jazziconSvg.insertBefore(rect, jazziconSvg.firstChild);
        mask.appendChild(circle);
        svg.append(() => mask);
        d3.select(jazziconSvg).attr('mask', `url(#circleMask${node.index})`);
        d3.select(this).node()?.appendChild(jazziconSvg);
      });
    }

    function applyGlowToJazzions() {
      jazzicons
        .append('circle')
        .data(nodes)
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 40) // Use the buffer radius
        .attr('opacity', 0) // Make the circle invisible
        .attr('data-testid', 'glow')
        .on('mouseover', function () {
          // Apply glow effect on mouseover
          d3.select(this.parentNode).style('filter', 'url(#glow)');
          utteranceRef.current = new SpeechSynthesisUtterance(
            `This user's address is ${this.parentNode.id}`,
          );
          window.speechSynthesis.speak(utteranceRef.current);
        })
        .on('mouseout', function () {
          // Remove the glow effect on mouseout
          d3.select(this.parentNode).style('filter', null);
          window.speechSynthesis.cancel();
        });
    }

    function createLinks() {
      const linkGeneratorInside = d3
        .linkHorizontal()
        .x((node: any) => getX(node))
        .y((node: any) => getY(node));

      const linkGeneratorOutside = d3
        .linkVertical()
        .x((node: any) => getX(node))
        .y((node: any) => getY(node));

      // Create a group for links and add it before jazzicons
      const linksGroup = svg.insert('g', '.jazzicon');

      linksGroup
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .selectAll('path')
        .data(links)
        .join('path')
        .attr('fill', 'none')
        .attr('stroke-width', (node: any) => Math.sqrt(node.value))
        .attr('d', (givenNode: any) => {
          const sourceNode = nodes.find(
            (node) => node.id === givenNode.source.id,
          );
          const targetNode = nodes.find(
            (node) => node.id === givenNode.target.id,
          );
          return givenNode.index % 2 === 0
            ? linkGeneratorInside({ source: sourceNode, target: targetNode })
            : linkGeneratorOutside({ source: sourceNode, target: targetNode });
        });
    }

    function createJazzicons() {
      return svg
        .selectAll('.jazzicon')
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', 'jazzicon')
        .attr(
          'transform',
          (node: any) =>
            `translate(${node.isMain ? node.x : getX(node)}, ${
              node.isMain ? node.y : getY(node)
            })`,
        )
        .attr('id', (node: any) => `${node.id})`)
        .attr('data-testid', 'jazzicon');
    }

    function createGlowObject() {
      const defs = svg.append('defs');
      const filter = defs.append('filter').attr('id', 'glow');
      filter
        .append('feGaussianBlur')
        .attr('stdDeviation', '10.5')
        .attr('result', 'coloredBlur');
      const feMerge = filter.append('feMerge');
      feMerge.append('feMergeNode').attr('in', 'coloredBlur');
      feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
    }
  }, [data]);

  return <svg ref={svgRef} />;
};
