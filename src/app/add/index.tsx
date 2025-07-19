import { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { linkStorage } from "@/src/storage/link-storage";

import { styles } from "./styles";
import { colors } from "@/src/styles/colors";

import { Categories } from "@/src/components/categories";
import { Input } from "@/src/components/input";
import { Button } from "@/src/components/button";

export default function Add() {
  const [category, setCategory] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const handleAdd = async (): Promise<void> => {
    try {
      if (!category) return Alert.alert("Categoria", "Selecione a categoria");
      if (!name.trim()) return Alert.alert("Nome", "Informe o nome");
      if (!url.trim()) return Alert.alert("URL", "Informe a url");

      await linkStorage.save({
        id: new Date().getTime().toString(),
        name,
        url,
        category,
      });

      Alert.alert("Sucesso", "Novo Link adicionado", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Error", "Não foi possível salvar o link.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]} />
        </TouchableOpacity>

        <Text style={styles.title} children={"Novo"} />
      </View>

      <Text style={styles.label}>Seleione uma categoria</Text>
      <Categories onChange={setCategory} selected={category} />

      <View style={styles.form}>
        <Input placeholder="Nome" onChangeText={setName} autoCorrect={false} />
        <Input
          placeholder="URL"
          onChangeText={setUrl}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>
    </View>
  );
}
