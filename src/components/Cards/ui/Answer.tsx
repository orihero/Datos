import RN from 'components/RN';
import React from 'react';
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import {COLORS} from 'shared/constants/colors';

export default function Answer() {
  return (
    <RN.View style={styles.container}>
      <RN.View p={12} style={styles.answear}>
        <RN.View style={styles.upDown}>
          <RN.TouchableOpacity style={styles.upButton}>
            <ArrowDownIcon size={32} color={COLORS.white} />
          </RN.TouchableOpacity>
          <RN.Text size="h2" font="Medium" color={COLORS.white}>
            1
          </RN.Text>
          <RN.TouchableOpacity style={styles.downButton}>
            <ArrowDownIcon size={32} color={COLORS.white} />
          </RN.TouchableOpacity>
        </RN.View>
        <RN.Text size="h2" font="Medium" color={COLORS.white}>
          You can find from google
        </RN.Text>
      </RN.View>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    padding: 6,
    backgroundColor: COLORS.dargGray,
    borderRadius: 40,
  },
  answear: {
    flexDirection: 'row',
    gap: 10,
  },
  upDown: {
    alignItems: 'center',
  },
  upButton: {
    transform: [{rotate: '180deg'}],
  },
  downButton: {},
  answearsCommentViews: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
