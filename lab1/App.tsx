import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0f0f15',
  },
};

export default function App() {  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['bottom']}>
      <NavigationContainer theme={MyTheme}>
        <View style={styles.content}>
          <RootNavigator />
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText} >Паламарчук Іван Сергійович 	ІПЗ-22-2</Text>
        </View>
      </NavigationContainer>
      </SafeAreaView>
      
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    
  },
  footer: {
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e1e2e',
  },
  footerText: {
    fontSize: 14,
    color: '#a0a0a0',
    fontWeight: '500',
  },
});