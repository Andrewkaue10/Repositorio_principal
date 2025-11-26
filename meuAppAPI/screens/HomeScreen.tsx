import React, { useEffect, useState } from 'react';
import { ScrollView, View, Image } from 'react-native';
import {
  Card,
  ActivityIndicator,
  Text,
  Searchbar,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/AppStack';

type Navigation = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const [pokemon, setPokemon] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const navigation = useNavigation<Navigation>();

  useEffect(() => {
   fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
  .then(res => res.json())
  .then(async json => {
    const results = await Promise.all(
      json.results.map(async (item: any) => {
        const res = await fetch(item.url);
        const fullData = await res.json();
        return {
          name: item.name,
          image: fullData.sprites.front_default
        };
      })
    );

    setPokemon(results);
    setFiltered(results);
  })
  .finally(() => setLoading(false));
  }, []);

  const filterSearch = (query: string) => {
    setSearch(query);
    const result = pokemon.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;

  return (
    <ScrollView style={{ padding: 10 }}>
      <Searchbar
        placeholder="Buscar Pokémon"
        value={search}
        onChangeText={filterSearch}
        style={{ marginBottom: 10 }}
      />

      {filtered.map((item, index) => {
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`;
        return (
          <Card
            key={index}
            style={{ marginVertical: 8 }}
            onPress={() =>
              navigation.navigate('Details', { name: item.name })
            }
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              <Image
                source={{ uri: item.image }}
                style={{ width: 70, height: 70, marginRight: 10 }}
              />
                <Text variant="titleMedium">{item.name.toUpperCase()}</Text>

              /  
              <Text variant="titleMedium">{item.name.toUpperCase()}</Text>
            </View>
          </Card>
        );
      })}
    </ScrollView>
  );
}
