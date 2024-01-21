import React, { type ReactElement } from 'react';
import {
  type LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  type ViewStyle,
} from 'react-native';

interface ChipProps {
  onPress: () => void;
  onLayout: (event: LayoutChangeEvent) => void;
  children: ReactElement;
  chipStyle?: ViewStyle;
}

const Chip: React.FC<ChipProps> = ({ onPress, children, chipStyle }) => {
  return (
    <TouchableOpacity style={[styles.pill, chipStyle]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pill: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 4,
  },
});

export default Chip;
