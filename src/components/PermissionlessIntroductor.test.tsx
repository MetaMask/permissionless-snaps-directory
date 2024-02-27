import { PermissionlessIntroductory } from './PermissionlessIntroductory';
import { render } from '../utils/test-utils';

describe('PermissionlessIntroductory', () => {
  it('renders', async () => {
    const { queryByText } = render(<PermissionlessIntroductory />);

    expect(queryByText(`We're experimenting`)).toBeInTheDocument();
  });
});
