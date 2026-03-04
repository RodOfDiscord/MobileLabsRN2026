import { StackNavigationProp } from "@react-navigation/stack";
import { NewsList } from "../widgets/news-list/NewsList";
import { News } from "../entities/news/types";
import { useNavigation } from '@react-navigation/native';
import { NewsStackParams } from "../App";

type Nav = StackNavigationProp<NewsStackParams, 'Main'>;

export const NewsScreen = () => {
  const navigation = useNavigation<Nav>();

  const handlePress = (news: News) => {
    navigation.navigate('Details', { news });
  };

  return <NewsList onPressItem={handlePress} />;
};