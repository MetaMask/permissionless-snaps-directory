import { createComposeClient } from './compose-client';
import type { Assertion, AccountCredentialSubject } from '../utils';

/**
 * This method writes the Account Assertion to Ceramic.
 * @param assertion - The assertion to be written.
 * @param signature - The signature of the assertion.
 * @param address - The issuer address.
 * @param provider - The wallet provider.
 */
export async function writeAccountAssertion(
  assertion: Assertion,
  signature: string,
  address: string,
  provider: any,
) {
  const composeClient = await createComposeClient(provider, address);
  const query = `
      mutation CreateAccountAssertion {
        setAccountAssertion(input: {
          content: {
            context: ["${assertion['@context']}"]
            type: [${assertion.type.map((typ) => `"${typ}"`)}]
            issuanceDate: "${assertion.issuanceDate}"
            subjectId: "${assertion.credentialSubject.id}"
            credentialSubject: {
              trustWorthiness: [
                ${(
                  assertion.credentialSubject as AccountCredentialSubject
                ).trustworthiness.map((tw) => {
                  return `{
                    scope: "${tw.scope}"
                    level: ${tw.level}
                    reason: [${(tw.reason as string[]).map(
                      (reason) => `"${reason}"`,
                    )}]
                  }`;
                })}
              ]
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
            subjectId {
              id
            }
            credentialSubject {
              trustWorthiness {
                level
                scope
                reason
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
