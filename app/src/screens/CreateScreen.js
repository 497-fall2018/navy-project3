import React, {Component} from 'react';
import { AppRegistry,ImagePickerIOS,CameraRoll, TouchableOpacity,Image, Platform, ScrollView, StyleSheet, TouchableHighlight, View, TextInput, Switch, PermissionsAndroid  } from 'react-native';
import { WebBrowser, Icon, ImagePicker, Permissions, Camera } from 'expo';
import { Container, Header, Content, Button, Text } from 'native-base';
import axios from 'axios';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Form from 'react-native-form';


export default class CreateScreen extends Component {
	static navigationOptions = {
		header: null,
	};
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			name: '',
			description: '',
			image: null,
			price: ''
		};
	};

	handleSubmit(data) {
		console.log(data);
		this.setState({name: ''});
		this.setState({description: ''});
		this.setState({price: ''});
		var formData = new FormData();
		formData.append("title", data.name);
		formData.append("description", data.description);
		formData.append("price", data.price);
		formData.append("image", data.image);
		const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
		axios.post(`http://navy.mmoderwell.com/api/post/`, formData, config
		// 	{
        //     "title": data.name,
        //     "description": data.description,
        //     "price": data.price
        // }
	)
          .then((response) => {
          	console.log("success");
          	this.props.navigation.navigate('HomeScreen');
          })
          .catch((error) => {console.log("err");});
	}

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
				// if (!image.cancelled) {
				// 	this.setState({ image: image})
				// }
			} else {
			  throw new Error('Camera permissions not granted');
			}
		}
		getCameraAsync();
		//let image = await ImagePicker.launchCameraAsync().catch(error => console.log({ error }));
	};
	async takePicture(){
	  console.log('Button Pressed');
	  if (this.camera){
	    const options = { quality: 0.2}
	    var i = 0;
	    var focus = 0.1;
	    var image_array = []
	    var focus_array = []
	    var urls = [];
	    for (i = 0; i < 10; i++){
	      console.log('taking photo')
	      this.setState({focusDepth: focus});
	      let photo = await this.camera.takePictureAsync(options);
	      image_array.push(photo);
	      focus_array.push(String(focus))
	      focus += 0.1;
	      // urls.push(test);
	    }

	    this.setState({loading: true});

	    folder_name = image_array[0].uri // name folder after first one
	    folder_name = folder_name.split("/")
	    folder_name = folder_name[folder_name.length - 1]
	    folder_name = folder_name.split(".")
	    folder_name = folder_name[0]
	    console.log(folder_name);

	    CameraRoll.saveToCameraRoll(image_array[0].uri);
	    CameraRoll.saveToCameraRoll(image_array[5].uri);
	    CameraRoll.saveToCameraRoll(image_array[9].uri);

	    this.setState({ imageURI: image_array[0].uri});

	    for (i = 0; i < image_array.length; i++){
	      let test = await this.uploadImageAsync(image_array[i].uri, focus_array[i], folder_name);
	      this.setState({progress: i/image_array.length});
	    }

		this.setState({name: ''});
		this.setState({description: ''});
		this.setState({price: ''});
		var formData = new FormData();
		formData.append("title", data.name);
		formData.append("description", data.description);
		formData.append("price", data.price);
		formData.append("image", data.imageURI);
		const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
		axios.post(`http://navy.mmoderwell.com/api/post/`, formData, config
		// 	{
        //     "title": data.name,
        //     "description": data.description,
        //     "price": data.price
        // }
	)
          .then((response) => {
          	console.log("success");
          	this.props.navigation.navigate('HomeScreen');
          })
          .catch((error) => {console.log("err");});
	    this.setState({progress: 0})
	    this.setState({loading: false});
	  }
	}
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
			<ScrollView style={styles.container}>
				<View style={styles.formContainer}>
					<Text style={styles.title}>
						Let's add a <Text style={{fontWeight: 'bold', fontSize: 30}} >new item</Text>
					</Text>
					{/*<Form ref="form">
						<View style={styles.text_div}>
							<Text>Title</Text>
							<TextInput style={styles.text_input} type="TextInput" name="nameInput" value={this.state.name}
							onChangeText={(name) => this.setState({name})} />
						</View>
						<View style={styles.text_div}>
							<Text>Price</Text>
							<TextInput style={styles.text_input} type="TextInput" name="priceInput" value={this.state.price}
							onChangeText={(price) => this.setState({price})} />
						</View>
						<View style={styles.text_div}>
							<Text>Description</Text>
							<TextInput style={styles.text_input} type="TextInput" name="descriptionInput" value={this.state.description}
							onChangeText={(description) => this.setState({description})} multiline = {true} numberOfLines = {4} maxLength = {240} />
						</View>
					</Form>*/
				}
					<Camera style={{ flexDirection: 'row',flex: 1 }} type={this.state.type} autoFocus={this.state.autoFocus}
              focusDepth={this.state.focusDepth} useCamera2Api={true}
              ref={ref => { this.camera = ref; }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={{
                      flex:0.2,
                      alignSelf: 'flex-end',
                      alignItems:'center'
                    }}
                    onPress={this.takePicture.bind(this)}
                    >
                    <Image
                    style = {{marginBottom: 5, marginLeft: 10, width: 50, height: 50}}
                    source = {require('../assets/images/robot-dev.png')}
                    />
                </TouchableOpacity>
                </View>
              </Camera>
				</View>
				<View style={styles.submitContainer}>
					<Button style={styles.submit_button} onPress={() => this.handleSubmit(this.state)}>
						<Text>Submit</Text>
					</Button>
				</View>
	 		</ScrollView>
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
		paddingBottom: 50,
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
