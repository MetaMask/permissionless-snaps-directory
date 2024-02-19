import { fireEvent, screen, waitFor } from '@testing-library/react';

import { CommunitySentimentModal } from './CommunitySentimentModal';
import { SentimentType } from './types';
import { createStore } from '../../../../store';
import { render } from '../../../../utils/test-utils';
import { SnapCurrentStatus } from '../../assertions/types';

describe('CommunitySentimentModal', () => {
  const onCloseMock = jest.fn();

  const sentimentTypeTests = [
    {
      type: SentimentType.InsufficientReview,
      result: 0,
      expectedText:
        /could not be evaluated by your community and might be unsecure/u,
    },
    {
      type: SentimentType.Secured,
      result: 1,
      expectedText: /has been evaluated as secured by your community/u,
    },
    {
      type: SentimentType.InReview,
      result: 2,
      expectedText:
        /currently under review by your community and may be insecure/u,
    },
    {
      type: SentimentType.Unsecured,
      result: 3,
      expectedText: /has been evaluated as unsecured by your community/u,
    },
  ];

  sentimentTypeTests.forEach(({ type, result, expectedText }) => {
    it(`renders correctly with sentiment type ${type}`, () => {
      const store = createStore({
        snapAssertions: {
          snapAssertions: [
            {
              snapId: 'snap://checksum',
              issuer: 'issuer1',
              currentStatus: SnapCurrentStatus.Endorsed,
              creationAt: new Date(),
            },
            {
              snapId: 'snap://checksum',
              issuer: 'issuer2',
              currentStatus: SnapCurrentStatus.Disputed,
              creationAt: new Date(),
            },
          ],
        },
        snapTrustScores: {
          snapTrustScores: [{ snapId: 'snap://checksum', result }],
        },
      });

      render(
        <CommunitySentimentModal
          isOpen={true}
          onClose={onCloseMock}
          snap={{ name: 'Snap Name', latestChecksum: 'checksum' }}
        />,
        store,
      );

      expect(screen.queryByText(expectedText)).toBeInTheDocument();
      expect(screen.queryByText('1 endorsements')).toBeInTheDocument();
      expect(screen.queryByText('1 reports')).toBeInTheDocument();
    });
  });

  it('calls onClose when Modal is closed', async () => {
    const store = createStore({
      snapAssertions: {
        snapAssertions: [
          {
            snapId: 'snap://checksum',
            issuer: 'issuer1',
            currentStatus: SnapCurrentStatus.Endorsed,
            creationAt: new Date(),
          },
        ],
      },
      snapTrustScores: {
        snapTrustScores: [{ snapId: 'snap://checksum', result: 1 }],
      },
    });
    render(
      <CommunitySentimentModal
        isOpen={true}
        onClose={onCloseMock}
        snap={{ name: 'Snap Name', latestChecksum: 'checksum' }}
      />,
      store,
    );

    fireEvent.click(screen.getByLabelText('Close'));
    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  });
});
