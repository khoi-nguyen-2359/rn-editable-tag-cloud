# rn-editable-tag-cloud
React Native component that contains and auto-wraps tags inside. Tags can be added or removed.

![](https://media.giphy.com/media/3ohs7MzTK0fvuLcBTa/giphy.gif)

## Installation

```
npm install --save rn-editable-tag-cloud
```

## Usage example

| props         | type        | required | usage                                                     |
|---------------|-------------|----------|-----------------------------------------------------------|
| items         | array       | yes      | Set of tags in tag cloud                                  |
| onItemsChanged| function    | yes      | Callback when set of tags has changed                     |
| renderItem    | function    | yes      | Render component for each tag item. Touchable wrapper will be handled inside tag cloud|
| tagInputMinWidth | integer  | yes      | Minimum width of tag text input (if set addable) before a line break|
| addable       | boolean     | no       | If set, tag cloud will have a text input for adding tag   |
| removable     | boolean     | no       | If set, tag cloud will remove tag on clicking on tag item |
| tagInputProps | object      | no       | Props that will be set into tag text input                |
| delimiters    | array       | no       | Set of character that will separate tags in a sequence of input text|
| tagInputWrapStyle| object   | no       | Style object for wrapper component of tag text input|


```javascript
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
          renderItem={(item, index) => {
            return (
              <View style={styles.itemWrap}>
                <Text style={styles.itemText}>{item}</Text>
              </View>
            )
          }}
          items={this.state.allTags} />
```
