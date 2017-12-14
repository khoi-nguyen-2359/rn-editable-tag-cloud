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

  _renderItem = (item, index) => {
    return (
      <View style={styles.itemWrap}>
        <Text style={styles.itemText}>{item}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Editable Tag Cloud example
        </Text>
        <EditableTagCloud
          tagInputMinWidth={100}
          addable
          removable
          tagInputProps={{
            underlineColorAndroid: 'rgba(0,0,0,0)',
            style: styles.tagInput
          }}
          tagInputWrapStyle={styles.tagInputWrap}
          delimiters={[',', '/']}
          onItemsChanged={items => this.setState({allTags: items})}
          renderItem={this._renderItem}
          items={this.state.allTags} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tagInputWrapStyle: {
    height: 30
  },
	tagInput: {
		flex: 1,
		...Platform.select({
			android: {
				paddingBottom: 0,
				paddingLeft: 0,
				height: 30,
			},
			ios: {
				height: 20,
			}
		}),
		textAlignVertical: 'center'
	},
  itemWrap: {
		padding: 5,
		backgroundColor: 'rgb(40,172,182)',
		marginRight: 5,
    marginTop: 5,
    borderRadius: 5,
	},
	itemText: {
		color: 'white',
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
	tagInputWrap: {
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
		marginTop: 5,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
});
