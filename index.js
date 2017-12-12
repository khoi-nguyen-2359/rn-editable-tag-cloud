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

	_mapItemPropsToState = nextProps => {
		if (nextProps.items && nextProps.items != this.state.items) {
			this.setState({ items: nextProps.items })
		}
	}

	_onPressItem = (item, index) => {
		if (this.props.onPressItem) {
			this.props.onPressItem(item, index)
			this.setState({
				lineBreaks: {}
			})
		}
	}

	_onLayoutTextInput = event => {
		let tagInputWidth = event.nativeEvent.layout.width
		if (tagInputWidth < TAG_INPUT_MIN_WIDTH) {
			let lineBreaks = this.state.lineBreaks
			const { items } = this.props
			lineBreaks[items.length - 1] = true
			this.setState({ lineBreaks })
		}
	}

	focus() {
		this.refs.tagInput.focus()
	}

	render() {
		const { items, renderItem } = this.props
		const { lineBreaks } = this.state
		let childItems = []

		items.forEach((item, index) => {
			childItems.push(renderItem(item, index))
			if (lineBreaks[index]) {
				childItems.push(<View style={{ width: '101%' }} />)
			}
		})

		return (
			<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
				{childItems}
				<View style={styles.addItemInputContainer}>
					<TextInput
						ref='tagInput'
						onLayout={this._onLayoutTextInput}
						value={this.state.addingTag}
						onChangeText={addingTag => {
							if (addingTag.search(',') != -1) {
								let tags = (addingTag.split(',') || []).map(value => value.trim()).filter(value => value.length > 0)
								if (tags.length > 0) {
									if (this.props.onAddTag) {
										tags.forEach(tag => {
											this.props.onAddTag(tag)
										})
									}
								}

								this.setState({
									addingTag: ''
								})
							} else {
								this.setState({ addingTag })
							}
						}}
						onSubmitEditing={() => {
							let addingTag = this.state.addingTag.trim()
							if (!addingTag) return
							this.props.onAddTag && this.props.onAddTag(addingTag)
							this.setState({
								addingTag: ''
							})
							this.focus()
						}}
						returnKeyType='done'
						returnKeyLabel='Done'
						blurOnSubmit={false}
						style={styles.addItemInput}
						selection={null}
					/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: 'row',
		padding: 5,
		backgroundColor: 'rgb(40,172,182)',
		borderRadius: 5,
		marginRight: 5,
		marginTop: 5,
	},
	itemText: {
		color: 'white',
		textAlignVertical: 'center'
	},
	addItemInput: {
		height: Platform.OS == 'ios' ? 20 : 30,
		flex: 1,
		paddingRight: 10
	},
	addItemInputContainer: {
		marginTop: 5,
		borderBottomWidth: 2,
		borderBottomColor: '#dedede',
		flex: 1
	},
})

export { EditableTagCloud }