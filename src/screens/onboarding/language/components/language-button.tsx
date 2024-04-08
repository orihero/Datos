import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../shared/constants/colors';

export interface LanguageButtonProps {
  text: string;
  image: ImageSourcePropType | undefined;
  onPress?: () => void;
}

const LanguageButton = ({image, text, onPress}: LanguageButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={[styles.flex, {alignItems: 'flex-end'}]}>
          <Image source={image} style={styles.image} />
        </View>
        <View style={styles.flex}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LanguageButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: COLORS.lightGray,
    borderRadius: 40,
    paddingVertical: 20,
  },
  image: {
    width: 69,
    height: 46,
    marginRight: 10,
  },

  text: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
  },
});
