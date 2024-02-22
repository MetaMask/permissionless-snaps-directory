import { SecurityReportsTabPanel } from './SecurityReportsTabPanel';
import { render } from '../../../../utils/test-utils';

describe('SecurityReportsTabPanel', () => {
  it('renders', () => {
    const { queryByTestId } = render(<SecurityReportsTabPanel />);
    expect(queryByTestId('security-reports-tab')).toBeInTheDocument();
  });
});
