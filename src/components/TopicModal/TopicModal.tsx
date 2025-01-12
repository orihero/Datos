import {Topic} from '@types';
import Avatar from 'components/Avatar/Avatar';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import CloseIcon from 'shared/assets/icons/CloseIcon';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight} from 'shared/utils/dimensions';

const TopicModal = ({
  isVisible,
  onClose,
  topic,
  onPress,
}: {
  isVisible: boolean;
  onClose: () => void;
  topic: Topic;
  onPress?: () => void;
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <CloseIcon size={32} color={COLORS.black} />
          </TouchableOpacity>
          <Avatar
            isShowFollowBtn={false}
            isUser={false}
            size={100}
            uri={topic?.avatar}
          />
          <RN.Pressable style={styles.nickname} onPress={onPress}>
            <Text style={styles.name}>{topic?.title}</Text>
            <RN.View style={styles.arrowRight}>
              <ArrowDownIcon size={20} color={COLORS.black} />
            </RN.View>
          </RN.Pressable>
          <RN.Text style={{textAlign: 'center'}}>{topic?.description}</RN.Text>
          <Spacing height={20} />
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>
                {topic?.followerIds?.length}
              </Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{topic?.postIds?.length}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
          </View>
          <Spacing height={20} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  nickname: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingBottom: normalizeHeight(15),
  },
  arrowRight: {
    transform: [{rotate: `${-90}deg`}],
  },
  level: {
    width: '100%',
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: COLORS.dargGray,
    paddingVertical: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textGray,
  },
});

export default observer(TopicModal);
