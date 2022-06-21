import Amplify, {Auth} from 'aws-amplify';
import {User} from './interfaces';

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
  const loggedInUser = await Auth.signIn(email, password);
  const user: User = {
    name: loggedInUser.attributes.given_name,
    surname: loggedInUser.attributes.family_name,
  };
  return user;
};
