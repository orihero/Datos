import {useNavigation} from '@react-navigation/native';
import RN from 'components/RN';
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';

import {MMKV} from 'react-native-mmkv';
import {FetchInterestsApi} from 'shared/api/interests.api';
import {COLORS} from 'shared/constants/colors';
import {OnbardingStackProps} from 'shared/navigation/navigators/OnboardingStack';
import {ONBOARDING_STACK, ROOT_STACK} from 'shared/navigation/routes';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';
import {HIT_SLOP} from 'shared/styles/globalStyles';

const storage = new MMKV();

interface Interest {
  name: string;
  img: string;
}

const InterestsScreen = () => {
  const [selectedInterest, setSelectedInterest] = useState<string[]>([]);
  // const navigation = useNavigation();
  const navigation =
    useNavigation<
      OnbardingStackProps<ONBOARDING_STACK.ONBOARDING_LANGUAGE>['navigation']
    >();
  const [interests, setInterests] = useState<Interest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchInterests = useCallback(async () => {
    try {
      const documentSnapshot = await FetchInterestsApi();
      setInterests(documentSnapshot);
    } catch (error) {
      console.error('Error fetching interests:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInterests();
    const savedInterests = storage.getString('selectedInterest');
    if (savedInterests) {
      setSelectedInterest(JSON.parse(savedInterests));
    }
  }, [fetchInterests]);

  const toggleInterest = (interest: string) => {
    setSelectedInterest(prev =>
      prev.includes(interest)
        ? prev.filter(item => item !== interest)
        : [...prev, interest],
    );
  };

  const saveInterests = () => {
    storage.set('selectedInterest', JSON.stringify(selectedInterest));
    navigation.navigate(ROOT_STACK.AUTH);
  };

  const renderInterest = ({item}: {item: {name: string; img?: any}}) => {
    const isSelected = selectedInterest.includes(item?.name);

    return (
      <RN.TouchableOpacity
        style={[
          styles.interestButton,
          isSelected ? styles.selectedButton : null,
        ]}
        onPress={() => toggleInterest(item?.name)}>
        <RN.Image
          source={{uri: item.img}}
          resizeMode="cover"
          style={styles.iconImg}
        />

        <RN.Text
          style={[
            styles.interestText,
            isSelected ? styles.selectedText : null,
          ]}>
          {item?.name}
        </RN.Text>
      </RN.TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <RN.View style={styles.header}>
      <RN.TouchableOpacity
        hitSlop={HIT_SLOP}
        onPress={() => navigation.goBack()}
        style={styles.headerLeft}>
        <ArrowLeftIcon size={24} color={COLORS.black} />
      </RN.TouchableOpacity>
      <RN.View style={styles.headerInfo}>
        <RN.Text style={styles.headerTitle}>Interests</RN.Text>
        <RN.Text style={styles.headerSubtitle}>
          Pick things you’d like to see in your home feed.
        </RN.Text>
      </RN.View>
    </RN.View>
  );

  if (loading) {
    return (
      <RN.View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <RN.Text>Loading...</RN.Text>
      </RN.View>
    );
  }

  return (
    <RN.View style={styles.container}>
      {renderHeader()}
      <RN.FlatList
        data={interests}
        keyExtractor={item => item.name.toString()}
        renderItem={renderInterest}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      <RN.View style={styles.footerBox}>
        <RN.TouchableOpacity
          style={[
            styles.footer,
            {
              backgroundColor:
                selectedInterest.length > 0 ? COLORS.blue : COLORS.blue3,
            },
          ]}
          disabled={selectedInterest.length === 0}
          onPress={saveInterests}>
          <RN.Text style={styles.footerText}>
            {selectedInterest.length > 0 ? 'Continue' : '0 of 1 selected'}
          </RN.Text>
        </RN.TouchableOpacity>
      </RN.View>
    </RN.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  listContainer: {
    paddingBottom: 60,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  headerLeft: {
    width: normalizeWidth(30),
    position: 'absolute',
    left: 0,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: normalizeHeight(20),
  },
  headerInfo: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.darkGray2,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedButton: {
    borderWidth: 1.5,
    borderColor: COLORS.blue,
    borderStyle: 'solid',
  },
  interestText: {
    fontSize: 14,
    color: COLORS.black,
  },
  selectedText: {
    color: COLORS.black,
  },
  footer: {
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 20,
  },
  footerText: {
    color: COLORS.white,
  },
  footerBox: {
    backgroundColor: COLORS.white,
    width: '100%',
    marginBottom: 30,
    paddingTop: 20,
  },
  iconImg: {
    width: 22,
    height: 22,
    marginRight: 5,
  },
  image: {
    width: 69,
    height: 46,
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InterestsScreen;
