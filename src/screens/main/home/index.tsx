import Container from 'components/Container';
import React from 'react';
import {HomeHeader} from './ui';
import {QuestionCard} from 'components/Cards';
import RN from 'components/RN';
import Poll from 'components/Cards/ui/Poll';

export default function HomeScreen() {
  return (
    <Container Header={<HomeHeader />}>
      <RN.View ph={12} pt={20} flex={1} g={10}>
        <QuestionCard />
        <Poll />
      </RN.View>
    </Container>
  );
}
