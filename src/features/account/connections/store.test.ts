import { mock } from 'ts-mockito';

import { getAccountConnectedNodes } from './store';
import { type ApplicationState } from '../../../store';
import { SubjectType, Value } from '../assertions/enums';

describe('getAccountConnectedNodes', () => {
  it('should return the correct connected nodes for a given account ID', () => {
    // Mock application state
    const applicationState = mock<ApplicationState>();
    applicationState.accountAssertions = {
      accountAssertions: [
        {
          subjectId: '1',
          issuerId: '2',
          trustworthiness: [],
          creationAt: new Date('2021-09-01'),
          value: Value.Endorsement,
          subjectType: SubjectType.User,
          issuanceDate: new Date('2021-09-01'),
          statusReason: { type: 'test', value: ['test'] },
          reasons: ['test'],
        },
        {
          subjectId: '2',
          issuerId: '3',
          trustworthiness: [],
          creationAt: new Date('2021-09-01'),
          value: Value.Endorsement,
          subjectType: SubjectType.User,
          issuanceDate: new Date('2021-09-01'),
          statusReason: { type: 'test', value: ['test'] },
          reasons: ['test'],
        },
        {
          subjectId: '2',
          issuerId: '4',
          trustworthiness: [],
          creationAt: new Date('2021-09-01'),
          value: Value.Endorsement,
          subjectType: SubjectType.User,
          issuanceDate: new Date('2021-09-01'),
          statusReason: { type: 'test', value: ['test'] },
          reasons: ['test'],
        },
        {
          subjectId: '2',
          issuerId: '3',
          trustworthiness: [],
          creationAt: new Date('2021-09-01'),
          value: Value.Endorsement,
          subjectType: SubjectType.User,
          issuanceDate: new Date('2021-09-01'),
          statusReason: { type: 'test', value: ['test'] },
          reasons: ['test'],
        },
      ],
      issuedAssertions: [],
    };

    // Mock subjectId
    const subjectId = '1';

    // Call the selector with mock state
    const result = getAccountConnectedNodes(subjectId)(applicationState);

    // Assert the result
    expect(result.nodes).toHaveLength(4);
    expect(result.links).toHaveLength(3);
  });
});
