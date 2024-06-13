import { createComposeClient } from './compose-client';
import type { Assertion, SnapCredentialSubject } from '../utils';

/**
 * This method writes the Snap Assertion to Ceramic.
 * @param assertion - The assertion to be written.
 * @param signature - The signature of the assertion.
 * @param address - The issuer address.
 * @param provider - The wallet provider.
 */
export async function writeSnapAssertion(
  assertion: Assertion,
  signature: string,
  address: string,
  provider: any,
) {
  const composeClient = await createComposeClient(provider, address);
  const query = `
        mutation CreateSnapAssertion {
          setSnapAssertion(input: {
            content: {
              context: ["${assertion['@context']}"]
              type: [${assertion.type.map((typ) => `"${typ}"`)}]
              issuanceDate: "${assertion.issuanceDate}"
              snapId: "${assertion.credentialSubject.id}"
              credentialSubject: {
                currentStatus: "${
                  (assertion.credentialSubject as SnapCredentialSubject)
                    .currentStatus
                }"
                statusReason: {
                  type: "${
                    (assertion.credentialSubject as SnapCredentialSubject)
                      .statusReason.type
                  }"
                  value: [${(
                    assertion.credentialSubject as SnapCredentialSubject
                  ).statusReason.value.map((val) => `"${val}"`)}]
                }
              }
              proofValue: "${signature}"
            }
          })
          {
            document {
              id
              issuer {
                id
              }
              snapId
              credentialSubject {
                currentStatus
                statusReason {
                  type
                  value
                }
              }
              proofValue
            }
          }
        }
    `;
  const result = await composeClient.executeQuery(query);

  console.log('Result', JSON.stringify(result));
}
