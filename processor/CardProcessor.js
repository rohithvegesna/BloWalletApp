import React, {Component} from 'react';
import {
  Animated,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  UIManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;

export default class CardProcessor extends Component {
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.item.id !== this.props.item.id) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 0.5,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      this.props.afterAnimationComplete();
    });
  }

  removeItem = () => {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      this.props.removeItem(this.props.item.id);
    });
  };

  render() {
    const translateAnimation = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-width, 0, width],
    });

    const opacityAnimation = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0],
    });

    return (
      <Animated.View
        style={[
          styles.viewHolder,
          {
            transform: [{translateX: translateAnimation}],
            opacity: opacityAnimation,
          },
        ]}>
        {/* <Text style={styles.displayText}>Row Now : {this.props.item.text}</Text> */}
        <Image
          resizeMode="cover"
          style={{
            width: '100%',
            height: 200,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.8,
            shadowRadius: 2,
          }}
          source={{
            uri:
              'https://img0-placeit-net.s3-accelerate.amazonaws.com/uploads/stage/stage_image/47022/optimized_large_thumb_stage.jpg',
          }}
        />
        <TouchableOpacity style={styles.removeBtn} onPress={this.removeItem}>
          <Icon name={['fab', 'trash-alt']} size={30} color="#000000" />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  viewHolder: {
    padding: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 5,
  },
  displayText: {
    color: 'white',
    fontSize: 25,
    paddingRight: 17,
  },
  removeBtn: {
    position: 'absolute',
    right: 13,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  btnImage: {
    resizeMode: 'contain',
    width: '100%',
  },
});
