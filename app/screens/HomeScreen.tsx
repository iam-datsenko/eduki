import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {ApiQuery, ApiResponse, Material} from '../types';
import MaterialCard from '../components/MaterialCard';
import {useOrientation} from '../hooks/useOrientation';

const HomeScreen: FC = ({}) => {
  const [query, setQuery] = useState<ApiQuery>({
    limit: '20',
    p: '1',
    q: '',
    world: 'de',
  });
  const [data, setData] = useState<ApiResponse>({
    materials: [],
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const orientation = useOrientation();

  const onSubmit = useCallback(() => {
    setLoading(true);

    setData({
      ...data,
      materials: [],
    });

    setQuery({...query, q: search});
  }, [data, query, search]);

  const onChangeText = useCallback((text: string) => {
    setSearch(text);
  }, []);

  const renderCard = useCallback(
    ({item, index}: {item: Material; index: number}) => (
      <MaterialCard item={item} isEven={index % 2 !== 0} />
    ),
    [],
  );

  const getData = useCallback(() => {
    const searchParams = new URLSearchParams(query).toString();

    return fetch(`${process.env.API_URL as string}?${searchParams}`, {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    })
      .then(response => response.json())
      .catch(e => console.log(e));
  }, [query]);

  const onEndReached = useCallback(() => {
    if (data.materials.length < data.total) {
      setQuery({...query, p: (parseInt(query.p, 10) + 1).toString()});
    }
  }, [query, data]);

  const onRefresh = useCallback(() => {
    setLoading(true);
    setQuery(q => ({
      ...q,
      p: '1',
    }));
  }, []);

  useEffect(() => {
    getData()
      .then(result => {
        setData(current => {
          return {
            materials: [
              ...(current?.materials || []),
              ...result.data.items.materials,
            ],
            total: result.data.total,
          };
        });
      })
      .finally(() => setLoading(false));
  }, [getData]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={'Search'}
        onChangeText={onChangeText}
        value={search}
        style={styles.input}
        onSubmitEditing={onSubmit}
        returnKeyType={'search'}
        autoCorrect={false}
        autoCapitalize={'none'}
      />

      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {!loading && !!data?.materials && data?.materials.length > 0 && (
        <FlatList
          key={orientation}
          refreshing={loading}
          data={data.materials}
          horizontal={false}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          onEndReachedThreshold={5}
          numColumns={orientation === 'PORTRAIT' ? 1 : 2}
          keyExtractor={item => item.id.toString()}
          renderItem={renderCard}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
        />
      )}

      {!loading && !!data?.materials && data?.materials.length === 0 && (
        <Text style={styles.empty}>No results found 😢</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 16,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 24,
    fontSize: 16,
  },
  list: {
    gap: 16,
  },
  empty: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default HomeScreen;
