import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { EnvironmentButton } from '../components/EnvironmentButton';
import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlantCardPrimary } from '../components/PlantCardPrimary';

import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import type { ScreenProps } from '../routes/stack.routes';

interface EnvironmentProps {
  key: string;
  title: string;
}

interface PlantProps {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: {
    times: number;
    repeat_every: string;
  };
}

export type { PlantProps };

export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState('all');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const navigation = useNavigation<ScreenProps>();

  function handleEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment);

    if (environment === 'all') return setFilteredPlants(plants);
    const filtered = plants.filter((plant: PlantProps) =>
      plant.environments.includes(environment)
    );
    setFilteredPlants(filtered);
  }

  useEffect(() => {
    api
      .get('/plants_environments', {
        params: { _sort: 'title', _order: 'asc' },
      })
      .then((response) => {
        setEnvironments([
          {
            key: 'all',
            title: 'All',
          },
          ...response.data,
        ]);
      });
  }, []);

  function fetchPlants() {
    api
      .get('/plants', {
        params: { _sort: 'name', _order: 'asc', _page: page, _limit: 8 },
      })
      .then((response) => {
        const { data } = response;
        if (!data) return setLoading(false);
        if (page > 1) {
          setPlants((oldValue) => [...oldValue, ...data]);
          setFilteredPlants((oldValue) => [...oldValue, ...data]);
        } else {
          setPlants(data);
          setFilteredPlants(data);
        }
        setLoading(false);
        setLoadingMore(false);
      });
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) return;
    setLoadingMore(true);
    setPage((oldValue) => oldValue + 1);
  }

  useEffect(() => {
    fetchPlants();
  }, [page]);

  useEffect(() => {
    setLoading(true);
    fetchPlants();
  }, []);

  function handlePlantSelect(plant: PlantProps) {
    navigation.navigate('PlantSave', { plant });
  }

  if (loading) return <Load />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Which environment</Text>
        <Text style={styles.subtitle}>do you want to place your plant?</Text>
      </View>
      <View>
        <FlatList
          data={environments}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <EnvironmentButton
              title={item.title}
              active={environmentSelected === item.key}
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>
      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              onPress={() => handlePlantSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    paddingLeft: 32,
    paddingRight: 10,
    marginVertical: 32,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
});
