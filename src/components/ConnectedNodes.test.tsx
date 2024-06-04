import { act, screen } from '@testing-library/react';

import { ConnectedNodes, type ConnectedNodesProps } from './ConnectedNodes';
import { render } from '../utils/test-utils';

jest.mock('.', () => ({
  ...jest.requireActual('.'),
  Tooltip: () => <div data-testid="tooltip" />,
}));

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
    const nodeElement = nodeElements[0] as any;

    act(() => {
      // eslint-disable-next-line no-restricted-globals
      nodeElement.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    });
    expect(nodeElement.parentElement).toHaveStyle('filter: url(#glow)');
    act(() => {
      // eslint-disable-next-line no-restricted-globals
      nodeElement.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
    });
    act(() => {
      // eslint-disable-next-line no-restricted-globals
      nodeElement.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
    });
    expect(nodeElement.parentElement).not.toHaveStyle('filter: url(#glow)');
  });

  it('redirects to the correct URL on node click', () => {
    render(<ConnectedNodes data={testData} />);
    const nodeElements = screen.getAllByTestId('jazzicon');
    expect(nodeElements).toHaveLength(3);
    const nodeElement = nodeElements[0] as any;

    act(() => {
      // eslint-disable-next-line no-restricted-globals
      nodeElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const expectedUrl = `http://localhost/`;
    // eslint-disable-next-line no-restricted-globals
    expect(window.location.href).toBe(expectedUrl);
  });
});
