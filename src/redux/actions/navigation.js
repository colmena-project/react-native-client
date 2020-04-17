import * as types from './types';

import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

import Parse from 'parse/react-native';

const setLoggedInState = loggedInState => ({
  type: types.SET_LOGGED_IN_STATE,
  loggedInState,
});

const login = (email, password) => {
  const action = async dispatch => {
    return await Parse.User.logIn(email, password).then(
      user => {
        dispatch(setLoggedInState(true));
        return true;
      },
      error => {
        dispatch(setLoggedInState(false));
        return false;
      },
    );
  };
  return action;
};

const loginFb = () => {
  const action = async dispatch => {
    Parse.User.enableUnsafeCurrentUser();
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw new Error('Solicitud cancelada por el usuario');
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      console.log('Error al obtener el token de acceso del usuario');
      throw new Error(
        'Se produjo un error al obtener el token de acceso del usuario.',
      );
    }

    try {
      let success = false;
      const graphRequest = new GraphRequest(
        '/me',
        {
          accessToken: data.accessToken,
          parameters: {
            fields: {
              string:
                'first_name, middle_name, last_name, name, short_name, email, picture.type(large)',
            },
          },
        },
        (error, r) => {
          if (error) {
            dispatch(setLoggedInState(false));
          } else {
            Parse.User.currentAsync().then(async user => {
              user = await Parse.User.logInWith('facebook', {
                authData: {
                  id: data.userID,
                  access_token: data.accessToken,
                  expiration_date: data.expirationTime,
                },
              });
              const account = await Parse.Cloud.run('getMyAccount');
              if (!account) {
                console.log('SIN ACCOUNT.');
                await Parse.Cloud.run('createAccount', {
                  firstName: r.first_name,
                  middleName: r.middle_name,
                  lastName: r.last_name,
                  nickname: r.short_name,
                  facebookProfilePhotoUrl: r.picture.data.url,
                });
              } else {
                console.log('CON ACCOUNT.');
                if (!account.account.get('firstName')) {
                  account.set('firstName', r.first_name);
                }
                if (!account.account.get('middleName')) {
                  account.account.set('middleName', r.middle_name);
                }
                if (!account.account.get('lastName')) {
                  account.account.set('lastName', r.last_name);
                }
                if (!account.account.get('nickname')) {
                  account.account.set('nickname', r.short_name);
                }
                account.account.set(
                  'facebookProfilePhotoUrl',
                  r.picture.data.url,
                );
                await account.account.save();
              }
              dispatch(setLoggedInState(true));
            });
          }
        },
      );
      new GraphRequestManager().addRequest(graphRequest).start();
      return true;
    } catch (error) {
      console.log('Error en GraphRequest');
      throw new Error('Error en GraphRequest:' + error);
    }
  };
  return action;
};

export {login, loginFb, setLoggedInState};
