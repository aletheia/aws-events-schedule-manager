import Amplify, {Auth} from 'aws-amplify';

export interface AuthConfig {
  identityPoolId: string;
  region: string;
  identityPoolRegion: string;
  userPoolId: string;
  userPoolWebClientId: string;
}

export const configureCognito = async ({
  identityPoolId,
  region,
  identityPoolRegion,
  userPoolId,
  userPoolWebClientId,
}: AuthConfig) => {
  Amplify.configure({
    Auth: {
      identityPoolId,
      region,
      identityPoolRegion,
      userPoolId,
      userPoolWebClientId,
      mandatorySignIn: true,
    },
  });
};
export const logIn = async (email: string, password: string) => {
  try {
    const user = await Auth.signIn(email, password);
    console.log(user);
  } catch (e) {
    console.log(e);
  }
};
