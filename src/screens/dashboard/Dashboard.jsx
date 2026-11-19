import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home } from "../home/Home"
import { Entypo, FontAwesome6, Ionicons, SimpleLineIcons } from "@expo/vector-icons"
import { TransferScreen } from "../transfer/TransferScreen"
import { AccountCards } from "../cards/AccountCards";
import { MenuScreen } from "../menu/MenuScreen";


const Tab = createBottomTabNavigator();
export const Dashboard = () => {

    return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Transfer"
        component={TransferScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="money-bill-transfer" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Cards"
        component={AccountCards}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="credit-card" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="menu" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}