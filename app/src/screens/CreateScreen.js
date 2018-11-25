import React, {Component} from 'react';
import { Image, Platform, ScrollView, StyleSheet, TouchableHighlight, View, TextInput, Switch, PermissionsAndroid,  } from 'react-native';
import { WebBrowser, Icon, ImagePicker, Permissions } from 'expo';
import { Container, Header, Content, Button, Text } from 'native-base';

import Form from 'react-native-form'


export default class HomeScreen extends Component {
	static navigationOptions = {
		header: null,
	};
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			name: 'Name',
			description: `Description`,
			image: null,
		};
	};

	_pickImage = async () => {
		async function getCameraAsync() {
			const { status } = await Permissions.askAsync(Permissions.CAMERA);
			if (status === 'granted') {
				getCameraRollAsync();
			} else {
			  throw new Error('Camera permissions not granted');
			}
		}
		async function getCameraRollAsync() {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status === 'granted') {
				let image = await ImagePicker.launchCameraAsync().catch(error => console.log({ error }));
			} else {
			  throw new Error('Camera permissions not granted');
			}
		}
		getCameraAsync();
		//let image = await ImagePicker.launchCameraAsync().catch(error => console.log({ error }));
	};

	async componentWillMount() {
		await Expo.Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
		});
		this.setState({ loading: false });
	}
	render() {
		let { image } = this.state;

		if (this.state.loading) {
			return <Expo.AppLoading />;
		}
		return (
			<View style={styles.container}>
				<Header/>
				<View style={styles.formContainer}>
					<Text style={styles.title}>Lets add a new item</Text>
					<Form ref="form">
						<View style={styles.text_div}>
							<TextInput style={styles.text_input} type="TextInput" name="nameInput" value={this.state.name} 
							onChangeText={(name) => this.setState({name})} />
						</View>
						<View style={styles.text_div}>
							<TextInput style={styles.text_input} type="TextInput" name="descriptionInput" value={this.state.description} 
							onChangeText={(description) => this.setState({description})} multiline = {true} numberOfLines = {4} maxLength = {240} />
						</View>
					</Form>
					<TouchableHighlight style={styles.camera_button} onPress={this._pickImage} >
						<View>
							<Icon.Ionicons
								name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'}
								size={26}
								style={{ marginBottom: -3 }}
							/>
						</View>
					</TouchableHighlight>
				</View>
				<View style={styles.submitContainer}>
					<Button style={styles.submit_button}>
						<Text>Submit</Text>
					</Button>
				</View>
	 		</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	formContainer: {
		flex: 5,
		padding: 30,
	},
	title: {
		fontSize: 30,
		alignItems: 'center',
		paddingBottom: 20,
	},	
	text_input: {
		paddingLeft: 10,
	},
	text_div: {
		padding: 10,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: '#DDDDDD',
		borderRadius: 7
	},
	camera_button: {
		alignItems: 'center',
		backgroundColor: '#DDDDDD',
		padding: 10,
		borderRadius: 7
	},
	submitContainer: {
		flex: 1,
		padding: 30,
		alignItems: 'center',
	},
	submit_button: {
		borderRadius: 7,
		paddingLeft: 20,
		paddingRight: 20,
	},
});