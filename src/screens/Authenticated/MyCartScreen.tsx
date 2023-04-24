import { SafeAreaView } from 'react-native-safe-area-context';

import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { DashboardTabScreenProps } from '../../types/navigation';

const MyCartScreen: React.FC<DashboardTabScreenProps<'MyCartScreen'>> = () => {
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

export default MyCartScreen;
