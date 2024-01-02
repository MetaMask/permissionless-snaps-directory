import { HStack, useColorMode } from '@chakra-ui/react';
import { useMemo } from 'react';
import type { ReactElement, FunctionComponent } from 'react';

import { StarFilledIcon, StarIcon } from '.';

export type RatingProps = {
  rate: number;
  maxRate?: number;
};

export const Rating: FunctionComponent<RatingProps> = ({
  rate,
  maxRate = 5,
}) => {
  const { colorMode } = useColorMode();

  const star: ReactElement[] = useMemo(() => {
    const _star: ReactElement[] = [];
    for (let i = 0; i < maxRate; i++) {
      _star.push(
        i < rate ? (
          <StarFilledIcon
            key={i}
            data-testid={`filled-${i}`}
            fill={colorMode === 'light' ? '#6A737D' : '#BBC0C5'}
          />
        ) : (
          <StarIcon
            key={i}
            data-testid={`empty-${i}`}
            fill={colorMode === 'light' ? '#BBC0C5' : '#6A737D'}
          />
        ),
      );
    }
    return _star;
  }, [maxRate, rate, colorMode]);

  return <HStack justifyContent="center">{star}</HStack>;
};
