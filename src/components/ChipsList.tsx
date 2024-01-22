import React, { type ReactElement, useState } from 'react';
import {
  type LayoutChangeEvent,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import Chip from '../components/Chips';
import type { DataModel } from './types';

interface ChipsListProps {
  selectId: string;
  data: Array<{ id: string; name: string }>;
  chipStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  onItemPress: (item: DataModel, index: number) => void;
  renderChip: (
    item: DataModel,
    isSelected: boolean,
    index: number
  ) => ReactElement;
}

const ChipsList: React.FC<ChipsListProps> = ({
  selectId,
  data,
  containerStyle,
  chipStyle,
  onItemPress,
  renderChip,
}) => {
  const [positions, updatePositions] = useState<Array<number>>([]);
  const [selectedId, setSelectedId] = useState<string>(selectId);

  const onLayout = (event: LayoutChangeEvent) => {
    const { y } = event.nativeEvent.layout;
    updatePositions([...positions, y]);
  };

  const onPress = (itemId: string) => {
    if (selectedId === itemId) {
      return;
    }
    setSelectedId(itemId);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {data.map((item, index: number) => (
        <React.Fragment key={item.id + index}>
          <Chip
            onLayout={onLayout}
            onPress={() => {
              onPress(item.id);
              onItemPress(item, index);
            }}
            chipStyle={chipStyle}
          >
            {renderChip(item, selectedId === item.id, index)}
          </Chip>
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default ChipsList;
