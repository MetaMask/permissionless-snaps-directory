import { fireEvent, screen, waitFor } from '@testing-library/react';

import { CommunitySentimentModal } from './CommunitySentimentModal';
import { SentimentType } from './types';
import { createStore } from '../../../../store';
import { render } from '../../../../utils/test-utils';
import { SubjectType } from '../../../account/assertions/enums';
import { SnapStatusReasonType } from '../../assertions/store';
import { SnapCurrentStatus } from '../../assertions/types';

jest.mock('../../../../components', () => ({
  ...jest.requireActual('../../../../components'),
  IssuersListModal: () => <div data-testid="issuers-list-modal" />,
}));

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
      type: SentimentType.Endorsed,
      result: 1,
      expectedText: /has been evaluated as secure by your community/u,
    },
    {
      type: SentimentType.InReview,
      result: 2,
      expectedText:
        /currently under review by your community and may be insecure/u,
    },
    {
      type: SentimentType.Reported,
      result: 3,
      expectedText: /has been evaluated as unsecure by your community/u,
    },
  ];

  sentimentTypeTests.forEach(({ type, result, expectedText }) => {
    it(`renders correctly with sentiment type ${type}`, () => {
      const store = createStore({
        snapAssertions: {
          snapAssertions: [
            {
              snapId: 'checksum1',
              issuer: 'issuer1',
              currentStatus: SnapCurrentStatus.Endorsed,
              creationAt: new Date(),
              subjectType: SubjectType.Snap,
              statusReason: {
                type: SnapStatusReasonType.Endorse,
                value: ['Value'],
              },
              issuanceDate: new Date(),
            },
            {
              snapId: 'checksum1',
              issuer: 'issuer2',
              currentStatus: SnapCurrentStatus.Disputed,
              creationAt: new Date(),
              subjectType: SubjectType.Snap,
              statusReason: {
                type: SnapStatusReasonType.Malicious,
                value: ['Value'],
              },
              issuanceDate: new Date(),
            },
          ],
        },
        snapTrustScores: {
          snapTrustScores: [{ snapId: 'checksum1', result }],
        },
      });

      render(
        <CommunitySentimentModal
          isOpen={true}
          onClose={onCloseMock}
          snap={{ name: 'Snap Name', latestChecksum: 'checksum1' }}
        />,
        store,
      );

      expect(screen.queryByText(expectedText)).toBeInTheDocument();
      expect(screen.queryByText('1 endorsements')).toBeInTheDocument();
      expect(screen.queryByText('1 reports')).toBeInTheDocument();

      fireEvent.click(screen.getByText('1 endorsements'));

      expect(screen.queryAllByTestId('issuers-list-modal')).toHaveLength(1);

      fireEvent.click(screen.getByText('1 reports'));

      expect(screen.queryAllByTestId('issuers-list-modal')).toHaveLength(2);
    });
  });

  it('calls onClose when Modal is closed', async () => {
    const store = createStore({
      snapAssertions: {
        snapAssertions: [
          {
            snapId: 'checksum',
            subjectType: SubjectType.Snap,
            issuer: 'issuer1',
            currentStatus: SnapCurrentStatus.Endorsed,
            creationAt: new Date(),
            statusReason: {
              type: SnapStatusReasonType.Endorse,
              value: ['Value'],
            },
            issuanceDate: new Date(),
          },
        ],
      },
      snapTrustScores: {
        snapTrustScores: [{ snapId: 'checksum', result: 1 }],
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
