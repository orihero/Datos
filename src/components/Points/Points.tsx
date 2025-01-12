import RN from 'components/RN';
import React from 'react';
import {COLORS} from 'shared/constants/colors';

const Points = ({totalPoints}: {totalPoints: number}) => {
  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.circle}>
        <RN.View style={styles.innerCircle}>
          <RN.Text style={styles.pointsText}>Points</RN.Text>
          <RN.Text style={styles.pointsValue}>{totalPoints}</RN.Text>
        </RN.View>
      </RN.View>
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  circle: {
    width: 85,
    height: 85,
    borderRadius: 60,
    backgroundColor: COLORS.store, // Kulrang fon (doira)
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: COLORS.white, // Oq rang (ichki doira)
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dargGray,
  },
  pointsValue: {
    fontSize: 14,
    color: COLORS.textGray,
  },
});

export default Points;
