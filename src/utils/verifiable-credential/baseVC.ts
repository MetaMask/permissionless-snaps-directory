import type { Hex } from '@metamask/utils';
import type { SignTypedDataArgs } from '@wagmi/core';
import type { TypedDataDomain } from 'viem';

import {
  TrustCredentialType,
  type PKHDid,
  type CredentialSubject,
  type Assertion,
  type SignedAssertion,
  type TypedDataTypes,
} from './types';

export abstract class BaseVerifiableCredential {
  chainId: number;

  primaryType = TrustCredentialType.VerifiableCredential;

  eip712DomainType = {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
    ],
  };

  verifiableCredentialType = {
    VerifiableCredential: [
      {
        name: '@context',
        type: 'string[]',
      },
      {
        name: 'type',
        type: 'string[]',
      },
      {
        name: 'issuer',
        type: 'string',
      },
      {
        name: 'credentialSubject',
        type: 'CredentialSubject',
      },
      {
        name: 'issuanceDate',
        type: 'string',
      },
    ],
  };

  proofTypes = {
    Proof: [
      { name: 'created', type: 'string' },
      { name: 'proofPurpose', type: 'string' },
      { name: 'type', type: 'string' },
      { name: 'verificationMethod', type: 'string' },
    ],
  };

  abstract credentialType: TrustCredentialType;

  abstract credentialSubjectTypes: TypedDataTypes;

  constructor(chainId: number) {
    this.chainId = chainId;
  }

  protected getIssuerDid(address: Hex): PKHDid {
    return `did:pkh:eip155:${this.chainId}:${address}`;
  }

  protected getMessagePayload(
    issuer: PKHDid,
    credentialSubject: CredentialSubject,
  ): Assertion {
    const issuanceDate = new Date().toISOString();
    return {
      '@context': ['https://www.w3.org/2018/credentials/v2'],
      type: [this.primaryType, this.credentialType],
      issuanceDate,
      issuer,
      credentialSubject,
    };
  }

  protected getCredentialDomain = (): TypedDataDomain => {
    return {
      name: this.primaryType,
      version: '1',
      chainId: this.chainId,
    };
  };

  protected buildSignPayload(
    address: Hex,
    credentialSubject: CredentialSubject,
  ): SignTypedDataArgs {
    return {
      domain: this.getCredentialDomain(),
      message: this.getMessagePayload(
        this.getIssuerDid(address),
        credentialSubject,
      ),
      types: {
        ...this.eip712DomainType,
        ...this.verifiableCredentialType,
        ...this.credentialSubjectTypes,
      },
      primaryType: this.primaryType,
    };
  }

  protected getSignedEIP712Proof(signArg: SignTypedDataArgs, signature: Hex) {
    const createDate = new Date().toISOString();
    const verifiableCredential =
      this.verifiableCredentialType.VerifiableCredential.slice();
    verifiableCredential?.push({
      name: 'proof',
      type: 'Proof',
    });

    return {
      type: 'EthereumEip712Signature2021',
      proofValue: signature,
      proofPurpose: 'assertionMethod',
      verificationMethod: `${
        (signArg.message as Assertion).issuer
      }#blockchainAccountId`,
      created: createDate,
      eip712: {
        domain: this.getCredentialDomain(),
        types: {
          ...this.eip712DomainType,
          VerifiableCredential: verifiableCredential,
          ...this.credentialSubjectTypes,
          Proof: this.proofTypes.Proof,
        },
        primaryType: this.primaryType,
      },
    };
  }

  getSignedAssertion(
    signArg: SignTypedDataArgs,
    signature: Hex,
  ): SignedAssertion {
    return {
      ...(signArg.message as Assertion),
      proof: this.getSignedEIP712Proof(signArg, signature),
    };
  }
}
