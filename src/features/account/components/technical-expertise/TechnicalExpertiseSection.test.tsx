import { act } from '@testing-library/react';
import { getAddress } from 'viem';

import { TechnicalExpertiseSection } from './TechnicalExpertiseSection';
import { useSelector, useVerifiableCredential } from '../../../../hooks';
import { createStore } from '../../../../store';
import { render, VALID_ACCOUNT_1 } from '../../../../utils/test-utils';
import type { AccountAssertionState } from '../../assertions/store';
import { TrustworthinessScope } from '../../assertions/types';

jest.mock('../../../../hooks', () => ({
  ...jest.requireActual('../../../../hooks'),
  useSelector: jest.fn(),
  useVerifiableCredential: jest.fn(),
}));

jest.mock('./TechnicalExpertiseItem', () => ({
  TechnicalExpertiseItem: () => <div data-testid="technical-expertise-item" />,
}));

jest.mock('viem', () => ({
  getAddress: jest.fn(),
}));

jest.mock('wagmi', () => ({
  useEnsName: () => ({
    data: 'test.eth',
    loading: false,
  }),
  createConfig: jest.fn(),
}));

describe('TechnicalExpertiseSection', () => {
  let mockUseSelector: jest.Mock;
  let mockUseVerifiableCredential: jest.Mock;
  let mockGetAddress: jest.Mock;

  beforeEach(() => {
    mockUseSelector = useSelector as jest.Mock;

    mockUseVerifiableCredential = useVerifiableCredential as jest.Mock;
    mockUseVerifiableCredential.mockClear();
    mockUseVerifiableCredential.mockReturnValue({
      accountVCBuilder: {
        getSubjectDid: jest.fn().mockReturnValue('accountId'),
      },
    });
    mockGetAddress = getAddress as jest.Mock;
    mockGetAddress.mockClear();
  });

  it('renders technical expertises', async () => {
    const address = '0x6B24aE0ABbeb67058D07b891aF415f288eA57Cc7';
    mockGetAddress.mockReturnValue(address);
    const accountAssertion1: AccountAssertionState = {
      accountId: 'accountId',
      issuer: '0xIssuer1',
      trustworthiness: [
        { level: 1, scope: TrustworthinessScope.SoftwareDevelopment },
      ],
      creationAt: new Date('2022-01-01'),
    };
    const accountAssertion2: AccountAssertionState = {
      accountId: 'accountId',
      issuer: '0xIssuer2',
      trustworthiness: [
        { level: 1, scope: TrustworthinessScope.SoftwareDevelopment },
      ],
      creationAt: new Date('2022-01-01'),
    };
    const accountAssertion3: AccountAssertionState = {
      accountId: 'accountId',
      issuer: '0xIssuer3',
      trustworthiness: [
        { level: 1, scope: TrustworthinessScope.SoftwareSecurity },
      ],
      creationAt: new Date('2022-01-01'),
    };
    mockUseSelector.mockReturnValueOnce([
      {
        type: TrustworthinessScope.SoftwareDevelopment,
        endorsements: [accountAssertion1, accountAssertion2],
      },
      {
        type: TrustworthinessScope.SoftwareSecurity,
        endorsements: [accountAssertion3],
      },
    ]);

    const store = createStore();

    const { queryAllByTestId } = await act(async () =>
      render(<TechnicalExpertiseSection address={address} />, store),
    );

    expect(queryAllByTestId('technical-expertise-item')).toHaveLength(2);
  });

  it('renders an empty section when there is no technical expertise', async () => {
    const address = VALID_ACCOUNT_1;
    const store = createStore();

    const { queryByTestId } = await act(async () =>
      render(<TechnicalExpertiseSection address={address} />, store),
    );

    expect(queryByTestId('technical-expertise-item')).not.toBeInTheDocument();
  });
});
