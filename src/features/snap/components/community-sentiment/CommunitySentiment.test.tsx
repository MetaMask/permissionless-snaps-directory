import { fireEvent, screen } from '@testing-library/react';

import { CommunitySentiment } from './CommunitySentiment';
import { SentimentType } from './types';
import { render } from '../../../../utils/test-utils';

describe('CommunitySentiment', () => {
  const expectedLinkLabels = {
    [SentimentType.Secured]: '5 endorsements',
    [SentimentType.InReview]: '3 reports',
    [SentimentType.Unsecured]: '2 reports',
    [SentimentType.UserFriendly]: '5 endorsements',
  };

  const sentiments = [
    { type: SentimentType.Secured, endorsements: 5, reports: 0 },
    { type: SentimentType.InReview, endorsements: 0, reports: 3 },
    { type: SentimentType.Unsecured, endorsements: 0, reports: 2 },
    { type: SentimentType.UserFriendly, endorsements: 5, reports: 2 },
  ];

  it.each(sentiments)('renders correctly with %s sentiment', (sentiment) => {
    render(<CommunitySentiment snapName="Snap Name" sentiment={sentiment} />);

    const expectedLinkLabel =
      expectedLinkLabels[sentiment.type as keyof typeof expectedLinkLabels];
    const linkLabelElement = screen.queryByText(expectedLinkLabel);
    expect(linkLabelElement).toBeInTheDocument();
  });

  it('does not render link label when sentiment is `InsufficientReview`', () => {
    const sentiment = {
      type: SentimentType.InsufficientReview,
      endorsements: 0,
      reports: 0,
    };
    render(<CommunitySentiment snapName="Snap Name" sentiment={sentiment} />);

    expect(screen.queryByText('endorsements')).not.toBeInTheDocument();
    expect(screen.queryByText('reports')).not.toBeInTheDocument();
  });

  it('opens CommunitySentimentModal when link label is clicked', () => {
    const sentiment = {
      type: SentimentType.Unsecured,
      endorsements: 0,
      reports: 3,
    };
    render(<CommunitySentiment snapName="Snap Name" sentiment={sentiment} />);

    const linkLabel = screen.getByText('3 reports');
    fireEvent.click(linkLabel);

    const modalTitle = screen.queryByText('Snap Name');
    expect(modalTitle).toBeInTheDocument();
  });
});
