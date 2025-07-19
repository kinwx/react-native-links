import { useState, useCallback } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Text,
  Linking,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";

import { LinkStorage, linkStorage } from "@/src/storage/link-storage";

import { Alert } from "@/src/utils/alerts";

import { styles } from "./styles";
import { colors } from "@/src/styles/colors";
import { categories } from "@/src/utils/categories";

import { Link } from "@/src/components/link";
import { Option } from "@/src/components/option";
import { Categories } from "@/src/components/categories";
import { Alert as ModalAlert } from "@/src/components/alert";

export default function Index() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [link, setLink] = useState<LinkStorage>({} as LinkStorage);
  const [links, setLinks] = useState<Array<LinkStorage>>([]);
  const [category, setCategory] = useState<string>(categories[0].name);

  async function getLinks(): Promise<void> {
    try {
      const storage = await linkStorage.get();
      const filtered = storage.filter((link) => link.category === category);
      setLinks(filtered);
    } catch (error) {
      Alert.alert("Links", "Não foi possível listar os links");
    }
  }

  function handleDetails(selected: LinkStorage): void {
    setShowModal(true);
    setLink(selected);
  }

  async function linkRemove() {
    try {
      await linkStorage.remove(link.id);

      getLinks();
      setShowModal(false);
    } catch (error) {
      Alert.alert("Error", "Não foi possível excluir");
      console.log(error);
    }
  }

  function handleRemove() {
    Alert.alert("Excluir", "Deseja realmente excluir?", [
      { text: "Não" },
      { text: "Sim", onPress: linkRemove },
    ]);
  }

  async function handleOpen() {
    try {
      await Linking.openURL(link.url);
      setShowModal(false);
    } catch (error) {
      Alert.alert("Error", "Não foi possível abri o link");
      console.log(error);
    }
  }

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
            onDetails={() => handleDetails(item)}
          />
        )}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal transparent visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>{link.category}</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <MaterialIcons
                  name="close"
                  size={20}
                  color={colors.gray[400]}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLinkName}>{link.name}</Text>
            <Text style={styles.modalUrl}>{link.url}</Text>

            <View style={styles.modalFooter}>
              <Option
                name="Excluir"
                icon="delete"
                variant="secondary"
                onPress={handleRemove}
              />
              <Option name="Abrir" icon="language" onPress={handleOpen} />
            </View>
          </View>
        </View>
      </Modal>
      <ModalAlert />
    </View>
  );
}
