import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { styles } from "./styles";
import { colors } from "@/src/styles/colors";

import { Categories } from "@/src/components/categories";
import { Input } from "@/src/components/input";
import { Button } from "@/src/components/button";

export default function Add() {
  const [name, setName] = useState<string>();
  const [url, setUrl] = useState<string>();

  const handleAdd = (): void => {
    console.log({ name, url });
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
      <Categories />

      <View style={styles.form}>
        <Input placeholder="Nome" onChangeText={setName} autoCorrect={false} />
        <Input placeholder="Url" onChangeText={setUrl} autoCorrect={false} />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>
    </View>
  );
}
