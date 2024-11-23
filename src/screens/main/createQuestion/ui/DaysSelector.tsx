import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';

interface DaysSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (days: number) => void;
  selectedDays: number;
}

const DAYS_OPTIONS = [1, 2, 3, 5, 7, 14];

export const DaysSelector = ({
  visible,
  onClose,
  onSelect,
  selectedDays,
}: DaysSelectorProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}>
        <View style={styles.content}>
          <ScrollView>
            {DAYS_OPTIONS.map(days => (
              <TouchableOpacity
                key={days}
                style={[
                  styles.option,
                  days === selectedDays && styles.selectedOption,
                ]}
                onPress={() => {
                  onSelect(days);
                  onClose();
                }}>
                <Text
                  style={[
                    styles.optionText,
                    days === selectedDays && styles.selectedOptionText,
                  ]}>
                  {days} {days === 1 ? 'day' : 'days'}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    width: '80%',
    maxHeight: '70%',
    padding: 8,
  },
  option: {
    padding: 16,
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: '#3A3A3A',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
});
