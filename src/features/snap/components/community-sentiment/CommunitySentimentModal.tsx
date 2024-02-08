import {
  Button,
  HStack,
  Tag,
  VStack,
  Text,
  Box,
  TagLabel,
  type ModalProps,
} from '@chakra-ui/react';
import { Trans, t } from '@lingui/macro';
import { useCallback, type FunctionComponent } from 'react';

import { type SentimentData, SentimentType } from './types';
import { getColorForSentiment } from './utils';
import {
  CheckFilledShadowIcon,
  ExternalLinkIcon,
  SignHexagonIcon,
  SimpleModal,
  WarningFilledShadowIcon,
} from '../../../../components';

export type CommunitySentimentModalProps = Omit<ModalProps, 'children'> & {
  snapName: string;
  sentiment: SentimentData;
};

export const CommunitySentimentModal: FunctionComponent<
  CommunitySentimentModalProps
> = ({ snapName, sentiment, isOpen, onClose }) => {
  const getHeaderTitle = useCallback(() => {
    let suffixText = '';
    switch (sentiment.type) {
      case SentimentType.InsufficientReview:
        suffixText = t`could not be evaluated by your community and might be unsecure`;
        break;
      case SentimentType.Secured:
        suffixText = t`has been evaluated as unsecure by your community`;
        break;
      case SentimentType.Unsecured:
        suffixText = t`has been evaluated as unsecured by your community`;
        break;
      default:
        suffixText = t`is currently under review by your community and may be insecure`;
        break;
    }
    return (
      <Trans>
        <Text variant="blue" as="span">
          {snapName}
        </Text>{' '}
        {suffixText}
      </Trans>
    );
  }, [sentiment, snapName]);

  const getHeaderIcon = useCallback(() => {
    switch (sentiment.type) {
      case SentimentType.InsufficientReview:
        return <WarningFilledShadowIcon />;
      case SentimentType.Secured:
        return <CheckFilledShadowIcon />;
      case SentimentType.InReview:
        return <WarningFilledShadowIcon />;
      case SentimentType.Unsecured:
        return <WarningFilledShadowIcon fill={'error.default'} />;
      default:
        return <CheckFilledShadowIcon />;
    }
  }, [sentiment]);
  return (
    <SimpleModal isOpen={isOpen} onClose={onClose} headerIcon={getHeaderIcon()}>
      <VStack textAlign="center">
        <Text fontSize="md" fontWeight="bold">
          {getHeaderTitle()}
        </Text>
        <Box
          background="background.default"
          padding="1rem"
          margin={'1.5'}
          borderRadius="1rem"
          width={'100%'}
        >
          <VStack alignItems="flex-start" spacing={'1.5rem'}>
            <HStack>
              <VStack alignItems="flex-start">
                <HStack>
                  <Tag
                    textTransform="none"
                    height={'1.5rem'}
                    variant={getColorForSentiment(sentiment.type)}
                  >
                    <SignHexagonIcon
                      margin={-1}
                      fill="currentColor"
                    ></SignHexagonIcon>
                    <TagLabel>
                      <Trans>{`${sentiment.type} by Community`}</Trans>
                    </TagLabel>
                  </Tag>
                </HStack>
                <HStack fontSize={'sm'}>
                  <Text variant="blue">
                    <Trans>{sentiment.endorsements} endorsements</Trans>
                  </Text>
                  <Text> and </Text>
                  <Text variant="blue">
                    <Trans>{sentiment.reports} reports</Trans>
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            <HStack>
              <VStack alignItems="flex-start">
                <HStack noOfLines={2}>
                  <Text>
                    <Trans>SOURCE CODE</Trans>
                  </Text>
                </HStack>
                <HStack>
                  <Button
                    variant="link"
                    fontWeight={'light'}
                    rightIcon={<ExternalLinkIcon />}
                  >
                    <Text variant="blue">
                      <Trans>GitHub</Trans>
                    </Text>
                  </Button>
                </HStack>
              </VStack>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </SimpleModal>
  );
};
