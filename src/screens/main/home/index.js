import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Installation from "../../../services/Installation";

import { Parse } from "parse/react-native";

import colors from "../../../styles/colors";
import stylesCommon from "../../../styles/login";

import PostModal from "../../../components/posts/PostModal";
import FeedList from "../../../components/posts/FeedList";

const HomeFeed = (props) => {
  const [isAddMode, setIsAddMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const navigation = useNavigation();

  const loadData = async () => {
    try {
      setIsLoading(true);
      const posts = new Parse.Query("Post");
      posts.descending("createdAt");
      const result = await posts.find();

      setData(result);
      setIsLoading(false);
    } catch (err) {
      console.log("Error!! " + err);
    }
  };

  const handleOnSendButton = async (text) => {
    try {
      setIsAddMode(false);
      const Post = Parse.Object.extend("Post");
      const post = new Post();

      post.set("text", text);
      await post.save();
      loadData();
    } catch (err) {
      console.log("Error!! " + err);
    }
  };

  const handleOnCameraButton = async () => {
    console.log("OPEN CAMERA!!");
  };

  useEffect(() => {
    Installation.setInstallation();
  }, []);

  useEffect(() => {
    loadData();
  }, [navigation]);

  const handleOthersProfile = (user) => {
    props.navigation.navigate("OthersProfile", { user: user });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <PostModal
          onRequestClose={() => setIsAddMode(false)}
          visible={isAddMode}
          onSendPress={handleOnSendButton}
          onCameraPress={handleOnCameraButton}
        />

        <View style={styles.brand}>
          <Text
            style={{ ...stylesCommon.brandText, color: colors.colmenaGreen }}
          >
            Colmena
          </Text>
          <Image
            style={stylesCommon.colmenaLogo}
            source={require("../../../../assets/colmena-app-ico.png")}
          />
        </View>

        <View style={styles.colmenaHeaderTextContainer}>
          <Text style={styles.colmenaHeaderSubtitle}>Novedades</Text>
        </View>

        {isLoading ? (
          <ActivityIndicator
            style={{ flex: 1 }}
            size={"large"}
            color={colors.colmenaGreen}
          />
        ) : (
          <FeedList onPress={handleOthersProfile} data={data} />
        )}

        <TouchableOpacity
          style={styles.floatingIcon}
          onPress={() => setIsAddMode(true)}
        >
          <Image
            style={styles.addPostIcon}
            source={require("../../../../assets/new-post-icon.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  brand: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    paddingTop: 20,
  },
  topNavigator: {
    width: "100%",
    marginTop: 25,
  },
  bottomNavigator: {
    width: "100%",
  },
  colmenaHeaderTextContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  colmenaHeaderSubtitle: {
    width: "100%",
    textAlign: "left",
    fontSize: 24,
    marginLeft: 65,
    paddingBottom: 10,
    color: "#686868",
  },
  floatingIcon: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 10,
    bottom: 10,
  },
  addPostIcon: {
    width: "100%",
    height: "100%",
  },
});

export default HomeFeed;
