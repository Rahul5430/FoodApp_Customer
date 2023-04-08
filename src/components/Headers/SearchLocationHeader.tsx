import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { colors } from '../../themes';
import { StatusBar } from 'expo-status-bar';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Constants from 'expo-constants';

const SearchLocationHeader = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const skip = () => {
		console.log('Pressed skip');
	};

	const search = (query: string) => {
		console.log(query);
		setSearchQuery(query);
	};

	return (
		<View style={styles.view}>
			<StatusBar style='dark' />
			<View style={styles.searchBarTitle}>
				<Pressable style={styles.skipBtn} onPress={() => skip()}>
					<Text style={styles.text}>Skip</Text>
					<MaterialIcons
						name='chevron-right'
						size={20}
						color={colors.white}
					/>
				</Pressable>
			</View>
			<Searchbar
				style={styles.searchBar}
				placeholder='Enter your location'
				onChangeText={search}
				value={searchQuery}
				elevation={5}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	view: {
		backgroundColor: colors.primaryButton,
		paddingTop: Constants.statusBarHeight,
	},
	searchBarTitle: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	skipBtn: {
		flexDirection: 'row',
	},
	text: {
		color: colors.white,
		textAlign: 'right',
	},
	icon: {
		margin: 0,
		padding: 0,
	},
	searchBar: {
		margin: 15,
	},
});

export default SearchLocationHeader;
