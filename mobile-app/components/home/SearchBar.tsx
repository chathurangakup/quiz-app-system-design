import { Feather } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Feather name="search" size={20} color="#9CA3AF" />

      <TextInput
        placeholder="Search"
        placeholderTextColor="#9CA3AF"
        style={styles.input}
      />

      <Feather name="arrow-right" size={20} color="#9CA3AF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 26,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginTop: 16,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
  },
});
