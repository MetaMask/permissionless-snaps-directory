import { HStack } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { StarFilledIcon, StarIcon } from '.';

export type RatingProps = {
  rate: number;
  maxRate?: number;
};

export const Rating: FunctionComponent<RatingProps> = ({
  rate,
  maxRate = 5,
}) => {
  const _rate = rate > maxRate ? maxRate : rate;
  const filledStar = new Array(_rate).fill(0);
  const emptyStar = new Array(maxRate - _rate).fill(0);

  return (
    <HStack justifyContent="center">
      {filledStar.map((_, idx) => (
        <StarFilledIcon key={idx} data-testid={`filled-${idx}`} />
      ))}
      {emptyStar.map((_, idx) => (
        <StarIcon key={idx} data-testid={`empty-${idx}`} />
      ))}
    </HStack>
  );
};
