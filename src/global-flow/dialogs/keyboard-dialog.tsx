import { DialogContext } from '../../../packages/react-native-global-flow/src';
import React, { useCallback, useMemo } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { ListRenderItemInfo } from 'react-native/Libraries/Lists/VirtualizedList';

export const KeyboardDialog = (_uProps: DialogContext<null, null>) => {
  const data = useMemo(() => {
    const size = 100;
    let _data = new Array<string>(size);
    for (let i = 0; i < size; i++) {
      _data[i] = `${i}`;
    }
    return _data;
  }, []);

  const renderItem = useCallback((info: ListRenderItemInfo<string>) => {
    return (
      <View style={{ padding: 10, borderRadius: 5, backgroundColor: 'white', marginBottom: 5 }}>
        <Text>{info.item}</Text>
      </View>
    );
  }, []);

  return (
    <View style={{ borderWidth: 1, backgroundColor: 'silver', padding: 20, width: '80%', flex: 1 }}>
      <TextInput
        style={{ backgroundColor: 'white', borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10 }}
      />
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};
