import React, { Component } from 'react';
import Comments from 'react-native-comments';
import {
	Container,
	Header,
	Content,
	Button,
	Text,
	Card,
	CardItem,
	Body,
	Icon
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { View, ScrollView, TouchableOpacity, Image, RefreshControl, Alert } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import GestureRecognizer from 'react-native-swipe-gestures';
import {
	submit_new_vote_buy,
	submit_new_vote_nah,
	toggle_full_text
} from '../../ducks/post';

import SCREEN_IMPORT from 'Dimensions'

const SCREEN_WIDTH = SCREEN_IMPORT.get('window').width;
const SCREEN_HEIGHT = SCREEN_IMPORT.get('window').height;

const styles = ({
	container: {
		paddingTop: 40,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	button: {}
});

class ItemDisplayComponent extends Component {
	onSwipeLeft(gestureState) {
		let post = this.props.posts.filter(x => x['_id'] === this.props.curr_post_id);
		let new_nah_vote = post[0]['nah'] + 1;
		let str = "NAH! \n buy: " + post[0]['buy'].toString() + "\n nah: " + new_nah_vote.toString();
		Alert.alert(str);
		this.props.submit_new_vote_nah(new_nah_vote, this.props.curr_post_id);
	}
	onSwipeRight(gestureState) {
		let post = this.props.posts.filter(x => x['_id'] === this.props.curr_post_id);
		let new_buy_vote = post[0]['buy'] + 1;
		let str = "BUY! \n buy: " + new_buy_vote.toString() + "\n nah: " + post[0]['nah'].toString();
		Alert.alert(str);
		this.props.submit_new_vote_buy(new_buy_vote, this.props.curr_post_id);
	}
	toggleFullText = () => {
		this.props.toggle_full_text();
	}
	render() {
		return (
			<Container>
                    <Content>
                    <GestureRecognizer
                        onSwipeLeft={() => this.onSwipeLeft()}
                        onSwipeRight={() => this.onSwipeRight()}
                        style={{
                            flex: 1,
                        }}
                    >
                        <Card style={{flex: 1}}>
                            <CardItem>
                                <Body style={{alignItems: "center"}}>
                                    <View style={{flex: 1, height: SCREEN_HEIGHT*.52}}>
                                    <Image
                                        style={{flex:1, resizeMode: 'contain'}}
                                        source={require('../../assets/images/jacket.jpg')}
                                    />
                                    </View>
                                    {
                                        this.props.showFullText ?
                                        <Text>Jacket. Amazing denim fabric with stretch that allows for easy movement. It uses 11.5 ounces denim of Cone Mills, a world-reknowned denim manufacturer. Researched and developed at Jeans Innovation Center. In response to customer feedback, we've added a handy hip pocket.</Text>
                                        :
                                        <Text numberOfLines={3}>Jacket. Amazing denim fabric with stretch that allows for easy movement. It uses 11.5 ounces denim of Cone Mills, a world-reknowned denim manufacturer. Researched and developed at Jeans Innovation Center. In response to customer feedback, we've added a handy hip pocket.</Text>
                                    }
                                    {
                                        this.props.showFullText ?
                                        <Button transparent onPress={() => this.toggleFullText()}><Text>Show Less</Text></Button>
                                        :
                                        <Button transparent onPress={() => this.toggleFullText()}><Text>Show More</Text></Button>
                                    }
                                </Body>
                            </CardItem>
                        </Card>
                    </GestureRecognizer>
                    <View  style={styles.container}>
                        <Button primary large rounded onPress={() => this.onSwipeRight()} iconLeft><Icon name='thumbs-up' /><Text>Buy</Text></Button>
                        <Button success large rounded><Text> SKIP </Text></Button>
                        <Button danger large rounded onPress={() => this.onSwipeLeft()} iconLeft><Icon name='thumbs-down' /><Text>Nah</Text></Button>
                    </View>
                    </Content>
                </Container>
		);
	}
}

export { ItemDisplayComponent };

const mapStateToProps = (state, ownProps) => {
	const { post } = state;
	const { curr_post_id, posts, showFullText } = post;
	return {
		...ownProps,
		curr_post_id,
		posts,
		showFullText
	};
};

export const ItemDisplay = connect(mapStateToProps, {
	submit_new_vote_buy,
	submit_new_vote_nah,
	toggle_full_text
})(ItemDisplayComponent);