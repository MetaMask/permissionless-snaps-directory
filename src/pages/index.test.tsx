import { describe } from '@jest/globals';
import { useStaticQuery } from 'gatsby';

import IndexPage, { Head } from '.';
import { useDispatch } from '../hooks';
import { render, getMock, getMockSiteMetadata } from '../utils/test-utils';

jest.mock('../hooks');

describe('Index page', () => {
  let mockUseDispatch: jest.Mock;
  const mockDispatch = jest.fn();
  beforeEach(() => {
    mockUseDispatch = useDispatch as jest.Mock;
    mockUseDispatch.mockClear();
    mockUseDispatch.mockReturnValue(mockDispatch);
  });

  it('renders', async () => {
    mockDispatch.mockImplementationOnce(async () =>
      Promise.resolve({
        type: 'fulfilled',
      }),
    );
    mockDispatch.mockImplementationOnce(async () =>
      Promise.resolve({
        type: 'fulfilled',
      }),
    );
    const mock = getMock(useStaticQuery);
    mock.mockReturnValue({
      fusejs: {},
    });

    const { queryByText } = render(
      <IndexPage data={{ allSnap: { nodes: [] } }} />,
    );

    expect(queryByText('Most Popular')).toBeInTheDocument();
  });

  it('renders when fetchAuditors fails', async () => {
    mockDispatch.mockImplementationOnce(async () =>
      Promise.resolve({
        type: 'fulfilled',
      }),
    );
    mockDispatch.mockImplementationOnce(async () =>
      Promise.reject(new Error('Unknown error')),
    );

    const mock = getMock(useStaticQuery);
    mock.mockReturnValue({
      fusejs: {},
    });

    const { queryByText } = render(
      <IndexPage data={{ allSnap: { nodes: [] } }} />,
    );

    expect(queryByText('Most Popular')).toBeInTheDocument();
  });

  describe('Head', () => {
    it('has the correct title', () => {
      const { queryByText } = render(<Head data={getMockSiteMetadata()} />);
      expect(queryByText('MetaMask Snaps Directory')).toBeInTheDocument();
    });
  });
});
