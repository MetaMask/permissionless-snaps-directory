import { MySnapsTabPanel } from './MySnapsTabPanel';
import { render } from '../../../../utils/test-utils';

describe('MySnapsTabPanel', () => {
  it('renders', () => {
    const { queryByTestId } = render(<MySnapsTabPanel />);
    expect(queryByTestId('my-snaps-tab')).toBeInTheDocument();
  });
});
