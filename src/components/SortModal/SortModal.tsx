import {Button} from 'components/Button';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import CloseIcon from 'shared/assets/icons/CloseIcon';
import {COLORS} from 'shared/constants/colors';
import {useRootStore} from 'shared/store/hooks/useRootStore';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const SortModal: React.FC<Props> = ({isVisible, onClose}) => {
  const {topic} = useRootStore();

  return (
    <RN.Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <RN.View style={styles.overlay}>
        <RN.View style={styles.container}>
          <RN.TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <CloseIcon size={32} color={COLORS.black} />
          </RN.TouchableOpacity>
          <RN.View ai={'center'} pb={10}>
            <RN.Text size="h2">Sort by</RN.Text>
          </RN.View>
          <Spacing height={10} />
          <Button
            title="Sort by date"
            outline={!topic.state.sortState?.byDate}
            justifyContent={'flex-start'}
            onPress={() =>
              topic.onChangeOfSortState(
                'byDate',
                !topic.state.sortState?.byDate,
              )
            }
          />
          <Spacing height={10} />
          <Button
            title="Sort by votes"
            justifyContent={'flex-start'}
            outline={!topic.state.sortState?.byVotes}
            onPress={() =>
              topic.onChangeOfSortState(
                'byVotes',
                !topic.state.sortState?.byVotes,
              )
            }
          />
          <Spacing height={10} />
          <Button
            title="Sort by views"
            justifyContent={'flex-start'}
            outline={!topic.state.sortState?.byViews}
            onPress={() =>
              topic.onChangeOfSortState(
                'byViews',
                !topic.state.sortState?.byViews,
              )
            }
          />
          <Spacing height={10} />
          <Button
            title="Sort by comments"
            outline={!topic.state.sortState?.bycomments}
            justifyContent={'flex-start'}
            onPress={() =>
              topic.onChangeOfSortState(
                'bycomments',
                !topic.state.sortState?.bycomments,
              )
            }
          />
          <Spacing height={10} />
          <Button
            title="Sort by followers"
            outline={!topic.state.sortState?.byFollowers}
            justifyContent={'flex-start'}
            onPress={() =>
              topic.onChangeOfSortState(
                'byFollowers',
                !topic.state.sortState?.byFollowers,
              )
            }
          />
          <Spacing height={20} />
          <Button title="Filter" onPress={topic.onSortHandle} />
        </RN.View>
      </RN.View>
    </RN.Modal>
  );
};

export default observer(SortModal);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
});
