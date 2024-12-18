import {useNavigation} from '@react-navigation/native';
import RN from 'components/RN';
import React, {FC} from 'react';
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import {MockUserPngImage} from 'shared/assets/images/mock';
import {COLORS} from 'shared/constants/colors';
import {HOME_STACK} from 'shared/navigation/routes';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

interface Props {
  activeInfo?: 'answear' | 'comments' | 'views';
}

const Question: FC<Props> = ({activeInfo}) => {
  const navigation = useNavigation();

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.top}>
        <RN.View fd={'row'} ai={'center'} jc={'space-between'}>
          <RN.View fd={'row'} ai={'center'} g={8}>
            <RN.Image source={MockUserPngImage} style={styles.userImage} />
            <RN.View>
              <RN.Text children="Ola Dealova" size="h2" font="Medium" />
              <RN.Text children="5 min ago" size="h6" />
            </RN.View>
          </RN.View>
          <RN.TouchableOpacity style={styles.followButton}>
            <RN.Text children="Follow" size="h4" />
          </RN.TouchableOpacity>
        </RN.View>

        <RN.View p={12} style={styles.question}>
          <RN.View style={styles.upDown}>
            <RN.TouchableOpacity style={styles.upButton}>
              <ArrowDownIcon size={32} />
            </RN.TouchableOpacity>
            <RN.Text size="h2" font="Medium">
              1
            </RN.Text>
            <RN.TouchableOpacity style={styles.downButton}>
              <ArrowDownIcon size={32} />
            </RN.TouchableOpacity>
          </RN.View>
          <RN.Text size="h2" font="Medium">
            How do you define UX with an example?
          </RN.Text>
        </RN.View>
      </RN.View>
      <RN.View style={styles.answearsCommentViews}>
        <RN.TouchableOpacity
          style={[
            styles.answear,
            {
              borderColor:
                activeInfo === 'answear' ? COLORS.white : COLORS.transparent,
            },
          ]}
          onPress={() => navigation.navigate(HOME_STACK.ANSWEAR as never)}>
          <RN.Text
            size="h4"
            font="Medium"
            color={activeInfo === 'answear' ? COLORS.white : COLORS.textGray}>
            Answears:5
          </RN.Text>
        </RN.TouchableOpacity>
        <RN.TouchableOpacity
          style={[
            styles.answear,
            {
              borderColor:
                activeInfo === 'comments' ? COLORS.white : COLORS.transparent,
            },
          ]}>
          <RN.Text
            size="h4"
            font="Medium"
            color={activeInfo === 'comments' ? COLORS.white : COLORS.textGray}>
            Comments: 10
          </RN.Text>
        </RN.TouchableOpacity>
        <RN.TouchableOpacity
          style={[
            styles.answear,
            {
              borderColor:
                activeInfo === 'views' ? COLORS.white : COLORS.transparent,
            },
          ]}>
          <RN.Text
            size="h4"
            font="Medium"
            color={activeInfo === 'views' ? COLORS.white : COLORS.textGray}>
            Views: 20
          </RN.Text>
        </RN.TouchableOpacity>
      </RN.View>
    </RN.View>
  );
};

export default Question;

const styles = RN.StyleSheet.create({
  container: {
    backgroundColor: COLORS.dargGray,
    borderRadius: 40,
  },
  top: {
    padding: 6,
    borderRadius: 40,
    backgroundColor: COLORS.white,
  },
  userImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  followButton: {
    // height: normalizeHeight(65),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalizeWidth(35),
    paddingVertical: normalizeHeight(15),
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 40,
  },
  question: {
    flexDirection: 'row',
    gap: 10,
  },
  upDown: {
    alignItems: 'center',
  },
  upButton: {
    transform: [{rotate: '180deg'}],
  },
  downButton: {},
  answearsCommentViews: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalizeWidth(15),
    paddingVertical: normalizeHeight(15),
  },
  answear: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 15,
    borderColor: COLORS.white,
    color: COLORS.white,
  },
});
