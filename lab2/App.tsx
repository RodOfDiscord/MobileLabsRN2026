import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { News } from "./entities/news/types";
import { NewsScreen } from "./screens/NewsScreen";
import { DetailsScreen } from "./screens/DetailsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { CustomDrawer } from "./widgets/drawer-menu/CustomDrawer";
import { ContactsScreen } from "./screens/ContactsScreen";

export type NewsStackParams = {
  Main: undefined;
  Details: { news: News };
};

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<NewsStackParams>();

const NewsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Main"
      component={NewsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Details"
      component={DetailsScreen}
      options={({ route }) => ({
        title: route.params.news.title,
      })}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
        <Drawer.Screen
          name="Новини"
          options={{ headerShown: false }}
          component={NewsStack}
        />
        <Drawer.Screen name="Контакти" component={ContactsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
