import React, { PureComponent } from 'react';
import { View } from 'react-native';
import AnimateLoadingButton from 'react-native-animate-loading-button';

export default class LoadingButton extends PureComponent {
  _onPressHandler() {
    this.loadingButton.showLoading(true);

    // mock
    setTimeout(() => {
      this.loadingButton.showLoading(false);
    }, 2000);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'rgb(255,255,255)', justifyContent: 'center' }}>
        <AnimateLoadingButton
          ref={c => (this.loadingButton = c)}
          width={300}
          height={50}
          title="BUTTON"
          titleFontSize={16}
          titleColor="rgb(255,255,255)"
          backgroundColor="rgb(29,18,121)"
          borderRadius={4}
          onPress={this._onPressHandler.bind(this)}
        />
      </View>
    );
  }
}
