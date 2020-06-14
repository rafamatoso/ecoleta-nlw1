import React, { useState, useEffect } from "react";
import { View, Image, Text, SafeAreaView, Linking } from "react-native";
import api from "../../services/api";

import { Feather as Icon, FontAwesome5 } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import * as MailComposer from "expo-mail-composer";

import { BackButton } from "../../components/BackButton";
import { useRoute } from "@react-navigation/native";
import { Data, Params } from "./models";
import {
  address,
  whatsapp,
  email,
  mailSubject,
  whatsappTextParam,
} from "../../utils/strings";
import { colors } from "../../utils/colors";

import { styles } from "./styles";

export const Detail: React.FC = () => {
  const [data, setData] = useState<Data>({} as Data);

  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    api.get(`points/${routeParams.point_id}`).then((res) => {
      setData(res.data);
    });
  }, []);

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: mailSubject,
      recipients: [data.point.email],
    });
  }

  function handleWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${data.point.whatsapp}&text=${whatsappTextParam}`
    );
  }

  if (!data.point) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <BackButton></BackButton>

        <Image
          style={styles.pointImage}
          source={{
            uri: data.point.image_url,
          }}
        ></Image>

        <Text style={styles.pointName}>{data.point.name}</Text>
        <Text style={styles.pointItems}>
          {data.items.map((item) => item.title).join(", ")}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>{address}</Text>
          <Text style={styles.addressContent}>
            {data.point.city}, {data.point.uf}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsapp}>
          <FontAwesome5
            name="whatsapp"
            size={20}
            color={colors.white}
          ></FontAwesome5>
          <Text style={styles.buttonText}>{whatsapp}</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={handleComposeMail}>
          <Icon name="mail" size={20} color={colors.white}></Icon>
          <Text style={styles.buttonText}>{email}</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};
