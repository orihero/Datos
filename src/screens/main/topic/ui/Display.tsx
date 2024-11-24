import {Topic} from '@types';
import RN from 'components/RN';
import {observer} from 'mobx-react-lite';
import React, {useCallback, useState} from 'react';
import CrossRedCircleSmallIcon from 'shared/assets/icons/CrossRedCircleSmallIcon';
import {COLORS} from 'shared/constants/colors';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {HIT_SLOP} from 'shared/styles/globalStyles';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';
import TopicItem from './TopicItem';
import {Spacing} from 'components/Spacing';

export default observer(() => {
  const {state, onRemoveTopic, onSelectTopic} = useRootStore().post;
  const {state: topicState} = useRootStore().topic;

  const [searchText, setSearchText] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const filteredTopics = useCallback(() => {
    return topicState.allTopics.filter(topic =>
      topic.title.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [searchText, topicState.allTopics]);

  const renderSelectedTopics = useCallback(() => {
    return state.newPostState.topics?.map(item => {
      return (
        <RN.View key={item._id} style={styles.selectedTopics}>
          <RN.Text children={item.title} color={COLORS.white} />
          <RN.TouchableOpacity
            hitSlop={HIT_SLOP}
            onPress={() => onRemoveTopic(item._id)}>
            <CrossRedCircleSmallIcon size={24} color={COLORS.white} />
          </RN.TouchableOpacity>
        </RN.View>
      );
    });
  }, [onRemoveTopic, state.newPostState.topics]);

  const handleTopicSelect = useCallback(
    (topic: Topic) => {
      onSelectTopic(topic);
      setSearchText('');
      setDropdownVisible(false);
    },
    [onSelectTopic],
  );

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.topicInput} pt={20}>
        <RN.TextInput
          value={searchText}
          onChangeText={text => {
            setSearchText(text);
            setDropdownVisible(text.length > 0);
          }}
          placeholder="Topic"
          placeholderTextColor={COLORS.lightGray}
          style={styles.input}
        />
      </RN.View>
      {dropdownVisible && (
        <RN.ScrollView style={styles.dropdown}>
          {filteredTopics().map(topic => (
            <RN.View key={topic._id}>
              <TopicItem
                topic={topic}
                onPress={() => handleTopicSelect(topic as never)}
              />
              <Spacing height={5} />
            </RN.View>
          ))}
        </RN.ScrollView>
      )}
      <RN.View style={styles.topics}>{renderSelectedTopics()}</RN.View>
    </RN.View>
  );
});

const styles = RN.StyleSheet.create({
  container: {
    gap: 15,
  },
  topicInput: {},
  input: {
    paddingHorizontal: normalizeWidth(20),
    paddingVertical: normalizeHeight(12),
    fontSize: normalizeHeight(18),
    color: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 30,
  },
  topics: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  selectedTopics: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  dropdown: {
    maxHeight: normalizeHeight(300),
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 10,
    backgroundColor: COLORS.dargGray,
    marginTop: 70,
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    padding: 5,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  dropdownItemText: {
    color: COLORS.white,
    fontSize: normalizeHeight(16),
  },
});
