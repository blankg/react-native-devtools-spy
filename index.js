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
      isMessageQueueOn: false
    };

    this.onToggleMessageQueue = this.onToggleMessageQueue.bind(this);
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
    justifyContent: "space-between"
  },
  bottomContainer: {
    backgroundColor: "skyblue",
    paddingBottom: 30
  },
  devMenuContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "skyblue"
  }
});
