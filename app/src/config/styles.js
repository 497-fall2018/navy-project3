import { Dimensions } from 'react-native';

export default {
  tabBarIconStyle: {
    width: Dimensions.get('window').height * 0.05,
    height: Dimensions.get('window').height * 0.05,
    alignSelf: 'center'
  },
  heartIconStyle: {
    width: Dimensions.get('window').height * 0.04,
    height: Dimensions.get('window').height * 0.04,
    alignSelf: 'center'
  }
};