import { StatusBar } from 'expo-status-bar';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {CardData} from "./data/CardData";
import Card from "./components/Card";
import ExpoCheckbox from "expo-checkbox";

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={{uri: 'https://www.unotv.com/uploads/2022/07/fondo-02-175001.jpg'}} resizeMode="cover" style={styles.image}>
        <View style={styles.card}>
            <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                <Text>{CardData[1].flag}</Text>
                <Text>{CardData[1].name}</Text>
                <ExpoCheckbox
                    value={false}
                    color={false ? '#4630EB' : undefined}
                />
            </View>
            <View style={{flexDirection: 'row'}}>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </View><View style={{flexDirection: 'row'}}>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </View><View style={{flexDirection: 'row'}}>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </View><View style={{flexDirection: 'row'}}>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </View>
        </View>
      </ImageBackground>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  card: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10
  }
});
