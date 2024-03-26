import { act, fireEvent } from '@testing-library/react';
import Fuse from 'fuse.js';
import { useStaticQuery } from 'gatsby';
import { getEnsAddress } from 'viem/actions';
import { useEnsName } from 'wagmi';

import { FilterSearch } from './FilterSearch';
import { createStore } from '../../../store';
import { trimAddress } from '../../../utils';
import {
  getMock,
  getMockSnap,
  render,
  VALID_ACCOUNT_1,
} from '../../../utils/test-utils';
import type { Snap } from '../../snaps';
import { getSearchQuery } from '../store';

jest.mock('wagmi', () => ({
  ...jest.requireActual('wagmi'),
  useEnsName: jest.fn(),
}));

jest.mock('viem/actions', () => ({
  ...jest.requireActual('viem/actions'),
  getEnsAddress: jest.fn(),
}));

describe('FilterSearch', () => {
  it('renders', () => {
    const { getByPlaceholderText } = render(<FilterSearch />);

    expect(getByPlaceholderText('Search users or snaps')).toBeInTheDocument();
  });

  it('renders a menu with the Snaps search results', async () => {
    const fooSnap = getMockSnap({ snapId: 'foo-snap', name: 'foo-snap' }).snap;
    const barSnap = getMockSnap({ snapId: 'bar-snap', name: 'bar-snap' }).snap;

    const data = [fooSnap, barSnap];
    const fuse = new Fuse(data, {
      keys: ['snapId'],
    });

    const index = JSON.stringify(fuse.getIndex());

    const mock = getMock(useStaticQuery);
    mock.mockReturnValue({
      fusejs: {
        index,
        data,
      },
    });

    const store = createStore({
      snaps: {
        snaps: [fooSnap, barSnap],
      },
    });

    const { getByPlaceholderText, queryByText } = render(
      <FilterSearch />,
      store,
    );

    const input = getByPlaceholderText('Search users or snaps');
    await act(() => fireEvent.change(input, { target: { value: 'foo-snap' } }));

    expect(queryByText('foo-snap')).toBeInTheDocument();
  });

  it('renders a menu with the Users search results for an address', async () => {
    const mockUseEnsName = useEnsName as jest.Mock;
    mockUseEnsName.mockClear();
    mockUseEnsName.mockImplementation(() => ({
      data: 'validaccount.eth',
      isLoading: false,
    }));

    const data: Snap[] = [];
    const fuse = new Fuse(data, {
      keys: ['snapId'],
    });

    const index = JSON.stringify(fuse.getIndex());

    const mock = getMock(useStaticQuery);
    mock.mockReturnValue({
      fusejs: {
        index,
        data,
      },
    });

    const store = createStore({
      snaps: {
        snaps: [],
      },
    });

    const { getByPlaceholderText, queryByText } = render(
      <FilterSearch />,
      store,
    );

    const input = getByPlaceholderText('Search users or snaps');
    await act(() =>
      fireEvent.change(input, { target: { value: VALID_ACCOUNT_1 } }),
    );

    expect(queryByText(trimAddress(VALID_ACCOUNT_1))).toBeInTheDocument();
    expect(queryByText('validaccount.eth')).toBeInTheDocument();
    expect(queryByText('See all results')).not.toBeInTheDocument();
  });

  it('renders a menu with the Users search results for an ENS', async () => {
    const mockUseEnsName = useEnsName as jest.Mock;
    mockUseEnsName.mockClear();
    mockUseEnsName.mockImplementation(() => ({
      data: 'validaccount.eth',
      isLoading: false,
    }));

    const mockGetEnsAddress = getEnsAddress as jest.Mock;
    mockGetEnsAddress.mockClear();
    mockGetEnsAddress.mockImplementation(async () =>
      Promise.resolve(VALID_ACCOUNT_1),
    );

    const data: Snap[] = [];
    const fuse = new Fuse(data, {
      keys: ['snapId'],
    });

    const index = JSON.stringify(fuse.getIndex());

    const mock = getMock(useStaticQuery);
    mock.mockReturnValue({
      fusejs: {
        index,
        data,
      },
    });

    const store = createStore({
      snaps: {
        snaps: [],
      },
    });

    const { getByPlaceholderText, queryByText } = render(
      <FilterSearch />,
      store,
    );

    const input = getByPlaceholderText('Search users or snaps');
    await act(() =>
      fireEvent.change(input, { target: { value: 'validaccount.eth' } }),
    );

    expect(queryByText(trimAddress(VALID_ACCOUNT_1))).toBeInTheDocument();
    expect(queryByText('validaccount.eth')).toBeInTheDocument();
    expect(queryByText('See all results')).not.toBeInTheDocument();
  });

  it("doesn't render a menu with the search results for an ENS that is not found", async () => {
    const mockUseEnsName = useEnsName as jest.Mock;
    mockUseEnsName.mockClear();
    mockUseEnsName.mockImplementation(() => ({
      data: 'validaccount.eth',
      isLoading: false,
    }));

    const mockGetEnsAddress = getEnsAddress as jest.Mock;
    mockGetEnsAddress.mockClear();
    mockGetEnsAddress.mockImplementation(async () =>
      Promise.reject(new Error('ENS not found')),
    );

    const data: Snap[] = [];
    const fuse = new Fuse(data, {
      keys: ['snapId'],
    });

    const index = JSON.stringify(fuse.getIndex());

    const mock = getMock(useStaticQuery);
    mock.mockReturnValue({
      fusejs: {
        index,
        data,
      },
    });

    const store = createStore({
      snaps: {
        snaps: [],
      },
    });

    const { getByPlaceholderText, queryByText } = render(
      <FilterSearch />,
      store,
    );

    const input = getByPlaceholderText('Search users or snaps');
    await act(() =>
      fireEvent.change(input, { target: { value: 'validaccount.eth' } }),
    );

    expect(queryByText('validaccount.eth')).not.toBeInTheDocument();
    expect(queryByText('See all results')).not.toBeInTheDocument();
  });

  it('sets the search query and results when clicking "See all results"', async () => {
    const fooSnap = getMockSnap({ snapId: 'foo-snap', name: 'foo-snap' }).snap;
    const barSnap = getMockSnap({ snapId: 'bar-snap', name: 'bar-snap' }).snap;

    const data = [fooSnap, barSnap];
    const fuse = new Fuse(data, {
      keys: ['snapId'],
    });

    const index = JSON.stringify(fuse.getIndex());

    const mock = getMock(useStaticQuery);
    mock.mockReturnValue({
      fusejs: {
        index,
        data,
      },
    });

    const store = createStore({
      snaps: {
        snaps: [fooSnap, barSnap],
      },
    });

    const { getByPlaceholderText, getByText } = render(<FilterSearch />, store);

    const input = getByPlaceholderText('Search users or snaps');
    fireEvent.change(input, { target: { value: 'foo' } });

    const seeAllResults = getByText('See all results');
    await act(() => fireEvent.click(seeAllResults));

    expect(getSearchQuery(store.getState())).toBe('foo');
    expect(store.getState().filter.searchResults).toStrictEqual({
      snaps: [fooSnap],
      users: [],
    });
  });

  it('opens the menu when clicked and there are search results', async () => {
    const fooSnap = getMockSnap({ snapId: 'foo-snap', name: 'foo-snap' }).snap;
    const barSnap = getMockSnap({ snapId: 'bar-snap', name: 'bar-snap' }).snap;

    const data = [fooSnap, barSnap];
    const fuse = new Fuse(data, {
      keys: ['snapId'],
    });

    const index = JSON.stringify(fuse.getIndex());

    const mock = getMock(useStaticQuery);
    mock.mockReturnValue({
      fusejs: {
        index,
        data,
      },
    });

    const store = createStore({
      snaps: {
        snaps: [fooSnap, barSnap],
      },
    });

    const { getByPlaceholderText, getByText, queryByText } = render(
      <FilterSearch />,
      store,
    );

    const input = getByPlaceholderText('Search users or snaps');
    await act(() => fireEvent.change(input, { target: { value: 'foo' } }));

    const fooButton = getByText('foo-snap');
    await act(() => fireEvent.click(fooButton));

    expect(queryByText('foo-snap')).not.toBeInTheDocument();

    await act(() => fireEvent.click(input));
    expect(queryByText('foo-snap')).toBeInTheDocument();
  });

  it('does not open the menu when clicked and there are no search results', async () => {
    const fooSnap = getMockSnap({ snapId: 'foo-snap', name: 'foo-snap' }).snap;
    const barSnap = getMockSnap({ snapId: 'bar-snap', name: 'bar-snap' }).snap;

    const data = [fooSnap, barSnap];
    const fuse = new Fuse(data, {
      keys: ['snapId'],
    });

    const index = JSON.stringify(fuse.getIndex());

    const mock = getMock(useStaticQuery);
    mock.mockReturnValue({
      fusejs: {
        index,
        data,
      },
    });

    const store = createStore({
      snaps: {
        snaps: [fooSnap, barSnap],
      },
    });

    const { getByPlaceholderText, queryByText } = render(
      <FilterSearch />,
      store,
    );

    const input = getByPlaceholderText('Search users or snaps');
    await act(() => fireEvent.change(input, { target: { value: 'baz' } }));

    await act(() => fireEvent.click(input));
    expect(queryByText('foo-snap')).not.toBeInTheDocument();
  });
});
