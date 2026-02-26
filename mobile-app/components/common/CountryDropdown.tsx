import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../../app/theme/colors";

interface CountryDropdownProps {
  value?: string;
  countries: string[];
  placeholder?: string;
  onSelect: (country: string) => void;
}

export default function CountryDropdown({
  value,
  countries,
  placeholder = "Select country",
  onSelect,
}: CountryDropdownProps) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {/* Dropdown Input */}
      <Pressable style={styles.input} onPress={() => setVisible(true)}>
        <Text style={[styles.text, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>

        <Ionicons name="chevron-down" size={20} color={colors.text.primary} />
      </Pressable>

      {/* Modal */}
      <Modal visible={visible} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.dropdown}>
            <FlatList
              data={countries}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.item}
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.itemText}>{item}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingVertical: 12,

    borderBottomWidth: 1.5,
    borderBottomColor: colors.gray[300],

    backgroundColor: "transparent",
  },

  text: {
    fontSize: 16,
    color: colors.text.primary,
  },

  placeholder: {
    color: colors.text.secondary,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  dropdown: {
    backgroundColor: colors.background.light,
    borderRadius: 12,
    maxHeight: 350,
    overflow: "hidden",
  },

  item: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },

  itemText: {
    fontSize: 16,
    color: colors.text.primary,
  },
});
