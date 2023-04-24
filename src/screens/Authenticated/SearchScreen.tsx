import { SafeAreaView } from 'react-native-safe-area-context';

import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { DashboardTabScreenProps } from '../../types/navigation';

const SearchScreen: React.FC<DashboardTabScreenProps<'SearchScreen'>> = () => {
	return (
		<SafeAreaView>
			<FocusAwareStatusBar
				barStyle={'dark-content'}
				translucent={false}
				backgroundColor={'white'}
				hidden={false}
			/>
		</SafeAreaView>
	);
};

export default SearchScreen;
