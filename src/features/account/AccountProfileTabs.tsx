import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import {
  SecurityReportsTabPanel,
  TrustedCircleTabPanel,
  ReviewsTabPanel,
  MySnapsTabPanel,
} from './components';

export const AccountProfileTabs: FunctionComponent = () => {
  return (
    <Tabs align="center" size="lg" data-testid="account-profile-tabs">
      <TabList>
        <Tab>
          <Trans>Developed Snaps</Trans>
        </Tab>
        <Tab>
          <Trans>Security Reports</Trans>
        </Tab>
        <Tab>
          <Trans>Reviews</Trans>
        </Tab>
        <Tab>
          <Trans>Trusted Circle</Trans>
        </Tab>
      </TabList>

      <TabIndicator mt="-0.375rem" height="0.5rem" bg="text.default" />

      <TabPanels>
        <TabPanel>
          <MySnapsTabPanel />
        </TabPanel>
        <TabPanel>
          <SecurityReportsTabPanel />
        </TabPanel>
        <TabPanel>
          <ReviewsTabPanel />
        </TabPanel>
        <TabPanel>
          <TrustedCircleTabPanel />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
