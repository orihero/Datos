import React, {useEffect} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import CloseIcon from 'shared/assets/icons/CloseIcon';
import {COLORS} from 'shared/constants/colors';

interface AlertProps {
  isShow: boolean;
  message: string;
  onClose: () => void;
}

const AnimatedAlert: React.FC<AlertProps> = ({isShow, message, onClose}) => {
  const translateY = useSharedValue(-100);

  useEffect(() => {
    if (isShow) {
      translateY.value = withTiming(0, {duration: 200});
    } else {
      translateY.value = withTiming(-100, {duration: 200});
    }
  }, [isShow, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  return (
    <Animated.View
      style={[
        styles.alertContainer,
        animatedStyle,
        {top: isShow ? -80 : -200, display: isShow ? 'flex' : 'none'},
      ]}>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={onClose}>
        <CloseIcon color={COLORS.black} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginHorizontal: 10,
    marginTop: 20,
  },
  icon: {
    marginRight: 10,
  },
  message: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
});

export default AnimatedAlert;
