import React from 'react';
import { Button, SafeAreaView, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Button title="Global Flow" onPress={() => navigation.navigate('GlobalFlow')} />
          <Button title="Playground" onPress={() => navigation.navigate('Playground')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
