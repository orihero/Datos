import LottieView from 'lottie-react-native';
import React from 'react';
import {Dimensions, ScrollView, Text, View} from 'react-native';
import {useOnboardingStepsHook} from './hooks';
import {onboardingStepsStyles} from './styles';
import Animated, {
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

const OnboardingStepsScreen = () => {
  const {stepsData, scrollX, translateX, textScrollRef} =
    useOnboardingStepsHook();

  return (
    <View style={onboardingStepsStyles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        style={{height: 0}}
        onScroll={e => {
          scrollX.value = e.nativeEvent.contentOffset.x;
        }}
        showsHorizontalScrollIndicator={false}>
        {stepsData.map(e => {
          return (
            <View style={onboardingStepsStyles.item} key={e.title}>
              <LottieView
                style={onboardingStepsStyles.animation}
                source={e.animation}
                autoPlay
              />
            </View>
          );
        })}
      </ScrollView>
      <View style={{flex: 1}}>
        <View style={onboardingStepsStyles.dotsContainer}>
          <View style={{flexDirection: 'row'}}>
            {stepsData.map(e => {
              return (
                <View key={e.description} style={onboardingStepsStyles.dot} />
              );
            })}
            <Animated.View
              style={[
                onboardingStepsStyles.activeDot,
                {transform: [{translateX}]},
              ]}
            />
          </View>
        </View>
        <Animated.ScrollView
          ref={textScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {stepsData.map(e => {
            return (
              <View style={onboardingStepsStyles.textContainer}>
                <Text style={onboardingStepsStyles.title}>{e.title} </Text>
              </View>
            );
          })}
        </Animated.ScrollView>
      </View>
    </View>
  );
};

export default OnboardingStepsScreen;
