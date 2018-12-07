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
    onSwipeLeft(gestureState) {
        Alert.alert('NAH!');
        this.props.handle_swipe_left();
    }
    onSwipeRight(gestureState) {
        Alert.alert(this.props.post_index);
        console.log(this.props.post_index)
        this.props.handle_swipe_right();
    }
    toggleFullText = () => {
        this.props.toggle_full_text();
    }

        render(){

            function base64ArrayBuffer(arrayBuffer) {
                var base64    = ''
                var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
              
                var bytes         = new Uint8Array(arrayBuffer)
                var byteLength    = bytes.byteLength
                var byteRemainder = byteLength % 3
                var mainLength    = byteLength - byteRemainder
              
                var a, b, c, d
                var chunk
              
                // Main loop deals with bytes in chunks of 3
                for (var i = 0; i < mainLength; i = i + 3) {
                  // Combine the three bytes into a single integer
                  chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]
              
                  // Use bitmasks to extract 6-bit segments from the triplet
                  a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
                  b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
                  c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
                  d = chunk & 63               // 63       = 2^6 - 1
              
                  // Convert the raw binary segments to the appropriate ASCII encoding
                  base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
                }
              
                // Deal with the remaining bytes and padding
                if (byteRemainder == 1) {
                  chunk = bytes[mainLength]
              
                  a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2
              
                  // Set the 4 least significant bits to zero
                  b = (chunk & 3)   << 4 // 3   = 2^2 - 1
              
                  base64 += encodings[a] + encodings[b] + '=='
                } else if (byteRemainder == 2) {
                  chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]
              
                  a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
                  b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4
              
                  // Set the 2 least significant bits to zero
                  c = (chunk & 15)    <<  2 // 15    = 2^4 - 1
              
                  base64 += encodings[a] + encodings[b] + encodings[c] + '='
                }
                
                return base64
              }

            var imagebuffer = null;
            var imagetype = null;
            
            if(this.props.posts[this.props.post_index]['image'] != null) {
                imagebuffer=this.props.posts[this.props.post_index]['image']['data']['data'];
                imagetype='data:'+this.props.posts[this.props.post_index]['image']['contentType'];
            }
            console.log(imagetype+";base64,");
            
            return(
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
                                        style={{flex:1, width: SCREEN_WIDTH, resizeMode: 'contain'}}
                                        source={{uri: imagetype+";base64,"+base64ArrayBuffer(imagebuffer)}}                                    />
                                    </View>
                                    {
                                        this.props.showFullText ? 
                                        <Text>{this.props.posts[this.props.post_index]['description']}</Text>
                                        :
                                        <Text numberOfLines={3}>{this.props.posts[this.props.post_index]['description']}</Text>
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
    const { showFullText, posts, curr_post_id, post_index } = post;
    return {
        ...ownProps,
        showFullText,
        posts,
        curr_post_id,
        post_index
    };
};

export const ItemDisplay = connect(mapStateToProps, {
	submit_new_vote_buy,
	submit_new_vote_nah,
	toggle_full_text
})(ItemDisplayComponent);