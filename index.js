import React from 'react'
import {
	View, StyleSheet, Platform, Text, TextInput, TouchableOpacity
} from 'react-native'

class EditableTagCloud extends React.Component {
	state = {
		items: [],
		addingTag: '',
		lineBreaks: {},
	}

	constructor(props) {
		super(props)

		this._mapItemPropsToState(props)
	}

	componentWillReceiveProps(nextProps) {
		this._mapItemPropsToState(nextProps)
	}

	_mapItemPropsToState = (nextProps, useSetState) => {
		if (nextProps.items && nextProps.items != this.state.items) {
			if (useSetState) {
				this.setState({ items: nextProps.items })
			} else {
				this.state.items = nextProps.items
			}
		}
	}

	_onLayoutTagInput = event => {
		const { tagInputMinWidth } = this.props
		let tagInputWidth = event.nativeEvent.layout.width
		if (tagInputWidth < tagInputMinWidth) {
			let lineBreaks = this.state.lineBreaks
			const { items } = this.props
			lineBreaks[items.length - 1] = true
			this.setState({ lineBreaks })
		}
	}

	_renderItem = (item, index) => {
		const { removable, renderItem } = this.props

		return (
			<TouchableOpacity
				disabled={!removable}
				onPress={()=>this._removeTags(index)}
			>
				{renderItem(item, index)}
			</TouchableOpacity>
		)
	}

	_removeTags = (index) => {
		const { onItemsChanged } = this.props
		let { items } = this.state
		items.splice(index, 1)
		this.setState({
			lineBreaks: {},
			items: [...items]
		}, () => {
			onItemsChanged && onItemsChanged(this.state.items)
		})
	}

	_addTags = (tags) => {
		if (!tags || (Array.isArray(tags) && tags.length === 0)) return

		let { items } = this.state
		const { onItemsChanged }= this.props
		items.push(tags)
		
		this.setState({
			addingTag: '',
			items: [...items]
		}, () => {
			onItemsChanged && onItemsChanged(this.state.items)
		})
	}

	_splitTags(input) {
		const { delimiters } = this.props
		if (!delimiters || !input) return null

		for (let delim in delimiters) {
			delim = delimiters[delim]
			let tags = input.search(delim) != -1 && input.split(delim).map(value => value.trim()).filter(value => value.length > 0)
			if (tags && tags.length > 0) return tags
		}

		return null
	}

	_renderTagInput = () => {
		const { tagInputWrapStyle, addable, tagInputProps } = this.props
		if (!addable) return null

		return (
			<View style={tagInputWrapStyle}>
				<TextInput
					{...tagInputProps}
					ref='tagInput'
					onLayout={this._onLayoutTagInput}
					value={this.state.addingTag}
					onChangeText={addingTag => {
						let splitTags = this._splitTags(addingTag)
						if (splitTags && splitTags.length > 0) {
							this._addTags(splitTags)
						} else {
							this.setState({ addingTag })
						}
					}}
					onSubmitEditing={() => {
						let { addingTag } = this.state
						addingTag = addingTag.trim()
						this._addTags(addingTag)
					}}
					returnKeyType='done'
					returnKeyLabel='Done'
					blurOnSubmit={false}
					selection={null}
				/>
			</View>
		)
	}

	focus() {
		this.refs.tagInput.focus()
	}

	render() {
		const { lineBreaks, items } = this.state
		let childItems = []
		console.log('render', items)

		items.forEach((item, index) => {
			childItems.push(this._renderItem(item, index))
			if (lineBreaks[index]) {
				childItems.push(<View style={{ width: '101%' }} />)
			}
		})

		return (
			<View style={[styles.container, this.props.style]}>
				{childItems}
				{this._renderTagInput()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row', 
		flexWrap: 'wrap' 
	}
})

export { EditableTagCloud }