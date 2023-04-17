import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { RootSiblingParent } from 'react-native-root-siblings';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';

import MainNavigator from './src/routes/MainNavigator';
import { store } from './src/store/store';

function App(): JSX.Element {
	useEffect(() => {
		SplashScreen.hide();
	}, []);

	return (
		<Provider store={store}>
			<NavigationContainer>
				<PaperProvider>
					<RootSiblingParent>
						<GestureHandlerRootView style={{ flex: 1 }}>
							<MainNavigator />
						</GestureHandlerRootView>
					</RootSiblingParent>
				</PaperProvider>
			</NavigationContainer>
		</Provider>
	);
}

export default App;
