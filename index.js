import React, { Component } from "react";
import { NativeEventEmitter, NativeModules } from "react-native";
import MessageQueue from "react-native/Libraries/BatchedBridge/MessageQueue.js";

const { RNDevToolsSpyEventEmitter } = NativeModules;

export default class DevToolsSpy extends Component {
  constructor(props) {
    super(props);
    this.isSpyOn = false;
  }

  componentWillMount() {
    this.subscription = new NativeEventEmitter(
      RNDevToolsSpyEventEmitter
    ).addListener("toggleSpy", () => {
      this.isSpyOn = !this.isSpyOn;
      MessageQueue.spy(this.isSpyOn);
    });
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  render() {
    return null;
  }
}
