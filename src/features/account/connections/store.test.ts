import { mock } from 'ts-mockito';

import { getAccountConnectedNodes } from './store';
import { type ApplicationState } from '../../../store';
import { type AccountAssertionsState } from '../assertions/store';

describe('getAccountConnectedNodes', () => {
  it('should return the correct connected nodes for a given account ID', () => {
    // Mock application state
    const applicationState = mock<ApplicationState>();
    const accountAssertionStates: AccountAssertionsState = {
      accountAssertions: [
        {
          accountId: '1',
          issuer: '2',
          trustworthiness: [],
          creationAt: new Date('2021-09-01'),
        },
        {
          accountId: '2',
          issuer: '3',
          trustworthiness: [],
          creationAt: new Date('2021-09-01'),
        },
        {
          accountId: '2',
          issuer: '4',
          trustworthiness: [],
          creationAt: new Date('2021-09-01'),
        },
      ],
    };

    applicationState.accountAssertions = accountAssertionStates;

    // Mock accountId
    const accountId = '1';

    // Call the selector with mock state
    const result = getAccountConnectedNodes(accountId)(applicationState);

    // Assert the result
    expect(result.nodes).toHaveLength(4);
    expect(result.links).toHaveLength(3);
  });
});
