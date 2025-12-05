import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { Text, ActivityIndicator, Card } from 'react-native-paper';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigations/AppStack';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

export default function DetailsScreen() {
  const route = useRoute<DetailsScreenRouteProp>();
  const { name } = route.params;

  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(json => setDetails(json));
  }, [name]);

  if (!details) return <ActivityIndicator style={{ marginTop: 20 }} />;

  return (
    <View style={{ padding: 20 }}>
      <Card style={{ alignItems: 'center', padding: 20 }}>
        <Image
          source={{ uri: details.sprites.front_default }}
          style={{ width: 150, height: 150 }}
        />
        <Text variant="headlineSmall" style={{ marginTop: 10 }}>
          {details.name.toUpperCase()}
        </Text>

        <Text>Peso: {details.weight}</Text>
        <Text>Altura: {details.height}</Text>

        <Text style={{ marginTop: 10 }}>
          Tipo: {details.types.map((t: any) => t.type.name).join(', ')}
        </Text>
      </Card>
    </View>
  );
}
