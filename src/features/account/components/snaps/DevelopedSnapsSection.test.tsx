import { act } from '@testing-library/react';

import { DevelopedSnapsSection } from './DevelopedSnapsSection';
import { createStore } from '../../../../store';
import { getMockSnap, render } from '../../../../utils/test-utils';

describe('DevelopedSnapsSection', () => {
  it('renders', async () => {
    const fooSnap = getMockSnap({
      snapId: 'foo-snap',
      name: 'foo-snap',
      author: { name: 'Foo Dev', website: 'https://foo.dev', address: '0xFoo' },
    }).snap;

    const store = createStore({
      snaps: {
        snaps: [fooSnap],
      },
    });

    const { queryByTestId } = await act(() =>
      render(<DevelopedSnapsSection author={'0xFoo'} />, store),
    );
    expect(queryByTestId('my-snaps-section')).toBeInTheDocument();
  });
});
