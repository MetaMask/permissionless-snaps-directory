import { TrustedCircleTabPanel } from './TrustedCircleTabPanel';
import { render } from '../../../../utils/test-utils';

describe('TrustedCircleTabPanel', () => {
  it('renders', () => {
    const { queryByTestId } = render(<TrustedCircleTabPanel />);
    expect(queryByTestId('trusted-circle-tab')).toBeInTheDocument();
  });
});
