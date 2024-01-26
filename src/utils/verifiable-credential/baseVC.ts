import type { Hex } from '@metamask/utils';
import type { SignTypedDataArgs } from '@wagmi/core';

import {
  TrustCredentialType,
  type PKHDid,
  type CredentialSubject,
  type Assertion,
  type SignedAssertion,
} from './types';

export abstract class BaseVerifiableCredential {
  chainId: number;

  abstract primaryType: TrustCredentialType;

  abstract credentialSubjectTypes: Record<string, any>;

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
    return {
      '@context': ['https://www.w3.org/2018/credentials/v2'],
      type: [TrustCredentialType.VerifiableCredential, this.primaryType],
      issuer,
      credentialSubject,
    };
  }

  protected getEIP712TrustCredentialDomain = () => {
    return {
      name: 'EIP712TrustCredential',
      version: '1',
      chainId: this.chainId,
    };
  };

  protected buildSignPayload(
    address: Hex,
    credentialSubject: CredentialSubject,
  ): SignTypedDataArgs {
    return {
      domain: this.getEIP712TrustCredentialDomain(),
      message: this.getMessagePayload(
        this.getIssuerDid(address),
        credentialSubject,
      ),
      types: this.credentialSubjectTypes,
      primaryType: this.primaryType,
    };
  }

  protected getEIP712Proof(signArg: SignTypedDataArgs, signature: Hex) {
    return {
      type: 'EthereumEip712Signature2021',
      proofValue: signature,
      proofPurpose: 'assertionMethod',
      eip712: {
        domain: signArg.domain,
        types: signArg.types,
        message: signArg.message,
        primaryType: signArg.primaryType,
        Proof: [
          {
            name: 'created',
            type: 'string',
          },
          {
            name: 'proofPurpose',
            type: 'string',
          },
          {
            name: 'type',
            type: 'string',
          },
          {
            name: 'verificationMethod',
            type: 'string',
          },
        ],
      },
    };
  }

  getSignedAssertion(
    signArg: SignTypedDataArgs,
    signature: Hex,
  ): SignedAssertion {
    return {
      ...(signArg.message as Assertion),
      proof: this.getEIP712Proof(signArg, signature),
    };
  }
}
