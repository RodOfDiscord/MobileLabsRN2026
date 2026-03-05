import { useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { NewsList } from "../widgets/news-list/NewsList";
import { News } from "../entities/news/types";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { NewsStackParams } from "../App";

type Nav = StackNavigationProp<NewsStackParams, "Main">;

export const NewsScreen = () => {
  const navigation = useNavigation<Nav>();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Новини",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={{ marginLeft: 16, marginRight: 16 }}
        >
          <Text style={{ fontSize: 22 }}>☰</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const handlePress = (news: News) => {
    navigation.navigate("Details", { news });
  };

  return <NewsList onPressItem={handlePress} />;
};
