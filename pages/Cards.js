import React, {Component} from 'react';
import {
  AppRegistry,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Image,
  LayoutAnimation,
} from 'react-native';
import Item from '../processor/CardProcessor';
import NfcManager, {NfcEvents, NdefParser} from 'react-native-nfc-manager';

export default class Cards extends Component {
  componentDidMount() {
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      console.warn('tag', JSON.stringify(tag));
      let text = NdefParser.parseText(tag.ndefMessage[0]);
      this.addMore();
      NfcManager.setAlertMessageIOS('I got your tag!');
      // NfcManager.unregisterTagEvent().catch(() => 0); //turn this on if you want to stop looking for nfc
    });
  }
  constructor() {
    super();
    this.state = {valueArray: [], disabled: false};
    this.addNewEle = false;
    this.index = 0;
  }

  afterAnimationComplete = () => {
    this.index += 1;
    this.setState({disabled: false});
  };

  addMore = () => {
    this.addNewEle = true;
    const newlyAddedValue = {id: 'id_' + this.index, text: this.index + 1};

    this.setState({
      disabled: true,
      valueArray: [...this.state.valueArray, newlyAddedValue],
    });
  };

  remove(id) {
    this.addNewEle = false;
    const newArray = [...this.state.valueArray];
    newArray.splice(
      newArray.findIndex(ele => ele.id === id),
      1,
    );

    this.setState(
      () => {
        return {
          valueArray: newArray,
        };
      },
      () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      },
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          ref={scrollView => (this.scrollView = scrollView)}
          onContentSizeChange={() => {
            this.addNewEle && this.scrollView.scrollToEnd();
          }}>
          <View style={{flex: 1, padding: 4}}>
            {this.state.valueArray.map(ele => {
              return (
                <Item
                  key={ele.id}
                  item={ele}
                  removeItem={id => this.remove(id)}
                  afterAnimationComplete={this.afterAnimationComplete}
                />
              );
            })}
          </View>
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.addBtn}
          disabled={this.state.disabled}
          onPress={this.addMore}></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addBtn: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
  },
  btnImage: {
    resizeMode: 'contain',
    width: '100%',
  },
});
