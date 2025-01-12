import RN from 'components/RN';
import React, {FC} from 'react';
import {COLORS} from 'shared/constants/colors';

interface Props {
  level: number;
  levelProgress: number;
}

const Level: FC<Props> = ({level, levelProgress}) => {
  const progressDegree = (levelProgress / 100) * 360;

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.circle}>
        {/* Left (first half) */}
        <RN.View
          style={[
            styles.halfCircle,
            {
              transform: [{rotate: `${Math.min(progressDegree, 180)}deg`}],
              backgroundColor: progressDegree > 0 ? COLORS.blue : 'transparent',
            },
          ]}
        />
        {/* Right (second half) */}
        {progressDegree > 180 && (
          <RN.View
            style={[
              styles.halfCircle,
              {
                transform: [{rotate: `${progressDegree - 180}deg`}],
                backgroundColor: COLORS.blue,
              },
            ]}
          />
        )}
        <RN.View style={styles.innerCircle}>
          <RN.Text style={styles.levelText}>{`Level ${level}`}</RN.Text>
          <RN.Text style={styles.progressText}>{`${levelProgress}%`}</RN.Text>
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
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  halfCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
});

export default Level;
