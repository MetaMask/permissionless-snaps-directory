import {
  HStack,
  Link,
  Tag,
  TagLabel,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
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
      case SentimentType.Secured:
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
      <VStack>
        <HStack alignSelf={'flex-start'}>
          <Tag
            textTransform="none"
            variant={getColorForSentiment(sentimentType)}
            onClick={onOpen}
          >
            <SignHexagonIcon margin={-1} fill="currentColor"></SignHexagonIcon>
            <TagLabel>
              <Trans>{sentimentType}</Trans>
            </TagLabel>
          </Tag>
          {renderLinkLabel(onOpen)}
        </HStack>
        <CommunitySentimentModal
          snap={snap}
          isOpen={isOpen}
          onClose={onClose}
        />
      </VStack>
    );
  };

  return (
    sentimentType !== SentimentType.Unknown && (
      <>
        <Data label={t`Community Sentiment`} value={render()} />
      </>
    )
  );
};
