import RN from 'components/RN';
import React from 'react';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

export default () => {
  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.topicInput} pt={20}>
        <RN.TextInput
          onChangeText={() => {}}
          // value=""
          placeholder="Topic"
          placeholderTextColor={COLORS.lightGray}
          style={styles.input}
        />
      </RN.View>
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    // backgroundColor: COLORS.white,
    height: 100,
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
});
