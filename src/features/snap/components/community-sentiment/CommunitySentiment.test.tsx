import { fireEvent, screen, waitFor } from '@testing-library/react';

import { CommunitySentiment } from './CommunitySentiment';
import { createStore } from '../../../../store';
import { render } from '../../../../utils/test-utils';

describe('CommunitySentiment', () => {
  const sentimentsInput = [
    {
      result: 1,
      endorsements: 5,
      reports: 0,
      expectedLinkLabel: '5 endorsements',
      expectedSentimentLabel: 'Secured',
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
      expectedSentimentLabel: 'Unsecured',
    },
  ];

  it.each(sentimentsInput)(
    'renders correctly with %s sentiment',
    async (sentiment) => {
      const store = createStore({
        snapAssertions: {
          snapAssertions: [
            {
              snapId: 'snap://checksum',
              endorsementsCount: sentiment.endorsements,
              reportsCount: sentiment.reports,
            },
          ],
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
            endorsementsCount: 1,
            reportsCount: 1,
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
            endorsementsCount: 1,
            reportsCount: 1,
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
            endorsementsCount: 10,
            reportsCount: 3,
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

    const linkLabel = screen.getByText('10 endorsements');
    fireEvent.click(linkLabel);

    const modalTitle = screen.queryByText('Snap Name');
    expect(modalTitle).toBeInTheDocument();
  });
});
