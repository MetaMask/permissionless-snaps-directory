/* eslint-disable */
import Jazzicon from '@metamask/jazzicon';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: number;
  isMain?: boolean;
  address: string;
}

type Link = {
  source: string | number;
  target: string | number;
  value: number;
};

type ConnectedNodesProps = {
  nodes: Node[];
  links: Link[];
};

const ConnectedNodes: React.FC<{ data: ConnectedNodesProps }> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const width = 1248;
    const height = 507;

    const links = data.links.map((node) => ({ ...node }));
    const nodes: Node[] = data.nodes.map((node) => ({ ...node }));

    const mainNodeIndex = nodes.findIndex((node) => node.isMain);
    const mainNode = nodes[mainNodeIndex];

    const getRandomX = (node) => {
      switch (node.index) {
        case 1:
          return (mainNode.x as number) - 380;
        case 2:
          return (mainNode.x as number) + 353;
        case 3:
          return (mainNode.x as number) - 540;
        case 4:
          return (mainNode.x as number) - 126;
        case 5:
          return (mainNode.x as number) + 246;
        case 6:
          return (mainNode.x as number) + 454;
        default:
          return mainNode.x as number;
      }
    };

    const getRandomY = (node) => {
      switch (node.index) {
        case 1:
          return mainNode.y - 45;
        case 2:
          return mainNode.y - 96;
        case 3:
          return mainNode.y - 288;
        case 4:
          return mainNode.y - 207;
        case 5:
          return mainNode.y - 255;
        case 6:
          return mainNode.y - 255;
        default:
          return mainNode.y;
      }
    };

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((node: any) => node.id)
          .distance(200) // Minimum distance between nodes
          .strength(0.2), // Decrease strength to allow more flexible links
      )
      .force('charge', d3.forceManyBody()) // Add repulsion between nodes
      .force(
        'x',
        d3
          .forceX()
          .strength(0.05)
          .x(width / 2),
      ) // Center nodes horizontally at the center of SVG
      .force(
        'y',
        d3
          .forceY()
          .strength(0.05)
          .y(height / 3),
      ); // Center nodes vertically at the center of SVG

    simulation.nodes(nodes).alpha(1).restart();

    const svg = d3
      .select(svgRef.current)
      .attr('width', '100%')
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height + 100, width, height])
      .attr('style', 'max-width: 100%; height: auto;');

    const linkGeneratorInside = d3
      .linkHorizontal()
      .x((node: any) => getRandomX(node) ?? 0)
      .y((node: any) => getRandomY(node) ?? 0);

    const linkGeneratorOutside = d3
      .linkVertical()
      .x((node: any) => getRandomX(node) ?? 0)
      .y((node: any) => getRandomY(node) ?? 0);

    svg
      .append('g')
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

    // const node = svg
    //   .append('g')
    //   .attr('stroke', '#fff')
    //   .attr('stroke-width', 1.5)
    //   .selectAll<SVGCircleElement, Node>('circle')
    //   .data(nodes)
    //   .join('circle')
    //   .attr('r', (d: any) => (d.isMain ? 48 : 24)) // Larger radius for main node
    //   .attr('fill', (d: any) => color(d.group))
    //   .attr('cx', (d: any) => (d.isMain ? d.x : getRandomX(d))) // Set initial x position of nodes
    //   .attr('cy', (d: any) => (d.isMain ? d.y : getRandomY(d))); // Set initial y position of nodes

    // node.append('title').text((d: any) => d.id);

    const jazzicons = svg
      .selectAll('.jazzicon')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'jazzicon')
      .attr('fill', 'red')
      .attr(
        'transform',
        (node: any) =>
          `translate(${node.isMain ? node.x : getRandomX(node)}, ${
            node.isMain ? node.y : getRandomY(node)
          })`,
      );

    jazzicons.each(function (node) {
      const size = node.isMain ? 70 : 35;
      const addr = node.address.trim().slice(2, 10);
      const seed = parseInt(addr, 16);

      // const jazziconSvg = generateJazziconSVG({ seed, size });
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
      circle.setAttribute(
        'style',
        `background: rgb(${seed % 256}, ${seed % 128}, ${seed % 64})`,
      );
      circle.setAttribute('fill', 'white');

      jazziconSvg.insertBefore(rect, jazziconSvg.firstChild);
      mask.appendChild(circle);
      svg.append(() => mask);
      // svg.setAttribute('style', 'background: rgb(251, 24, 145)');

      // Apply the mask to the <svg> element
      d3.select(jazziconSvg).attr('mask', `url(#circleMask${node.index})`);

      // Append the modified SVG to the current 'g' element
      if (jazziconSvg !== null) {
        d3.select(this).node()?.appendChild(jazziconSvg);
      }
    });

    return () => {
      simulation.stop();
    };
  }, [data]);

  return <svg ref={svgRef} />;
};

export default ConnectedNodes;
