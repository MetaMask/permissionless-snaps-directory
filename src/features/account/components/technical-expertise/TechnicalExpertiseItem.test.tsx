import { act } from '@testing-library/react';

import { TechnicalExpertiseItem } from './TechnicalExpertiseItem';
import { createStore } from '../../../../store';
import { render, VALID_ACCOUNT_1 } from '../../../../utils/test-utils';
import { TrustworthinessScope } from '../../assertions/types';

jest.mock('../../../../components/EntityName', () => ({
  EntityName: () => <div data-testid="entity-name" />,
}));

describe('TechnicalExpertiseItem', () => {
  it('renders a set of endorsements', async () => {
    const store = createStore();

    const { queryAllByTestId } = await act(async () =>
      render(
        <TechnicalExpertiseItem
          endorsements={[
            {
              accountId: 'accountId',
              issuer: 'issuer1',
              creationAt: new Date(),
              issuanceDate: new Date(),
            },
            {
              accountId: 'accountId',
              issuer: 'issuer2',
              creationAt: new Date(),
              issuanceDate: new Date(),
            },
            {
              accountId: 'accountId',
              issuer: `did:pkh:eip155:1:${VALID_ACCOUNT_1}`,
              creationAt: new Date(),
              issuanceDate: new Date(),
            },
          ]}
          type={TrustworthinessScope.SoftwareSecurity}
          myDid={`did:pkh:eip155:1:${VALID_ACCOUNT_1}`}
        />,
        store,
      ),
    );

    expect(queryAllByTestId('entity-name')).toHaveLength(3);
  });

  it('renders a single endorsement', async () => {
    const store = createStore();

    const { queryAllByTestId, queryByText } = await act(async () =>
      render(
        <TechnicalExpertiseItem
          endorsements={[
            {
              accountId: 'accountId',
              issuer: `did:pkh:eip155:1:${VALID_ACCOUNT_1}`,
              creationAt: new Date(),
              issuanceDate: new Date(),
            },
          ]}
          type={TrustworthinessScope.SoftwareSecurity}
          myDid={`did:pkh:eip155:1:${VALID_ACCOUNT_1}`}
        />,
        store,
      ),
    );

    expect(queryAllByTestId('entity-name')).toHaveLength(1);
    expect(queryByText(',')).not.toBeInTheDocument();
  });

  it('renders an endorsement made by the connected user', async () => {
    const store = createStore();

    const { queryAllByTestId, getByText } = await act(async () =>
      render(
        <TechnicalExpertiseItem
          endorsements={[
            {
              accountId: 'accountId',
              issuer: VALID_ACCOUNT_1,
              creationAt: new Date(),
              issuanceDate: new Date(),
            },
            {
              accountId: 'accountId',
              issuer: 'issuer2',
              creationAt: new Date(),
              issuanceDate: new Date(),
            },
          ]}
          type={TrustworthinessScope.SoftwareSecurity}
          myDid={`did:pkh:eip155:1:${VALID_ACCOUNT_1}`}
        />,
        store,
      ),
    );

    expect(queryAllByTestId('entity-name')).toHaveLength(2);
    expect(getByText(',')).toBeInTheDocument();
  });

  it('renders extra-numerous endorsements', async () => {
    const store = createStore();

    const { queryAllByTestId, getByText } = await act(async () =>
      render(
        <TechnicalExpertiseItem
          endorsements={[
            {
              accountId: 'accountId',
              issuer: VALID_ACCOUNT_1,
              creationAt: new Date(),
              issuanceDate: new Date(),
            },
            {
              accountId: 'accountId',
              issuer: 'issuer2',
              creationAt: new Date(),
              issuanceDate: new Date(),
            },
            {
              accountId: 'accountId',
              issuer: 'issuer3',
              creationAt: new Date(),
              issuanceDate: new Date(),
            },
            {
              accountId: 'accountId',
              issuer: 'issuer4',
              creationAt: new Date(),
              issuanceDate: new Date(),
            },
          ]}
          type={TrustworthinessScope.SoftwareSecurity}
          myDid={`did:pkh:eip155:1:${VALID_ACCOUNT_1}`}
        />,
        store,
      ),
    );

    expect(queryAllByTestId('entity-name')).toHaveLength(3);
    expect(getByText('+ 1 more')).toBeInTheDocument();
  });
});
