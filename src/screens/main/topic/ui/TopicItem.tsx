import {Button} from 'components/Button';
import RN from 'components/RN';
import React from 'react';
import UserIcon from 'shared/assets/icons/UserIcon';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight} from 'shared/utils/dimensions';

export default () => {
  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.leftBox}>
        <RN.View>
          <UserIcon size={24} color={COLORS.white} />
        </RN.View>
        <RN.View style={styles.title}>
          <RN.Text children="Topic name" color={COLORS.white} size="h3" />
          <RN.Text
            children="Followers: 37mln"
            color={COLORS.textGray}
            size="h6"
          />
        </RN.View>
      </RN.View>
      <Button title="Follow" width={80} height={40} />
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: normalizeHeight(50),
  },
  leftBox: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  title: {
    gap: 2,
  },
});
