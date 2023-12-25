import { View, Text, useWindowDimensions, ScrollView } from 'react-native'
import React from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { appleSystemFillGray10 } from '../src/Config';
import PaymentCard from '../components/PaymentCard';
import HorizontalLine from '../components/HorizontalLine';

const FirstRoute = () => (
  <ScrollView className="flex-1 px-5 py-5">
    <View>
      <PaymentCard
        paymentInfo="EXAM FEE S2 V SEM NOV 2023"
        paymentAmount="₹ 1,050"
        buttonText="Pay Now"
        buttonAction={() => { }}
      />
      <HorizontalLine />
      <PaymentCard
        paymentInfo="Library Due - 2022 (Little Flower Book)"
        paymentAmount="₹ 800"
        buttonText="Pay Now"
        buttonAction={() => { }}
      />
    </View>
  </ScrollView>
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const ThirdRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'All' },
    { key: 'second', title: 'Not Paid' },
    { key: 'third', title: 'Paid' },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: appleSystemFillGray10 }}
      style={{ backgroundColor: 'white' }}
      activeColor={"black"}
      inactiveColor={"gray"}
      labelStyle={{ fontWeight: 500 }}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <Header screenName={"Fees & Dues"} />
      <TabView
        renderTabBar={renderTabBar}
        style={{ backgroundColor: 'white' }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </SafeAreaView>
  );
}