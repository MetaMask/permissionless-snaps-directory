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

import { SentimentType } from './types';
import { getColorForSentiment, getSentimentTypeFromResult } from './utils';
import {
  CheckFilledShadowIcon,
  ExternalLinkIcon,
  SignHexagonIcon,
  SimpleModal,
  WarningFilledShadowIcon,
} from '../../../../components';
import { useSelector } from '../../../../hooks';
import { type Fields } from '../../../../utils';
import { getSnapAssertionDetailsForSnapId } from '../../assertions/store';
import { getSnapTrustScoreForSnapId } from '../../trust-score/store';

export type CommunitySentimentModalProps = Omit<ModalProps, 'children'> & {
  snap: Fields<Queries.Snap, 'name' | 'latestChecksum'>;
};

export const CommunitySentimentModal: FunctionComponent<
  CommunitySentimentModalProps
> = ({ snap, isOpen, onClose }) => {
  const { endorsementsCount, reportsCount } = useSelector(
    getSnapAssertionDetailsForSnapId(snap.latestChecksum),
  );

  const snapName = snap.name;
  const { result } = useSelector(
    getSnapTrustScoreForSnapId(snap.latestChecksum),
  );
  const sentimentType: SentimentType = getSentimentTypeFromResult(result);

  const getHeaderTitle = useCallback(() => {
    let suffixText = '';
    switch (sentimentType) {
      case SentimentType.InsufficientReview:
        suffixText = t`could not be evaluated by your community and might be unsecure`;
        break;
      case SentimentType.Endorsed:
        suffixText = t`has been evaluated as secure by your community`;
        break;
      case SentimentType.Reported:
        suffixText = t`has been evaluated as unsecure by your community`;
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
  }, [sentimentType, snapName]);

  const getHeaderIcon = useCallback(() => {
    switch (sentimentType) {
      case SentimentType.InsufficientReview:
        return <WarningFilledShadowIcon />;
      case SentimentType.Endorsed:
        return <CheckFilledShadowIcon />;
      case SentimentType.InReview:
        return <WarningFilledShadowIcon />;
      default:
        return <WarningFilledShadowIcon fill={'error.default'} />;
    }
  }, [sentimentType]);
  return (
    sentimentType !== SentimentType.Unknown && (
      <SimpleModal
        isOpen={isOpen}
        onClose={onClose}
        headerIcon={getHeaderIcon()}
      >
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
                      variant={getColorForSentiment(sentimentType)}
                    >
                      <SignHexagonIcon
                        margin={-1}
                        fill="currentColor"
                      ></SignHexagonIcon>
                      <TagLabel>
                        <Trans>
                          {sentimentType}{' '}
                          {sentimentType === SentimentType.Endorsed ||
                          sentimentType === SentimentType.Reported
                            ? 'by Community'
                            : ''}
                        </Trans>
                      </TagLabel>
                    </Tag>
                  </HStack>
                  <HStack fontSize={'sm'}>
                    <Text variant="blue">
                      <Trans>{endorsementsCount} endorsements</Trans>
                    </Text>
                    <Text> and </Text>
                    <Text variant="blue">
                      <Trans>{reportsCount} reports</Trans>
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
    )
  );
};
