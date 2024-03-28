import { Box, Link, Tag, TagLabel, useDisclosure } from '@chakra-ui/react';
import { Trans, t } from '@lingui/macro';
import { type FunctionComponent } from 'react';

import { CommunitySentimentModal } from './CommunitySentimentModal';
import { SentimentType } from './types';
import { getColorForSentiment, getSentimentTypeFromResult } from './utils';
import { SignHexagonIcon } from '../../../../components';
import { useSelector } from '../../../../hooks';
import { type Fields } from '../../../../utils';
import { getSnapAssertionDetailsForSnapId } from '../../assertions/store';
import { getSnapTrustScoreForSnapId } from '../../trust-score/store';
import { Data } from '../Data';

export type CommunitySentimentProps = {
  snap: Fields<Queries.Snap, 'name' | 'latestChecksum'>;
};

export const CommunitySentiment: FunctionComponent<CommunitySentimentProps> = ({
  snap,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { result } = useSelector(
    getSnapTrustScoreForSnapId(snap.latestChecksum),
  );
  const sentimentType: SentimentType = getSentimentTypeFromResult(result);
  const { endorsementsCount, reportsCount } = useSelector(
    getSnapAssertionDetailsForSnapId(snap.latestChecksum),
  );

  const renderLinkLabel = (onClick: () => void) => {
    if (sentimentType === SentimentType.InsufficientReview) {
      return null;
    }
    let linkLabel;
    switch (sentimentType) {
      case SentimentType.Endorsed:
        linkLabel = t`${endorsementsCount} endorsements`;
        break;
      case SentimentType.InReview:
        linkLabel = t`${reportsCount} reports`;
        break;
      default:
        linkLabel = t`${reportsCount} reports`;
        break;
    }
    return (
      <Link onClick={onClick}>
        <Trans>{linkLabel}</Trans>
      </Link>
    );
  };

  const render = () => {
    return (
      <Box>
        <Tag
          variant={getColorForSentiment(sentimentType)}
          onClick={onOpen}
          cursor={'pointer'}
        >
          <SignHexagonIcon margin={-1} fill="currentColor"></SignHexagonIcon>
          <TagLabel>
            <Trans>{sentimentType}</Trans>
          </TagLabel>
        </Tag>
        {renderLinkLabel(onOpen)}
        <CommunitySentimentModal
          snap={snap}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Box>
    );
  };

  return <Data label={t`Community Sentiment`} value={render()} />;
};
