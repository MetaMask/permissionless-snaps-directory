import { fireEvent, screen, waitFor } from '@testing-library/react';

import { SimpleModal } from './SimpleModal';
import { render } from '../utils/test-utils';

describe('SimpleModal', () => {
  const onCloseMock = jest.fn();
  it('renders header icon', () => {
    render(
      <SimpleModal
        isOpen={true}
        onClose={onCloseMock}
        headerIcon={<div>Header Icon</div>}
      >
        <div>Modal Content</div>
      </SimpleModal>,
    );
    expect(screen.queryByText('Header Icon')).toBeInTheDocument();
    expect(screen.queryByText('Modal Content')).toBeInTheDocument();
  });

  it('calls onClose when ModalCloseButton is clicked', async () => {
    render(
      <SimpleModal isOpen={true} onClose={onCloseMock} headerIcon={<div />}>
        <div>Modal Content</div>
      </SimpleModal>,
    );
    fireEvent.click(screen.getByLabelText('Close'));
    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  });
});
