import React from 'react';
import { StyleSheet, View } from 'react-native';
import TagsSelector from 'react-native-tags-selector';
import DataModel from 'react-native-tags-selector';

export default function App() {
  const dataList: DataModel[] = [
    { id: '1', name: 'Tag1', image: require('../assets/tip_warn.png') },
    { id: '2', name: 'Tag2', image: require('../assets/tip_warn.png') },
    { id: '3', name: 'Tag3', image: require('../assets/tip_warn.png') },
    { id: '4', name: 'Tag4', image: require('../assets/tip_warn.png') },
    { id: '5', name: 'Tag5', image: require('../assets/tip_warn.png') },
    { id: '6', name: 'Tag6', image: require('../assets/tip_warn.png') },
    { id: '7', name: 'Tag7', image: require('../assets/tip_warn.png') },
    { id: '8', name: 'Tag8', image: require('../assets/tip_warn.png') },
    { id: '9', name: 'Tag9', image: require('../assets/tip_warn.png') },
    { id: '10', name: 'Tag10', image: require('../assets/tip_warn.png') },
    { id: '11', name: 'Tag11', image: require('../assets/tip_warn.png') },
  ];

  return <View style={styles.container}>
    <View style={{ height: 100 }}>
      <TagsSelector
        selectedId={'1'}
        multiLine={true}
        dataSource={dataList}
        textStyle={{ fontSize: 14 }}
        chipStyle={{ marginLeft: 5, marginRight: 5, paddingLeft: 6, paddingRight: 6 }}
        selectedTextColor={'#5B00FF'}
        selectedBorder={'#5B00FF'}
        selectedBackgroundColor={'#FFFFFF'}
      />
    </View>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
