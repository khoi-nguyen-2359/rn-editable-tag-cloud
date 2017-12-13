import React from 'react'
import {
	View, StyleSheet, Platform, Text, TextInput, TouchableOpacity
} from 'react-native'

const TAG_INPUT_MIN_WIDTH = 30

class EditableTagCloud extends React.Component {
	state = {
		items: [],
		addingTag: '',
		lineBreaks: {}
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
		let tagInputWidth = event.nativeEvent.layout.width
		if (tagInputWidth < TAG_INPUT_MIN_WIDTH) {
			let lineBreaks = this.state.lineBreaks
			const { items } = this.props
			lineBreaks[items.length - 1] = true
			this.setState({ lineBreaks })
		}
	}

	_renderItem = (item, index) => {
		const { itemTextStyle, itemWrapStyle, removable } = this.props
		
		return (
			<TouchableOpacity
				disabled={!removable}
				onPress={()=>this._removeTags(index)}
				style={[styles.itemWrap, itemWrapStyle]}
			>
				<Text style={[styles.itemText, itemTextStyle]}>{item}</Text>
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

	_renderTagInput = () => {
		const { tagInputStyle, tagInputWrapStyle, addable } = this.props
		if (!addable) return null

		return (
			<View style={[styles.tagInputWrap, tagInputWrapStyle]}>
				<TextInput
					style={[styles.tagInput, tagInputStyle]}
					ref='tagInput'
					onLayout={this._onLayoutTagInput}
					value={this.state.addingTag}
					onChangeText={addingTag => {
						if (addingTag.search(',') != -1) {
							let tags = (addingTag.split(',') || []).map(value => value.trim()).filter(value => value.length > 0)
							this._addTags(tags)
						} else {
							this.setState({ addingTag })
						}
					}}
					onSubmitEditing={() => {
						let { addingTag, items } = this.state
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
			<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
				{childItems}
				{this._renderTagInput()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	itemWrap: {
		padding: 5,
		backgroundColor: 'rgb(40,172,182)',
		borderRadius: 5,
		marginRight: 5,
		marginTop: 5,
	},
	itemText: {
		color: 'white',
	},
	tagInput: {
		height: Platform.OS == 'ios' ? 20 : 30,
		flex: 1,
	},
	tagInputWrap: {
		marginTop: 5,
		borderBottomWidth: 1,
		borderBottomColor: '#dedede',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
})

export { EditableTagCloud }