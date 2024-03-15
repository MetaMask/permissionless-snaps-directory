/* eslint-disable no-restricted-globals */
import { screen } from '@testing-library/react';

import { ConnectedNodes, type ConnectedNodesProps } from './ConnectedNodes';
import { render } from '../utils/test-utils';

describe('ConnectedNodes', () => {
  const testData: ConnectedNodesProps = {
    nodes: [
      { id: '1', group: 1, isMain: true },
      { id: '2', group: 2, isMain: false },
      { id: '3', group: 2, isMain: false },
    ],
    links: [
      { source: '1', target: '2' },
      { source: '1', target: '3' },
    ],
  };

  beforeEach(() => {
    // Mock the SpeechSynthesisUtterance and window.speechSynthesis objects
    window.speechSynthesis = {
      speak: jest.fn(),
      cancel: jest.fn(),
    } as any;
    window.SpeechSynthesisUtterance = jest.fn() as any;
  });

  it('renders correct number of nodes', () => {
    render(<ConnectedNodes data={testData} />);
    const nodes = screen.getAllByTestId('jazzicon');
    expect(nodes).toHaveLength(testData.nodes.length);
  });

  it('renders only nodes if link is missing', () => {
    const testDataWithoutLink = { nodes: testData.nodes, links: [] };
    render(<ConnectedNodes data={testDataWithoutLink} />);
    const nodes = screen.getAllByTestId('jazzicon');
    expect(nodes).toHaveLength(testDataWithoutLink.nodes.length);
  });

  it('applies and removes glow effect on mouseover and mouseout respectively', () => {
    render(<ConnectedNodes data={testData} />);
    const nodeElements = screen.getAllByTestId('glow');
    expect(nodeElements).toHaveLength(3);
    const nodeElement = nodeElements[0] as HTMLElement;
    nodeElement.dispatchEvent(new MouseEvent('mouseover'));
    expect(nodeElement.parentElement).toHaveStyle('filter: url(#glow)');
    nodeElement.dispatchEvent(new MouseEvent('mouseout'));
    expect(nodeElement.parentElement).not.toHaveStyle('filter: url(#glow)');
  });
});
