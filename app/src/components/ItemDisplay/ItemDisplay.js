import React, { Component } from 'react';
import Comments from 'react-native-comments';
import {
    Container, Header, Content, Button, Text, Card, CardItem, Body
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { View, ScrollView, TouchableOpacity, Image, RefreshControl, Alert } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import GestureRecognizer from 'react-native-swipe-gestures';
import {
    handle_swipe_right,
    handle_swipe_left,
    toggle_full_text
} from '../../ducks/post';

const styles = ({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    button: {
    }
  });

class ItemDisplayComponent extends Component {
    onSwipeLeft(gestureState) {
        Alert.alert('NAH!');
        this.props.handle_swipe_left();
    }
    onSwipeRight(gestureState) {
        Alert.alert('BUY!');
        this.props.handle_swipe_right();
    }
    toggleFullText = () => {
        this.props.toggle_full_text();
    }
        render(){
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
                        <Card style={{flex: 0}}>
                            <CardItem>
                                <Body style={{alignItems: "center"}}>
                                    <Image
                                        style={{flex:1, height: 200, width: 200}}
                                        source={require('../../assets/images/jacket.jpg')}
                                    />
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
                        <Button danger large rounded onPress={() => this.onSwipeLeft()}><Text> X </Text></Button>
                        <Button success large rounded><Text> SKIP </Text></Button>
                        <Button primary large rounded onPress={() => this.onSwipeRight()}><Text> O </Text></Button>
                    </View>
                    </Content>
                </Container>
            );
        }
    }

export { ItemDisplayComponent };

const mapStateToProps = (state, ownProps) => {
    const { post } = state;
    const { showFullText } = post;
    return {
        ...ownProps,
        showFullText
    };
};

export const ItemDisplay = connect(mapStateToProps, {
    handle_swipe_left,
    handle_swipe_right,
    toggle_full_text
})(ItemDisplayComponent);
