import { Center, Link, Text, VStack } from '@chakra-ui/react';
import { Trans, t } from '@lingui/macro';
import { useState, type FunctionComponent } from 'react';

import {
  MultipleCheckboxOptions,
  RequestSignModal,
  StarFilledShadowIcon,
} from '../../../../components';

export type EndorseSnapModalProps = {
  snapName: string;
  options: string[];
  onSign: (arg: string[]) => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
};

export const EndorseSnapModal: FunctionComponent<EndorseSnapModalProps> = ({
  snapName,
  options,
  onSign,
  onClose,
  isOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([] as string[]);

  const onSignButtonClick = () => {
    setIsLoading(true);

    onSign(selectedOptions).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <RequestSignModal
      isOpen={isOpen}
      isLoading={isLoading}
      mode="positive"
      headerIcon={<StarFilledShadowIcon fill="info.default" />}
      buttonText={t`Sign to endorse`}
      onClose={onClose}
      onSignButtonClick={onSignButtonClick}
    >
      <Center>
        <VStack textAlign="center" fontSize="md">
          <Text fontWeight="medium">
            <Trans>Endorse a Trustworthy Snap</Trans>
          </Text>

          <Text noOfLines={2} fontWeight="regular" as="span">
            <Trans>
              Sign to endorse{' '}
              <Text variant="blue" as="span">
                {snapName}
              </Text>{' '}
              as trustworthy for your community.
            </Trans>{' '}
            <Link
              href="https://support.metamask.io/hc/en-us/articles/23263846792475"
              target="_blank"
            >
              <Trans>Learn more</Trans>
            </Link>
          </Text>
          <MultipleCheckboxOptions
            options={options}
            onChange={(values) => {
              setSelectedOptions(
                options.filter((_, index) => values[index] === true),
              );
            }}
          />
        </VStack>
      </Center>
    </RequestSignModal>
  );
};
