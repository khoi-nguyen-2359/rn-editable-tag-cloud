/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

import { EditableTagCloud } from 'rn-editable-tag-cloud'

export default class App extends Component<{}> {
  state = {
    allTags: ['tag1', 'tag2', 'tag3']
  }

  _renderItem = (item, index) => {
    return (
      <TouchableOpacity 
        onPress={()=>{
          this.state.allTags.splice(index, 1)
          this.setState({ allTags: this.state.allTags })
        }}
        style={{
          borderRadius: 5,
          marginTop: 5,
          marginRight: 5,
          padding: 5,
          backgroundColor: 'green',
        }}>
        <Text style={{
          color: 'white',
        }}>{item}</Text>
      </TouchableOpacity>
    )
  }

  _onAddTag = newTag => {
    this.state.allTags.push(newTag)
    this.setState({ allTags: this.state.allTags })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Editable Tag Cloud example
        </Text>
        <EditableTagCloud
          onItemsChanged={items => this.setState({allTags: items})}
          addable
          removable
          itemTextStyle={styles.itemTextStyle}
          itemWrapStyle={styles.itemWrapStyle}
          tagInputStyle={styles.tagInputStyle}
          tagInputWrapStyle={styles.tagInputWrapStyle}
          items={this.state.allTags} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tagInputWrapStyle: {
    height: 30
  },
  tagInputStyle: {

  },
  itemTextStyle: {
    
  },
  itemWrapStyle: {
    height: 30,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 5
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
