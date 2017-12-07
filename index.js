import React, { Component } from "react";
import { NativeEventEmitter, NativeModules } from "react-native";
import MessageQueue from "react-native/Libraries/Utilities/MessageQueue";

const { RNDevToolsSpy } = NativeModules;

export default class DevToolsSpy extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.subscription = new NativeEventEmitter(
      RNDevToolsSpy
    ).addListener("toggleSpy", () => {
      this.isSpyOn ? MessageQueue.spy(true) : MessageQueue.spy(false);
    });
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  render() {
    return null;
  }
}
