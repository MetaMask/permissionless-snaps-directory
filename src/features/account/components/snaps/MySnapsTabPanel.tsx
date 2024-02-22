import { Box } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { FilteredSnaps } from '../../../snaps/FilteredSnaps';

export const MySnapsTabPanel: FunctionComponent = () => {
  return (
    <Box data-testid="my-snaps-tab">
      <FilteredSnaps limit={3} images={true} />
    </Box>
  );
};
