import React, { Component } from "react";
import {
  NativeEventEmitter,
  NativeModules,
  Modal,
  View,
  Text,
  StyleSheet,
  Switch,
  Button
} from "react-native";
import MessageQueue from "react-native/Libraries/BatchedBridge/MessageQueue.js";

const { RNDevToolsSpyEventEmitter } = NativeModules;

export default class DevToolsSpy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      isMessageQueueOn: false,
      isMobxOn: false
    };

    this.onToggleMessageQueue = this.onToggleMessageQueue.bind(this);
    this.onToggleMobx = this.onToggleMobx.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentWillMount() {
    this.subscription = new NativeEventEmitter(
      RNDevToolsSpyEventEmitter
    ).addListener("toggleSpy", () => {
      this.setState({ modalVisible: !this.state.modalVisible });
    });
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  onToggleMessageQueue(value) {
    MessageQueue.spy(value);
    this.setState({ isMessageQueueOn: value });
  }

  onToggleMobx(value) {
    if (value) {
      try {
        !this.mobxSpy && (this.mobxSpy = require("mobx").spy);
      } catch (err) {
        console.log(err);
        return;
      }
      this.disposeMobxSpy = this.mobxSpy(event => {
        console.log(`[MobX]`, event);
      });
    } else {
      this.disposeMobxSpy();
    }

    this.setState({ isMobxOn: value });
  }

  onClose() {
    this.setState({ modalVisible: false });
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => this.setState({ modalVisible: false })}
      >
        <View style={styles.devMenuContainer}>
          <Text style={styles.title}>Spy Menu</Text>
          <View style={styles.rowStyle}>
            <Text style={{ paddingTop: 5, marginHorizontal: 5 }}>
              Message queue (React-Native bridge)
            </Text>
            <Switch
              value={this.state.isMessageQueueOn}
              onValueChange={this.onToggleMessageQueue}
            />
          </View>
          <View style={styles.rowStyle}>
            <Text style={{ paddingTop: 5, marginHorizontal: 5 }}>MobX</Text>
            <Switch
              value={this.state.isMobxOn}
              onValueChange={this.onToggleMobx}
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Button title="Close" onPress={this.onClose} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 30
  },
  rowStyle: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  bottomContainer: {
    backgroundColor: "skyblue",
    paddingBottom: 30
  },
  devMenuContainer: {
    flex: 1,
    backgroundColor: "skyblue"
  }
});
