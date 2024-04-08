import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import React from 'react';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

export default () => (
  <>
    <Spacing height={20} />
    <RN.View style={styles.group}>
      <RN.TouchableOpacity style={styles.button}>
        <RN.Text style={styles.buttonText}>Question</RN.Text>
      </RN.TouchableOpacity>
      <RN.TouchableOpacity style={[styles.button, styles.activeButton]}>
        <RN.Text style={styles.buttonText}>Answers</RN.Text>
      </RN.TouchableOpacity>
    </RN.View>
    <Spacing height={20} />
  </>
);

const styles = RN.StyleSheet.create({
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalizeWidth(8),
    paddingVertical: normalizeHeight(6),
    backgroundColor: COLORS.dargGray,
    borderRadius: 54,
    borderWidth: 2,
    borderColor: COLORS.dargGray,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
  },
  button: {
    height: normalizeHeight(65),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 54,
  },
  activeButton: {
    backgroundColor: COLORS.blue,
  },
});
