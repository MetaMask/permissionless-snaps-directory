import { DevelopedSnapsSection } from './DevelopedSnapsSection';
import { render } from '../../../../utils/test-utils';

describe('DevelopedSnapsSection', () => {
  it('renders', () => {
    const { queryByTestId } = render(<DevelopedSnapsSection />);
    expect(queryByTestId('my-snaps-tab')).toBeInTheDocument();
  });
});
