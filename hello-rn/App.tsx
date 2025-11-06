import React from "react";
import {
  View,
  Text,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-paper";
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const App: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://via.placeholder.com/200" }} // coloque sua foto real aqui
          style={styles.profilePic}
        />
        <Text style={styles.name}>Andrew Kauê</Text>
        <Text style={styles.title}>
          Desenvolvedor Full Stack | Técnico em TI
        </Text>
      </View>

      {/* Sobre */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>💬 Sobre Mim</Text>
          <Text style={styles.text}>
            Sou técnico da informação com três anos de experiência e
            desenvolvedor há dois. Apaixonado por tecnologia, busco sempre criar
            soluções inovadoras e eficientes.
          </Text>
        </Card.Content>
      </Card>

      {/* Experiências */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>💼 Experiências</Text>
          <Text style={styles.text}>
            🚀 Desenvolvedor na No Start (Startup de jogos indie){"\n"}
            💡 Criação de interfaces, sistemas em Java e banco de dados SQL{"\n"}
            🧠 Desenvolvimento de aplicativos educacionais e projetos visuais
            interativos
          </Text>
        </Card.Content>
      </Card>

      {/* Habilidades */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>🧩 Habilidades</Text>
          <Text style={styles.text}>
            • React / React Native{"\n"}• Java / SQL{"\n"}• HTML / CSS /
            JavaScript{"\n"}• UI Design e prototipagem{"\n"}• Banco de Dados &
            API REST
          </Text>
        </Card.Content>
      </Card>

      {/* Contatos */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>🌐 Contatos</Text>
          <View style={styles.links}>
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => Linking.openURL("https://github.com/teuusuario")}
            >
              <Icon name="github" size={24} color="#fff" />
              <Text style={styles.linkText}>GitHub</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => Linking.openURL("https://linkedin.com/in/teulink")}
            >
              <Icon name="linkedin" size={24} color="#fff" />
              <Text style={styles.linkText}>LinkedIn</Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>

      <Text style={styles.footer}>Feito com ❤️ por Andrew Kauê</Text>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F10",
  },
  header: {
    alignItems: "center",
    marginVertical: 40,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#FFD700",
    marginBottom: 15,
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFD700",
  },
  title: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginTop: 6,
  },
  card: {
    backgroundColor: "#1C1C1E",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 14,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 10,
  },
  text: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 22,
  },
  links: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFD700",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  linkText: {
    color: "#000",
    marginLeft: 8,
    fontWeight: "bold",
  },
  footer: {
    textAlign: "center",
    color: "#888",
    marginVertical: 25,
    fontSize: 13,
  },
});
