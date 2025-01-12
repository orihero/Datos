import Container from 'components/Container';
import RN from 'components/RN';
import React from 'react';
import Header from '../../topic/ui/Header';
import CreateTopicDisplay from '../createNewTopic/ui/Display';
import {useTranslation} from 'react-i18next';

const CreateTopic = () => {
  const {t} = useTranslation();
  return (
    <Container Header={<Header title={`${t('new_topic')}`} isTopics={false} />}>
      <RN.View ph={12} flex={1} g={10}>
        <CreateTopicDisplay />
      </RN.View>
    </Container>
  );
};

export default CreateTopic;

const styles = RN.StyleSheet.create({
  container: {},
});
