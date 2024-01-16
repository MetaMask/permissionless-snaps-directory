import { screen, fireEvent, waitFor } from '@testing-library/react';

import { RequestSignModal } from './RequestSignModal';
import { render } from '../utils/test-utils';

describe('RequestSignModal', () => {
  const onSignButtonClickMock = jest.fn();
  const onCloseMock = jest.fn();

  it('renders correctly', () => {
    render(
      <RequestSignModal
        isOpen={true}
        onClose={onCloseMock}
        headerIcon={<div>Header Icon</div>}
        buttonText="Sign"
        isLoading={false}
        onSignButtonClick={onSignButtonClickMock}
        mode={'positive'}
      >
        <div>Modal Content</div>
      </RequestSignModal>,
    );

    expect(screen.getByText('Header Icon')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByText('Sign')).toBeInTheDocument();
  });

  it('calls onSignButtonClick when Sign button is clicked', async () => {
    render(
      <RequestSignModal
        isOpen={true}
        onClose={onCloseMock}
        headerIcon={<div>Header Icon</div>}
        buttonText="Sign"
        isLoading={false}
        mode={'negative'}
        onSignButtonClick={onSignButtonClickMock}
      >
        <div>Modal Content</div>
      </RequestSignModal>,
    );

    fireEvent.click(screen.getByText('Sign'));

    await waitFor(() => {
      expect(onSignButtonClickMock).toHaveBeenCalledTimes(1);
    });
  });
});
