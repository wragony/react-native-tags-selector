import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import _ from 'lodash';
import ChipsList from '@src/components/ChipsList';
import type { DataModel } from '@src/components/types';
import { Images, Colors } from '@src/components/resources';

export type TagsSelectorProps = {
  selectedId: string;
  multiLine: boolean;
  dataSource: DataModel[];
  onChecked: (item: DataModel, index: number) => void;
};

const ChipItemView = (props: {
  selected: boolean;
  firstEnd: boolean;
  item: DataModel;
}) => (
  <View
    style={[
      styles.chip,
      {
        borderColor: props.selected ? Colors.selected : Colors.deep50,
        backgroundColor: props.selected ? Colors.deepFF : Colors.deep25,
        marginHorizontal: 5,
      },
    ]}
  >
    <Image
      source={{ uri: props.item.image || '' }}
      resizeMode={'contain'}
      style={{ width: 22, height: 22 }}
    />
    <Text style={styles.text}>{props.item.name}</Text>
  </View>
);

const TagsSelector = (props: TagsSelectorProps) => {
  const { selectedId, multiLine = true, dataSource, onChecked } = props;
  const [selectId, setSelectId] = useState<string>(selectedId);
  const [showMore, setShowMore] = useState<boolean>(multiLine);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (!showMore) {
      setTimeout(() => {
        const index = _.findIndex(dataSource, (i) => i.id === selectId);
        flatListRef.current?.scrollToIndex({ animated: true, index });
      }, 20);
    }
  }, [dataSource, selectId, showMore]);

  return (
    <View>
      {showMore ? (
        <ChipsList
          data={dataSource}
          selectId={selectId}
          onItemPress={(item, index) => {
            setSelectId(item.name);
            onChecked && onChecked(item, index);
          }}
          chipStyle={{ marginHorizontal: 0 }}
          containerStyle={{ marginHorizontal: 11 }}
          renderChip={(item, isSelected, index) => {
            const isFirstEnd = index === 0 || index === dataSource.length - 1;
            return (
              <ChipItemView
                selected={isSelected}
                firstEnd={isFirstEnd}
                item={item}
              />
            );
          }}
        />
      ) : (
        <FlatList
          ref={flatListRef}
          data={dataSource}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.chain_name}
          style={{ marginHorizontal: 11, marginVertical: 4 }}
          renderItem={(item) => {
            const dataItem = item.item;
            const isSelected = dataItem.chain_name === selectId;
            const isFirstEnd =
              item.index === 0 || item.index === dataSource.length - 1;
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectId(dataItem.chain_name);
                  flatListRef.current?.scrollToIndex({
                    animated: true,
                    index: item.index,
                  });
                  onChecked && onChecked(dataItem, item.index);
                }}
              >
                <ChipItemView
                  selected={isSelected}
                  firstEnd={isFirstEnd}
                  item={dataItem}
                />
              </TouchableOpacity>
            );
          }}
        />
      )}
      <TouchableOpacity
        style={styles.moreLess}
        onPress={() => {
          setShowMore(!showMore);
        }}
      >
        <Text style={styles.text}>{showMore ? 'Show more' : 'Show less'}</Text>
        <Image
          resizeMode={'contain'}
          source={showMore ? Images.showMore : Images.showLess}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    padding: 6,
  },
  moreLess: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 15,
  },
  text: {
    fontWeight: '400',
    fontSize: 14,
    color: Colors.selected,
    marginRight: 8,
  },
});

export default TagsSelector;
