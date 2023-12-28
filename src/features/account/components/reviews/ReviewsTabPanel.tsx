import { SimpleGrid } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

export const ReviewsTabPanel: FunctionComponent = () => {
  return (
    <SimpleGrid
      columns={[1, null, 2]}
      spacing="4"
      data-testid="reviews-tab"
    ></SimpleGrid>
  );
};
