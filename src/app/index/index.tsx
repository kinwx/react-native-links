import { useState, useCallback } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Text,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";

import { LinkStorage, linkStorage } from "@/src/storage/link-storage";

import { styles } from "./styles";
import { colors } from "@/src/styles/colors";
import { categories } from "@/src/utils/categories";

import { Link } from "@/src/components/link";
import { Option } from "@/src/components/option";
import { Categories } from "@/src/components/categories";

export default function Index() {
  const [links, setLinks] = useState<Array<LinkStorage>>([]);
  const [category, setCategory] = useState<string>(categories[0].name);

  const getLinks = async (): Promise<void> => {
    try {
      const storage = await linkStorage.get();
      const filtered = storage.filter((link) => link.category === category);
      setLinks(filtered);
    } catch (error) {
      Alert.alert("Links", "Não foi possível listar os links");
    }
  };

  useFocusEffect(
    useCallback(() => {
      getLinks();
    }, [category])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("@/src/assets/logo.png")} style={styles.logo} />

        {/* @ts-ignore */}
        <TouchableOpacity onPress={() => router.navigate("/add")}>
          <MaterialIcons name="add" size={32} color={colors.green[300]} />
        </TouchableOpacity>
      </View>

      <Categories onChange={setCategory} selected={category} />

      <FlatList
        data={links}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            name={item.name}
            url={item.url}
            onDetails={() => console.log("clickou")}
          />
        )}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal transparent visible={false}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>Curso</Text>
              <TouchableOpacity>
                <MaterialIcons
                  name="close"
                  size={20}
                  color={colors.gray[400]}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLinkName}>Rocketseatc</Text>
            <Text style={styles.modalUrl}>https://rocketseat.com.br/</Text>

            <View style={styles.modalFooter}>
              <Option name="Excluir" icon="delete" variant="secondary" />
              <Option name="Abrir" icon="language" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
