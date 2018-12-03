import React, { Component } from 'react';
import Comments from 'react-native-comments';
import {
    Container, Header, Content, Button, Text
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { View, ScrollView, TouchableOpacity, Image, RefreshControl, Alert } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import GestureRecognizer from 'react-native-swipe-gestures';
import {
    handle_swipe_right,
    handle_swipe_left
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
        render(){
            return(
                <Container>
                    <GestureRecognizer
                    onSwipeLeft={() => this.onSwipeLeft()}
                    onSwipeRight={() => this.onSwipeRight()}
                    style={{
                    flex: 1,
                    }}
                    >
                        <Image
                            style={{flex:1, height: undefined, width: undefined}}
                            source={require('../../assets/images/jacket.jpg')}
                            resizeMode="contain"
                        />
                    </GestureRecognizer>
                    <View  style={styles.container}>
                        <Button danger large rounded onPress={() => this.onSwipeLeft()}><Text> X </Text></Button>
                        <Button success large rounded><Text> SKIP </Text></Button>
                        <Button primary large rounded onPress={() => this.onSwipeRight()}><Text> O </Text></Button>
                    </View>
                </Container>
            );
        }
    }

export { ItemDisplayComponent };

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
    };
};

export const ItemDisplay = connect(mapStateToProps, {
    handle_swipe_left,
    handle_swipe_right
})(ItemDisplayComponent);
