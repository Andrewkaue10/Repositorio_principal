import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList, Image, Alert, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

const API_URL = 'http://172.26.47.72:3000';
// Se for testar no celular físico na mesma rede, use o IP da máquina:
// const API_URL = 'http://SEU_IP_LOCAL:3000';
// ipconfig getifaddr en0


type Place = {
  _id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  photo?: string | null;
  createdAt?: string;
};

export default function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const res = await fetch(`${API_URL}/api/places`);
      const data = await res.json();
      setPlaces(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar os registros');
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'É necessário permitir o acesso à localização.');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'É necessário permitir o uso da câmera.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      if (asset.base64) {
        const base64Img = `data:image/jpeg;base64,${asset.base64}`;
        setPhoto(base64Img);
      } else if (asset.uri) {
        setPhoto(asset.uri);
      }
    }
  };

  const handleSave = async () => {
    if (!title || !description || latitude == null || longitude == null) {
      Alert.alert('Campos obrigatórios', 'Preencha título, descrição e localização.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/places`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          latitude,
          longitude,
          photo,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('Erro ao salvar', errorData);
        Alert.alert('Erro', 'Falha ao salvar o registro.');
        return;
      }

      const created = await res.json();
      setPlaces((prev) => [created, ...prev]);
      setTitle('');
      setDescription('');
      setLatitude(null);
      setLongitude(null);
      setPhoto(null);
      Alert.alert('Sucesso', 'Registro salvo com sucesso!');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha na conexão com o backend.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Place }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <Text style={styles.cardCoords}>
        Lat: {item.latitude.toFixed(5)} | Lng: {item.longitude.toFixed(5)}
      </Text>
      {item.photo ? <Image source={{ uri: item.photo }} style={styles.cardImage} /> : null}
      {item.createdAt ? (
        <Text style={styles.cardDate}>{new Date(item.createdAt).toLocaleString()}</Text>
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.title}>Cadastro de Ponto com Foto e Localização</Text>

        <TextInput
          style={styles.input}
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <View style={styles.row}>
          <Button title="Obter Localização" onPress={getLocation} />
        </View>
        <Text style={styles.coordsText}>Latitude: {latitude ?? '-'}</Text>
        <Text style={styles.coordsText}>Longitude: {longitude ?? '-'}</Text>

        <View style={styles.row}>
          <Button title="Tirar Foto" onPress={takePhoto} />
        </View>
        {photo && <Image source={{ uri: photo }} style={styles.previewImage} />}

        <View style={styles.row}>
          <Button title={loading ? 'Salvando...' : 'Salvar'} onPress={handleSave} disabled={loading} />
        </View>
      </ScrollView>

      <Text style={styles.listTitle}>Registros Cadastrados</Text>
      <FlatList
        data={places}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
  },
  form: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  row: {
    marginVertical: 8,
  },
  coordsText: {
    fontSize: 14,
    marginBottom: 2,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 12,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  cardCoords: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginTop: 4,
  },
  cardDate: {
    fontSize: 11,
    color: '#777',
    marginTop: 4,
  },
});
