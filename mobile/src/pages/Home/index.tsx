import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";
import { Feather as Icon } from "@expo/vector-icons";
import { IBGECityResponse, IBGEUFResponse } from "./models";

import {
  titleHome,
  descriptionHome,
  enter,
  placeholderUF,
  placeholderCity,
} from "../../utils/strings";
import { colors } from "../../utils/colors";

import { styles, pickerSelectStyles } from "./styles";

export const Home: React.FC = () => {
  const [ufs, setUfs] = useState<Array<string>>([]);
  const [cities, setCities] = useState<Array<string>>([]);
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");

  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get<Array<IBGEUFResponse>>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((res) => {
        const ufInitials = res.data.map((uf) => uf.sigla).sort();
        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") return;

    axios
      .get<Array<IBGECityResponse>>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((res) => {
        const cityNames = res.data.map((city) => city.nome).sort();
        setCities(cityNames);
      });
  }, [selectedUf]);

  function handleNavigateToPoints() {
    navigation.navigate("Points", {
      uf: selectedUf,
      city: selectedCity,
    });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ImageBackground
        source={require("../../assets/home-background.png")}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require("../../assets/logo.png")}></Image>
          <View>
            <Text style={styles.title}>{titleHome}</Text>
            <Text style={styles.description}>{descriptionHome}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{
              color: colors.gray2,
              label: placeholderUF,
            }}
            items={ufs?.map((uf) => ({
              label: uf,
              value: uf,
            }))}
            value={selectedUf}
            useNativeAndroidPickerStyle={false}
            onValueChange={setSelectedUf}
          />

          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{
              color: colors.gray2,
              label: placeholderCity,
            }}
            value={selectedCity}
            useNativeAndroidPickerStyle={false}
            onValueChange={setSelectedCity}
            items={cities?.map((city) => ({
              label: city,
              value: city,
            }))}
            disabled={selectedUf === "0"}
          />

          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color={colors.white} size={24}></Icon>
              </Text>
            </View>
            <Text style={styles.buttonText}>{enter}</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
