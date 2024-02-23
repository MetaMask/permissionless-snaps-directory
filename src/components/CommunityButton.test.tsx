import { fireEvent } from '@testing-library/react';
import { navigate } from 'gatsby';

import { CommunityButton } from './CommunityButton';
import { render } from '../utils/test-utils';

jest.mock('gatsby', () => ({
  navigate: jest.fn(),
}));

describe('CommunityButton', () => {
  it('should call navigate function when clicked', async () => {
    const { getByLabelText } = render(<CommunityButton />);
    const button = getByLabelText('Open community menu');

    fireEvent.click(button);

    expect(navigate).toHaveBeenCalledWith('/community', { replace: true });
  });
});
