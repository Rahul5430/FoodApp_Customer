import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider } from 'react-redux';

import MainNavigator from './src/routes/MainNavigator';
import { store } from './src/store/store';

function App(): JSX.Element {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<PaperProvider>
					<RootSiblingParent>
						<MainNavigator />
					</RootSiblingParent>
				</PaperProvider>
			</NavigationContainer>
		</Provider>
	);
}

export default App;
