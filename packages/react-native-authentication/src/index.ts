/**
 * A provider is responsible to the integration with the service it concerns.
 *
 * It is not responsible to:
 *  - Store the user in a local storage
 *  - Validate an access token with a custom API call
 *
 * This will be managed at the AuthenticationProvider level
 */
abstract class IAuthProvider<SignInParams extends any, SignInResult extends any> {
  abstract signIn(params: SignInParams): Promise<SignInResult>;
}

type SignInParams<T extends typeof IAuthProvider> = Parameters<InstanceType<T>['signIn']>[0];
type SignInResult<T extends typeof IAuthProvider> = ReturnType<InstanceType<T>['signIn']>;

class GoogleProvider extends IAuthProvider<null, string> {
  async signIn() {
    return 'Hello from google';
  }
}

class CredentialProvider extends IAuthProvider<{ username: string; password: string }, number> {
  name(): 'credential' {
    return 'credential';
  }

  async signIn(params: { username: string; password: string }): Promise<number> {
    return 42;
    // return JSON.stringify(params);
  }
}

/*export const config = {
  providers: [new GoogleProvider(), new CredentialProvider()],
};*/

const test = async <T extends typeof IAuthProvider<any, any>>(
  clazz: T,
  params: SignInParams<T>,
): Promise<SignInResult<T>> => {
  return 0 as SignInResult<T>;
};

const script = async () => {
  const google = new CredentialProvider();
  await google.signIn(null);
  // const google = new GoogleProvider();
  const dd = await test(GoogleProvider, null);
  const ee = await test(CredentialProvider, { username: '', password: '' });
};
script();
