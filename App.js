import Title from "./src/components/Title/index";
import ProfileInformations from "./src/components/ProfileInformations/index";
import { StyleSheet } from "react-native";
import {
  View,
  Pressable,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";

export default function App() {
  const [user, setUser] = React.useState("");
  const [profile, setProfile] = React.useState(null);
  const [loadingSpinnerSearchProfile, setLoadingSpinnerSearchProfile] = React.useState(false);

  const handleRequestUserData = async () => {
    setLoadingSpinnerSearchProfile(true)
    setProfile(null);
    if (!user) return;
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      const data = await response.json();

      if (!response.ok) {
        setLoadingSpinnerSearchProfile(false)
        setUser(null);
        return;
      }

      setProfile(data);
      console.log(data);
      setLoadingSpinnerSearchProfile(false)
    } catch (err) {
      console.log(err);
      setLoadingSpinnerSearchProfile(false)
    }

    setUser(null);
  };

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        
        {profile == null ? (
          <>
            <Title />
            <View style={styles.content}>
              <TextInput
                style={styles.input}
                onChangeText={setUser}
                value={user}
              />
              <TouchableOpacity
                style={styles.buttonForm}
                onPress={() => {
                  handleRequestUserData();
                }}
              >
                <View style={styles.loading}>
                  <Text style={{ color: "white" }}> PESQUISAR </Text>
                  <ActivityIndicator
                  style={styles.loadingSpinner}
                  size="small"
                  color="#00ff00"
                  animating={loadingSpinnerSearchProfile}
                />
                </View>
                
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.container}>
            <ProfileInformations data={profile} />
            <View style={styles.content}>
              <TouchableOpacity
                style={styles.buttonForm2}
                onPress={() => {
                  setProfile(null);
                }}
              >
                <Text style={{ color: "white" }}> PESQUISAR NOVAMENTE </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#A03EEA",
    height: "100%",
  },
  content: {
    alignItems: "center",
  },
  input: {
    borderRadius: 50,
    backgroundColor: "white",
    height: "auto",
    width: 350,
    margin: 20,
    padding: 10,
  },
  buttonForm: {
    width: 350,
    height: 40,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 35,
    backgroundColor: "black",
  },
  buttonForm2: {
    width: 350,
    height: 40,
    justifyContent: "center",
    alignContent: "space-around",
    alignItems: "center",
    borderRadius: 35,
    backgroundColor: "black",
  },
  loading: {
    flexDirection:"row",
  },
  loadingSpinner: {
    zIndex:100,
  },
});
