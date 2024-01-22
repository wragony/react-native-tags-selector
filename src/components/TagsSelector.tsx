import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image, type ImageSourcePropType,
  StyleSheet,
  Text, type TextStyle,
  TouchableOpacity,
  View, type ViewStyle,
} from 'react-native';
import _ from 'lodash';
import ChipsList from '../components/ChipsList';
import type { DataModel } from '../components/types';
import { Images, Colors } from '../components/resources';

export type TagsSelectorProps = {
  selectedId: string;
  multiLine: boolean;
  dataSource: DataModel[];
  onChecked: (item: DataModel, index: number) => void;
  textStyle?: TextStyle
  chipStyle?: ViewStyle
  showMoreIcon?: ImageSourcePropType
  showLessIcon?: ImageSourcePropType
  showMoreStyle?: ViewStyle
  selectedTextColor?: string
  unselectedTextColor?: string
  selectedBorder?: string
  unselectedBorder?: string
  selectedBackgroundColor?: string
  unselectedBackgroundColor?: string
};

const ChipItemView = (props: {
  selected: boolean;
  firstEnd: boolean;
  item: DataModel;
  textStyle?: ViewStyle,
  chipStyle?: ViewStyle,
  selectedTextColor?: string
  unselectedTextColor?: string
  unselectedBorder?: string
  selectedBorder?: string
  selectedBackgroundColor?: string
  unselectedBackgroundColor?: string
}) => (
  <View
    style={[
      styles.chip,
      {
        borderColor: props.selected ? props.selectedBorder || Colors.selected : props.unselectedBorder || Colors.deep50,
        backgroundColor: props.selected ? props.selectedBackgroundColor || Colors.deepFF : props.unselectedBackgroundColor || Colors.deep25,
      },
      props.chipStyle,
    ]}
  >
    <Image
      source={props.item.image}
      resizeMode={'contain'}
      style={{ width: 22, height: 22 }}
    />
    <Text
      style={[styles.text, props.textStyle, { color: props.selected ? props.selectedTextColor : props.unselectedTextColor }]}>{props.item.name}</Text>
  </View>
);

const TagsSelector = (props: TagsSelectorProps) => {
  const {
    selectedId,
    multiLine = true,
    dataSource,
    onChecked,
    textStyle,
    chipStyle,
    showMoreIcon,
    showLessIcon,
    showMoreStyle,
    unselectedBorder,
    selectedBorder,
    selectedBackgroundColor,
    unselectedBackgroundColor,
  } = props;
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
            setSelectId(item.id);
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
                textStyle={textStyle}
                chipStyle={chipStyle}
                selectedBorder={selectedBorder}
                unselectedBorder={unselectedBorder}
                selectedBackgroundColor={selectedBackgroundColor}
                unselectedBackgroundColor={unselectedBackgroundColor}
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
          keyExtractor={(item) => `${item.id}-${item.name}`}
          style={{ marginHorizontal: 11, marginVertical: 4 }}
          onScrollToIndexFailed={() => {
          }}
          renderItem={(item) => {
            const dataItem = item.item;
            const isSelected = dataItem.id === selectId;
            const isFirstEnd =
              item.index === 0 || item.index === dataSource.length - 1;
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectId(dataItem.id);
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
                  textStyle={textStyle}
                  chipStyle={chipStyle}
                  selectedBorder={selectedBorder}
                  unselectedBorder={unselectedBorder}
                  selectedBackgroundColor={selectedBackgroundColor}
                  unselectedBackgroundColor={unselectedBackgroundColor}
                />
              </TouchableOpacity>
            );
          }}
        />
      )}
      <TouchableOpacity
        style={[styles.moreLess, showMoreStyle]}
        onPress={() => {
          setShowMore(!showMore);
        }}
      >
        <Text style={styles.text}>{showMore ? 'Show more' : 'Show less'}</Text>
        <Image
          resizeMode={'contain'}
          source={showMore ? showMoreIcon || Images.showMore : showLessIcon || Images.showLess}
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
    marginHorizontal: 5,
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
