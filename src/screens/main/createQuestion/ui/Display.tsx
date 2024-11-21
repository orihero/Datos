import {TextInput} from 'components/Inputs/TextInput';
import RN from 'components/RN';
import React from 'react';
import {COLORS} from 'shared/constants/colors';

const Display = () => {
  return (
    <RN.View style={styles.container}>
      <TextInput onChangeText={() => {}} value="" placeholder="Topic" />
    </RN.View>
  );
};

export default Display;

const styles = RN.StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: 100,
  },
});
