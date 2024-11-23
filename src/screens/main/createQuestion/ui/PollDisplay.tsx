import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {DaysSelector} from './DaysSelector';
import PollOption from './PollOptions';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import PlusIcon from 'shared/assets/icons/PlusIcon';
import {COLORS} from 'shared/constants/colors';
import {Spacing} from 'components/Spacing';

interface PollOptionType {
  id: string;
  text: string;
}

export default () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [options, setOptions] = useState<PollOptionType[]>([
    {id: '1', text: ''},
    {id: '2', text: ''},
  ]);
  const [daysCount, setDaysCount] = useState(3);
  const [showDaysSelector, setShowDaysSelector] = useState(false);

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, {id: String(options.length + 1), text: ''}]);
    }
  };

  const updateOption = (id: string, text: string) => {
    setOptions(options.map(opt => (opt.id === id ? {...opt, text} : opt)));
  };

  const removeOption = (id: string) => {
    if (options.length > 2) {
      setOptions(options.filter(opt => opt.id !== id));
    }
  };

  const handleReorder = (fromIndex: number, offset: number) => {
    const toIndex = Math.max(
      0,
      Math.min(fromIndex + offset, options.length - 1),
    );
    if (fromIndex === toIndex) {
      return;
    }

    const newOptions = [...options];
    const [movedOption] = newOptions.splice(fromIndex, 1);
    newOptions.splice(toIndex, 0, movedOption);
    setOptions(newOptions);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        placeholderTextColor={COLORS.textGray}
        style={styles.title}
        multiline
      />
      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Body (Optional)"
        placeholderTextColor={COLORS.textGray}
        style={styles.body}
        multiline
      />
      <Spacing height={10} />
      <View style={styles.pollBox}>
        <View style={styles.pollHeader}>
          <TouchableOpacity
            style={styles.daysButton}
            onPress={() => setShowDaysSelector(true)}>
            <Text style={[styles.pollEndsText, {color: COLORS.textGray}]}>
              Poll ends in
            </Text>
            <Text style={styles.pollEndsText}>
              {daysCount} {daysCount === 1 ? 'day' : 'days'}
            </Text>
            <ArrowDownIcon size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.optionsBox}>
          {options.map((option, index) => (
            <PollOption
              key={option.id}
              id={option.id}
              text={option.text}
              onChangeText={text => updateOption(option.id, text)}
              onRemove={() => removeOption(option.id)}
              canRemove={options.length > 2}
              onDragEnd={offset => handleReorder(index, offset)}
              index={index}
            />
          ))}

          {options.length < 4 && (
            <Pressable style={styles.addOption} onPress={addOption}>
              <PlusIcon size={24} color={COLORS.textGray} />
              <Text style={styles.addOptionText}>Add option</Text>
            </Pressable>
          )}
        </View>
      </View>

      <DaysSelector
        visible={showDaysSelector}
        onClose={() => setShowDaysSelector(false)}
        onSelect={setDaysCount}
        selectedDays={daysCount}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
  title: {
    fontSize: 26,
    color: COLORS.white,
    padding: 0,
  },
  body: {
    fontSize: 16,
    color: COLORS.white,
    padding: 0,
  },
  pollBox: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    padding: 20,
    borderRadius: 20,
  },
  pollHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  daysButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pollEndsText: {
    color: COLORS.white,
    fontSize: 16,
  },
  optionsBox: {
    gap: 10,
  },
  addOption: {
    backgroundColor: COLORS.dargGray,
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addOptionText: {
    color: COLORS.textGray,
    marginLeft: 10,
    fontSize: 16,
  },
});
