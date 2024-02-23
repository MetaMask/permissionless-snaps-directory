import { PermissionlessDisclaimer } from './PermissionlessDisclaimer';
import { render } from '../utils/test-utils';

describe('PermissionlessDisclaimer', () => {
  it('renders', async () => {
    const { queryByText } = render(<PermissionlessDisclaimer />);

    expect(
      queryByText(
        'Experimental site for testing only. Official Snaps Directory:',
      ),
    ).toBeInTheDocument();
  });
});
