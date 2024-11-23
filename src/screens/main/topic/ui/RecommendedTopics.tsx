import RN from 'components/RN';
import React from 'react';
import {COLORS} from 'shared/constants/colors';
import TopicItem from './TopicItem';
import {Spacing} from 'components/Spacing';

export default () => {
  return (
    <RN.View style={styles.container}>
      <RN.Text color={COLORS.white} children="Recommended for you" size="h2" />
      <Spacing height={10} />
      <RN.View style={styles.recomended}>
        <TopicItem />
      </RN.View>
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {},
  recomended: {
    gap: 10,
  },
});
