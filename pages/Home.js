import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import NfcManager, {NfcEvents, NdefParser} from 'react-native-nfc-manager';

class HomePage extends React.Component {
  componentDidMount() {
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      console.warn('tag', JSON.stringify(tag));
      let text = NdefParser.parseText(tag.ndefMessage[0]);
      this.setState({myText: text});
      NfcManager.setAlertMessageIOS('I got your tag!');
      // NfcManager.unregisterTagEvent().catch(() => 0); //turn this on if you want to stop looking for nfc
    });
  }

  componentWillUnmount() {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    // NfcManager.unregisterTagEvent().catch(() => 0); //turn this on if you want to stop looking for nfc
  }

  constructor() {
    super();
    this.state = {
      myText: 'Waiting for tag......',
    };
    this._test();
  }

  render() {
    return (
      <View style={{padding: 20}}>
        <Text>NFC Demo</Text>

        <TouchableOpacity
          style={{
            padding: 10,
            width: 200,
            margin: 20,
            borderWidth: 1,
            borderColor: 'black',
          }}
          onPress={this._cancel}>
          <Text>Cancel Test</Text>
        </TouchableOpacity>
        <Text>{this.state.myText}</Text>
      </View>
    );
  }

  _cancel = () => {
    NfcManager.unregisterTagEvent().catch(() => 0);

    this.setState({myText: 'Waiting for tag......'});
  };

  _test = async () => {
    try {
      await NfcManager.registerTagEvent();
    } catch (ex) {
      console.warn('ex', ex);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  };
}

export default HomePage;
