import { View, Text, useWindowDimensions, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { appleSystemFillGray10 } from '../src/Config';
import PaymentCard from '../components/PaymentCard';
import HorizontalLine from '../components/HorizontalLine';
import { useNavigation } from '@react-navigation/native';

const All = () => (
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
        isPaid={true}
        buttonAction={() => { }}
      />
    </View>
  </ScrollView>
);

const NotPaid = () => (
  <ScrollView className="flex-1 px-5 py-5">
    <View>
      <PaymentCard
        paymentInfo="EXAM FEE S2 V SEM NOV 2023"
        paymentAmount="₹ 1,050"
        buttonText="Pay Now"
        buttonAction={() => { }}
      />
    </View>
  </ScrollView>
);

const Paid = () => (
  <ScrollView className="flex-1 px-5 py-5">
    <View>
      <PaymentCard
        paymentInfo="Library Due - 2022 (Little Flower Book)"
        paymentAmount="₹ 800"
        buttonText="Pay Now"
        isPaid={true}
        buttonAction={() => { }}
      />
    </View>
  </ScrollView>
);

const renderScene = SceneMap({
  allRoute: All,
  notPaidRoute: NotPaid,
  paidRoute: Paid
});

export default function FeesDueScreen() {

  const navigation = useNavigation()
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      }
    })
  }, [])
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'allRoute', title: 'All' },
    { key: 'notPaidRoute', title: 'Not Paid' },
    { key: 'paidRoute', title: 'Paid' },
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
    <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
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