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
  View
} from 'react-native'

import { EditableTagCloud } from 'rn-editable-tag-cloud'

export default class App extends Component<{}> {
  state = {
    allTags: ['tag1', 'tag2', 'tag3']
  }

  render() {
    let { allTags } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Editable Tag Cloud example
        </Text>
        <EditableTagCloud
          items={allTags} 
          onAddTag={newTag=>{
            allTags.push(newTag)
            this.setState({ allTags })
          }}
          renderItem={(item, index) => 
            <View style={{
              borderRadius: 5,
              marginTop: 5,
              marginRight: 5,
              padding: 5,
              backgroundColor: 'green',
            }}>
              <Text style={{
                color: 'white',
              }}>{item}</Text>
            </View>
          } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
