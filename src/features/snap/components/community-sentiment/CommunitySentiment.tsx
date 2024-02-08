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
import { type SentimentData, SentimentType } from './types';
import { getColorForSentiment } from './utils';
import { SignHexagonIcon } from '../../../../components';
import { Data } from '../Data';

export type CommunitySentimentProps = {
  snapName: string;
  sentiment: SentimentData;
};

const renderLinkLabel = (sentiment: SentimentData, onClick: () => void) => {
  if (sentiment.type === SentimentType.InsufficientReview) {
    return null;
  }
  let linkLabel;
  switch (sentiment.type) {
    case SentimentType.Secured:
      linkLabel = t`${sentiment.endorsements} endorsements`;
      break;
    case SentimentType.InReview:
      linkLabel = t`${sentiment.reports} reports`;
      break;
    case SentimentType.Unsecured:
      linkLabel = t`${sentiment.reports} reports`;
      break;
    default:
      linkLabel = t`${sentiment.endorsements} endorsements`;
      break;
  }
  return (
    <Link onClick={onClick}>
      <Trans>{linkLabel}</Trans>
    </Link>
  );
};

export const CommunitySentiment: FunctionComponent<CommunitySentimentProps> = ({
  snapName,
  sentiment,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const render = () => {
    return (
      <VStack>
        <HStack alignSelf={'flex-start'}>
          <Tag
            textTransform="none"
            variant={getColorForSentiment(sentiment.type)}
            onClick={onOpen}
          >
            <SignHexagonIcon margin={-1} fill="currentColor"></SignHexagonIcon>
            <TagLabel>
              <Trans>{sentiment.type}</Trans>
            </TagLabel>
          </Tag>
          {renderLinkLabel(sentiment, onOpen)}
        </HStack>
        <CommunitySentimentModal
          snapName={snapName}
          sentiment={sentiment}
          isOpen={isOpen}
          onClose={onClose}
        />
      </VStack>
    );
  };

  return (
    <>
      <Data label={t`Community Sentiment`} value={render()} />
    </>
  );
};
