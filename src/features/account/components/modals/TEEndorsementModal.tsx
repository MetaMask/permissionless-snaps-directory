import { Box, Center, Checkbox, Link, Text, VStack } from '@chakra-ui/react';
import { t, Trans } from '@lingui/macro';
import { type FunctionComponent, useState } from 'react';

import { AvatarBlueIcon, RequestSignModal } from '../../../../components';

export type TEEndorsementModalProps = {
  trustEntity: string;
  options: TEEndorsementOption[];
  onSign: (arg: string[]) => Promise<void>;
  onClose: () => void;
  visibility: boolean;
};

export type TEEndorsementOption = {
  label: string;
  value: string;
  description?: string;
};

export const TEEndorsementModal: FunctionComponent<TEEndorsementModalProps> = ({
  trustEntity,
  options,
  onSign,
  onClose,
  visibility,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState(options.map(() => false));

  const handleCheckboxChange = (checked: boolean, index: number) => {
    checkedItems[index] = checked;
    setCheckedItems([...checkedItems]);
  };

  const onSignButtonClick = () => {
    setIsLoading(true);

    const args: string[] = [];
    checkedItems.forEach((state: boolean, index: number) => {
      if (state) {
        args.push(options[index]?.value as string);
      }
    });

    onSign(args).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <RequestSignModal
      isOpen={visibility}
      isLoading={isLoading}
      mode="positive"
      headerIcon={<AvatarBlueIcon />}
      buttonText={t`Sign to endorse`}
      onClose={onClose}
      onSignButtonClick={onSignButtonClick}
    >
      <Center>
        <VStack fontSize="md">
          <Text fontWeight="medium" textAlign="center">
            <Trans>Endorse Technical Expertises</Trans>
          </Text>
          <Text noOfLines={2} as="span">
            <Trans>
              Endorse{' '}
              <Text variant="blue" as="span">
                {trustEntity}
              </Text>{' '}
              expertise within your community.
            </Trans>{' '}
            <Link>
              <Trans>Learn more</Trans>
            </Link>
          </Text>
          {options.map((option: TEEndorsementOption, index: number) => (
            <Box
              background="background.default"
              padding="1rem"
              borderRadius="1rem"
              width="100%"
              mt="1rem"
              key={index}
            >
              <>
                <Checkbox
                  size="md"
                  borderRadius="0.25rem"
                  padding="0.012rem"
                  marginInline="1"
                  value={option.value}
                  onChange={(event) =>
                    handleCheckboxChange(event.target.checked, index)
                  }
                >
                  <Text>{option.label}</Text>
                </Checkbox>
                {option.description && (
                  <Text fontSize="xs">{option.description}</Text>
                )}
              </>
            </Box>
          ))}
        </VStack>
      </Center>
    </RequestSignModal>
  );
};
