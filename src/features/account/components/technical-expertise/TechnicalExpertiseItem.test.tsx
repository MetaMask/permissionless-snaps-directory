import { act } from '@testing-library/react';

import { TechnicalExpertiseItem } from './TechnicalExpertiseItem';
import { createStore } from '../../../../store';
import { render, VALID_ACCOUNT_1 } from '../../../../utils/test-utils';
import { SubjectType, Value } from '../../assertions/enums';
import type { AccountAssertionState } from '../../assertions/store';
import { TrustworthinessScope } from '../../assertions/types';

jest.mock('../../../../components/EntityName', () => ({
  EntityName: () => <div data-testid="entity-name" />,
}));

const generateEndorsements = (count: number, issuerIds: string[]) => {
  return Array.from({ length: count }, (_, i) => ({
    subjectId: 'subjectId',
    subjectType: SubjectType.User,
    issuerId: issuerIds[i],
    creationAt: new Date(),
    issuanceDate: new Date(),
    reasons: ['Reason 1', 'Reason 2'],
    value: Value.Endorsement,
    statusReason: { type: 'Endorse', value: ['Endorsed'] },
    trustworthiness: [],
  })) as AccountAssertionState[];
};

describe('TechnicalExpertiseItem', () => {
  it('renders a set of endorsements', async () => {
    const store = createStore();

    const endorsements = generateEndorsements(3, [
      'issuer1',
      'issuer1',
      'issuer1',
    ]);

    const { queryAllByTestId } = await act(async () =>
      render(
        <TechnicalExpertiseItem
          endorsements={endorsements}
          type={TrustworthinessScope.SoftwareSecurity}
          myAddress={VALID_ACCOUNT_1}
        />,
        store,
      ),
    );

    expect(queryAllByTestId('entity-name')).toHaveLength(3);
  });

  it('renders a single endorsement', async () => {
    const store = createStore();

    const endorsements = generateEndorsements(1, [VALID_ACCOUNT_1]);

    const { queryAllByTestId, queryByText } = await act(async () =>
      render(
        <TechnicalExpertiseItem
          endorsements={endorsements}
          type={TrustworthinessScope.SoftwareSecurity}
          myAddress={VALID_ACCOUNT_1}
        />,
        store,
      ),
    );

    expect(queryAllByTestId('entity-name')).toHaveLength(1);
    expect(queryByText(',')).not.toBeInTheDocument();
  });

  it('renders an endorsement made by the connected user', async () => {
    const store = createStore();

    const endorsements = generateEndorsements(2, [VALID_ACCOUNT_1, 'issuer2']);

    const { queryAllByTestId, getByText } = await act(async () =>
      render(
        <TechnicalExpertiseItem
          endorsements={endorsements}
          type={TrustworthinessScope.SoftwareSecurity}
          myAddress={VALID_ACCOUNT_1}
        />,
        store,
      ),
    );

    expect(queryAllByTestId('entity-name')).toHaveLength(2);
    expect(getByText(',')).toBeInTheDocument();
  });

  it('renders extra-numerous endorsements', async () => {
    const store = createStore();

    const endorsements = generateEndorsements(4, [
      VALID_ACCOUNT_1,
      'issuer2',
      'issuer3',
      'issuer4',
    ]);

    const { queryAllByTestId, getByText } = await act(async () =>
      render(
        <TechnicalExpertiseItem
          endorsements={endorsements}
          type={TrustworthinessScope.SoftwareSecurity}
          myAddress={VALID_ACCOUNT_1}
        />,
        store,
      ),
    );

    expect(queryAllByTestId('entity-name')).toHaveLength(3);
    expect(getByText('+ 1 more')).toBeInTheDocument();
  });
});
