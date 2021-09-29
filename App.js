import React, { useState } from 'react';
import { StatusBar, AsyncStorage, SafeAreaView } from 'react-native';
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import RootNavigator from './src/navigator/appNavigator';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import store from './src/redux/store/store';
import colors from './src/constants/colors';
import Parse from 'parse/react-native';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize("F930d5lx5zXy8LNH1CpLa6AaLfMMFfZY");
Parse.serverURL = "https://colmena-project.herokuapp.com/parse";

const fetchFonts = () => {
  return Font.loadAsync({
    'Nunito-Black': require('./assets/fonts/Nunito-Black.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'Nunito-ExtraBold': require('./assets/fonts/Nunito-ExtraBold.ttf'),
    'Nunito-Italic': require('./assets/fonts/Nunito-Italic.ttf'),
    'Nunito-Light': require('./assets/fonts/Nunito-Light.ttf'),
    'Nunito-Regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('./assets/fonts/Nunito-SemiBold.ttf'),
    'Lato-Black': require('./assets/fonts/Lato-Black.ttf'),
    'Lato-BlackItalic': require('./assets/fonts/Lato-BlackItalic.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
    'Lato-BoldItalic': require('./assets/fonts/Lato-BoldItalic.ttf'),
    'Lato-Hairline': require('./assets/fonts/Lato-Hairline.ttf'),
    'Lato-HairlineItalic': require('./assets/fonts/Lato-HairlineItalic.ttf'),
    'Lato-Italic': require('./assets/fonts/Lato-Italic.ttf'),
    'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
    'Lato-LightItalic': require('./assets/fonts/Lato-LightItalic.ttf'),
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'Mulish-Regular': require('./assets/fonts/Mulish-Regular.ttf'),
  })
};

enableScreens();

export default App = () => {

  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}>
      </AppLoading>
    )
  }

  const fontConfig = {
    default: {
      bold: {
        fontFamily: 'Nunito-Bold',
        fontWeight: 'bold',
      },
      regular: {
        fontFamily: 'Nunito-Regular',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Nunito-Light',
        fontWeight: 'normal',
      },
      latobold: {
        fontFamily: 'Lato-Bold',
        fontWeight: 'bold',
      },
      latoregular: {
        fontFamily: 'Lato-Regular',
        fontWeight: 'normal',
      },
      latolight: {
        fontFamily: 'Lato-Light',
        fontWeight: 'normal',
      },
    },
  };

  const theme = {
    ...DefaultTheme,
    roundness: 5,
    elevation: 2,
    fonts: configureFonts(fontConfig),
    colors: {
      ...DefaultTheme.colors,
      primary: colors.colmenaGreen,
      accent: colors.primaryDavysGray,
      background: colors.background
    },
  };

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar barStyle="light-content" backgroundColor={colors.colmenaGreen} />
        <SafeAreaView style={{ flex: 1 }}>
          <RootNavigator />
        </SafeAreaView>
      </PaperProvider>
    </Provider>
  );
};