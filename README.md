# react-native-tags-selector

A ReactNative tag selector that supports single-line sliding, multi-line display, and single-select.

## Preview

![Gif](example/assets/screenshot_1.gif)

## Installation

```sh
npm install react-native-tags-selector
```
or

```sh
yarn add react-native-tags-selector
```

## Usage

### Basic usage

[Example](example/src/App.tsx)

```js
import TagsSelector from 'react-native-tags-selector';

// ...

const dataSource = [
  { id: '1', name: 'Tag1', image: require('../assets/tip_warn.png') },
  { id: '2', name: 'Tag2', image: require('../assets/tip_warn.png') },
  { id: '3', name: 'Tag3', image: require('../assets/tip_warn.png') },
  { id: '4', name: 'Tag4', image: require('../assets/tip_warn.png') },
  { id: '5', name: 'Tag5', image: require('../assets/tip_warn.png') },
  { id: '6', name: 'Tag6', image: require('../assets/tip_warn.png') },
  { id: '7', name: 'Tag7', image: require('../assets/tip_warn.png') },
  { id: '8', name: 'Tag8', image: require('../assets/tip_warn.png') },
];

<TagsSelector
  selectedId={'1'}
  multiLine={false}
  dataSource={dataSource}
/>
```

### Advanced usage

#### Supports customizing the following attributes

| PropName                  | type                | Description                       | Default  |
|---------------------------|---------------------|-----------------------------------|----------|
| selectedId                | string              | ID is selected by default         |          |
| multiLine                 | boolean             | Whether to display multiple lines | false    |
| dataSource                | DataModel[]         | Data source used to display tags  |          |
| onChecked                 | function            | Callback when tag is selected     |          |
| textStyle                 | TextStyle           | Set the style of tag text         |          |
| chipStyle                 | ViewStyle           | Set the style of a single tag     |          |
| selectedTextColor         | string              | Set selected text color           | #5B00FF  |
| unselectedTextColor       | string              | Set unselected text color         | #5B00FF  |
| selectedBorder            | string              | Set selected border color         | #5B00FF  |
| unselectedBorder          | string              | Set unselected border color       | #E5E7E9  |
| selectedBackgroundColor   | string              | Set selected background color     | #FFFFFF  |
| unselectedBackgroundColor | string              | Set unselected background color   | #F9F9F9  |
| showMoreIcon              | ImageSourcePropType | Set show more icon                |          |
| showLessIcon              | ImageSourcePropType | Set show less icon                |          |
| showMoreStyle             | ViewStyle           | Set the style of show more        |          |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
