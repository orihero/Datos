import RN from 'components/RN';
import React, {FC} from 'react';
import Svg, {Circle} from 'react-native-svg';
import {COLORS} from 'shared/constants/colors';

interface Props {
  level: number;
  upOrDownVote: number;
  usedVotes: number;
}

const CircularProgress: FC<Props> = ({upOrDownVote, usedVotes, level}) => {
  const percentage =
    upOrDownVote === 0 ? 0 : Math.min((usedVotes / upOrDownVote) * 100, 100);
  const radius = 40; // Doira radiusi (20 pikselga kichraytirildi)
  const strokeWidth = 8; // Chegaraning qalinligi (mos ravishda o'zgartirildi)
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  return (
    <RN.View style={styles.container}>
      <Svg width={100} height={100}>
        {/* Kulrang orqa doira */}
        <Circle
          cx="50"
          cy="50"
          r={radius}
          stroke={COLORS.store}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Faol progress */}
        <Circle
          cx="50"
          cy="50"
          r={radius}
          stroke={COLORS.blue}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          transform="rotate(-90 50 50)" // Progressni tepadan boshlash
        />
      </Svg>
      <RN.View style={styles.innerCircle}>
        <RN.Text style={styles.levelText}>{`Level ${level}`}</RN.Text>
        <RN.Text style={styles.progressText}>
          {usedVotes}/{upOrDownVote}
        </RN.Text>
      </RN.View>
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15, // Mos ravishda kichraytirildi
  },
  innerCircle: {
    width: 60, // Ichki doira kengligi (20 pikselga kichraytirildi)
    height: 60,
    borderRadius: 30, // Yangi o'lchamlar asosida radius
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  levelText: {
    fontSize: 14, // Matn o'lchami kichraytirildi
    fontWeight: 'bold',
    color: COLORS.dargGray,
  },
  progressText: {
    fontSize: 10, // Matn o'lchami kichraytirildi
    color: COLORS.textGray,
  },
});

export default CircularProgress;
