import { fireEvent, screen, waitFor } from '@testing-library/react';

import { CommunitySentiment } from './CommunitySentiment';
import { createStore } from '../../../../store';
import { render } from '../../../../utils/test-utils';
import { SnapCurrentStatus } from '../../assertions/types';

describe('CommunitySentiment', () => {
  const sentimentsInput = [
    {
      result: 1,
      endorsements: 5,
      reports: 0,
      expectedLinkLabel: '5 endorsements',
      expectedSentimentLabel: 'Endorsed',
    },
    {
      result: 2,
      endorsements: 0,
      reports: 3,
      expectedLinkLabel: '3 reports',
      expectedSentimentLabel: 'In Review',
    },
    {
      result: 3,
      endorsements: 0,
      reports: 2,
      expectedLinkLabel: '2 reports',
      expectedSentimentLabel: 'Reported',
    },
  ];

  it.each(sentimentsInput)(
    'renders correctly with %s sentiment',
    async (sentiment) => {
      const endorsements = [];
      for (let i = 0; i < sentiment.endorsements; i++) {
        endorsements.push({
          snapId: 'snap://checksum',
          issuer: `issuer${i + 1}`,
          currentStatus: SnapCurrentStatus.Endorsed,
          creationAt: new Date(),
        });
      }
      const reports = [];
      for (let i = 0; i < sentiment.reports; i++) {
        reports.push({
          snapId: 'snap://checksum',
          issuer: `issuer${i + 1}`,
          currentStatus: SnapCurrentStatus.Disputed,
          creationAt: new Date(),
        });
      }
      const store = createStore({
        snapAssertions: {
          snapAssertions: [...endorsements, ...reports],
        },
        snapTrustScores: {
          snapTrustScores: [
            { snapId: 'snap://checksum', result: sentiment.result },
          ],
        },
      });

      render(
        <CommunitySentiment
          snap={{ name: 'Snap Name', latestChecksum: 'checksum' }}
        />,
        store,
      );

      await waitFor(() => {
        expect(
          screen.queryByText(sentiment.expectedLinkLabel),
        ).toBeInTheDocument();
        expect(
          screen.queryByText(sentiment.expectedSentimentLabel),
        ).toBeInTheDocument();
      });
    },
  );

  it('does not render link label when sentiment is `InsufficientReview`', () => {
    const store = createStore({
      snapAssertions: {
        snapAssertions: [
          {
            snapId: 'snap://checksum',
            issuer: 'issuer1',
            currentStatus: SnapCurrentStatus.Disputed,
            creationAt: new Date(),
          },
        ],
      },
      snapTrustScores: {
        snapTrustScores: [{ snapId: 'snap://checksum', result: 0 }],
      },
    });
    render(
      <CommunitySentiment
        snap={{ name: 'Snap Name', latestChecksum: 'checksum' }}
      />,
      store,
    );
    expect(screen.queryByText('Insufficient Reviews')).toBeInTheDocument();
    expect(screen.queryByText('endorsements')).not.toBeInTheDocument();
    expect(screen.queryByText('reports')).not.toBeInTheDocument();
  });

  it('does not render CommunitySentiment when sentiment is `Unknown`', () => {
    const store = createStore({
      snapAssertions: {
        snapAssertions: [
          {
            snapId: 'snap://checksum',
            issuer: 'issuer1',
            currentStatus: SnapCurrentStatus.Disputed,
            creationAt: new Date(),
          },
        ],
      },
      snapTrustScores: {
        snapTrustScores: [{ snapId: 'snap://checksum', result: -1 }],
      },
    });
    render(
      <CommunitySentiment
        snap={{ name: 'Snap Name', latestChecksum: 'checksum' }}
      />,
      store,
    );
    expect(screen.queryByText('endorsements')).not.toBeInTheDocument();
    expect(screen.queryByText('reports')).not.toBeInTheDocument();
  });

  it('opens CommunitySentimentModal when link label is clicked', () => {
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
      <CommunitySentiment
        snap={{ name: 'Snap Name', latestChecksum: 'checksum' }}
      />,
      store,
    );

    const linkLabel = screen.getByText('1 endorsements');
    fireEvent.click(linkLabel);

    const modalTitle = screen.queryByText('Snap Name');
    expect(modalTitle).toBeInTheDocument();
  });
});
