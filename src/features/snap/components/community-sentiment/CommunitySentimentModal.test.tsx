import { fireEvent, screen, waitFor } from '@testing-library/react';

import { CommunitySentimentModal } from './CommunitySentimentModal';
import { SentimentType } from './types';
import { render } from '../../../../utils/test-utils';

describe('CommunitySentimentModal', () => {
  const onCloseMock = jest.fn();

  const sentimentTypeTests = [
    {
      type: SentimentType.InsufficientReview,
      expectedText:
        /could not be evaluated by your community and might be unsecure/u,
    },
    {
      type: SentimentType.Secured,
      expectedText: /has been evaluated as unsecure by your community/u,
    },
    {
      type: SentimentType.InReview,
      expectedText:
        /currently under review by your community and may be insecure/u,
    },
    {
      type: SentimentType.Unsecured,
      expectedText: /has been evaluated as unsecured by your community/u,
    },
    {
      type: SentimentType.UserFriendly,
      expectedText:
        /currently under review by your community and may be insecure/u,
    },
  ];

  sentimentTypeTests.forEach(({ type, expectedText }) => {
    it(`renders correctly with sentiment type ${type}`, () => {
      render(
        <CommunitySentimentModal
          isOpen={true}
          onClose={onCloseMock}
          snapName="Snap Name"
          sentiment={{ type, endorsements: 0, reports: 0 }}
        />,
      );

      expect(screen.queryByText(expectedText)).toBeInTheDocument();
    });
  });

  it('calls onClose when Modal is closed', async () => {
    const sentiment = {
      type: SentimentType.InsufficientReview,
      endorsements: 5,
      reports: 2,
    };
    render(
      <CommunitySentimentModal
        isOpen={true}
        onClose={onCloseMock}
        snapName="Snap Name"
        sentiment={sentiment}
      />,
    );

    fireEvent.click(screen.getByLabelText('Close'));
    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  });
});
