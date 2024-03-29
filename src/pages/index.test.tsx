import { describe } from '@jest/globals';

import IndexPage from '.';
import { useDispatch } from '../hooks';
import { getMockPageContext, render } from '../utils/test-utils';

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

    const { queryByText } = render(
      <IndexPage
        pageContext={getMockPageContext()}
        data={{ allSnap: { nodes: [] } }}
      />,
    );

    expect(queryByText('Most Popular')).toBeInTheDocument();
  });
});
