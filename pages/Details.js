import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import colors from "../assets/colors/colors";
import Feather from "react-native-vector-icons/Feather";
import popularData from "../assets/data/populardata";

const Details = ({ navigation, route }) => {
  const { item } = route.params;
  const [similarList, setSimilarList] = useState([]);

  useEffect(() => {
    setSimilarList(popularData.filter((p) => p.categories === item.categories));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>

        {/* --navBar-- */}
        <TouchableOpacity>
          <View style={styles.header}>
            <Feather
              name="chevron-left"
              size={24}
              color={colors.lightBackGround}
              onPress={() => {
                navigation.navigate("Home");
              }}
            />
            <Feather name="heart" size={24} color={colors.lightBackGround} />
          </View>
        </TouchableOpacity>

        {/* --detail_Item-- */}
        <View
          style={{
            backgroundColor: "white",
            marginHorizontal: 20,
            marginTop: 20,
            elevation: 20,
            borderTopEndRadius: 25,
            borderTopLeftRadius: 25,
          }}
        >
          <View>
            <Image
              source={item.image}
              style={{
                width: "100%",
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
              }}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",

              paddingVertical: 5,
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "800" }}>
              {item.title}
            </Text>
            <Text style={{ fontWeight: "800", color: "green" }}>
              {item.price}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              marginTop: 0,
              display: "flex",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Text style={{ color: "red", fontWeight: "700" }}>
              Rating {item.rating}
            </Text>
            <Text>{item.categories}</Text>
          </View>
          <View style={{ margin: 10 }}>
            <Text style={{ fontWeight: "800", fontSize: 16 }}>ingredients</Text>
            <View
              style={{
                display: "flex",
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: 10,
              }}
            >
              <Text style={styles.ingredients}>{item.ingredients[0]}</Text>
              <Text style={styles.ingredients}>{item.ingredients[1]}</Text>
              <Text style={styles.ingredients}>{item.ingredients[2]}</Text>
            </View>
          </View>
          <View style={{ margin: 10, marginTop: 0 }}>
            <Text style={{ fontWeight: "800", fontSize: 16 }}>Reviews</Text>
            <Text>{item.reviews}</Text>
          </View>
        </View>

        {/* --similar items-- */}
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              marginHorizontal: 20,
              fontSize: 18,
              marginBottom: 20,
              fontWeight: "800",
            }}
          >
            Similar Search
          </Text>
          {similarList.map((item) => {
            return (
              <View
                key={item.id}
                style={{
                  marginBottom: 20,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "white",
                  borderRadius: 25,
                  marginBottom: 20,
                  marginHorizontal: 20,
                }}
              >
                <View>
                  <View style={{ marginLeft: 10, marginTop: 10 }}>
                    <Text style={{ fontWeight: "600", color: "red" }}>
                      * Best Seller
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 10,
                      marginTop: 5,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      gap: 10,
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "800" }}>
                      {item.title}
                    </Text>
                    <Text>{item.categories}</Text>
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontWeight: "300" }}>{item.sizeName}</Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: colors.lightDark,
                      position: "relative",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      padding: 14,
                      borderBottomLeftRadius: 25,
                      borderTopRightRadius: 25,
                    }}
                  >
                    <View>
                      <Text style={{ color: "white" }}>+</Text>
                    </View>
                    <Text style={{ color: "white" }}>{item.rating}</Text>
                  </View>
                </View>
                <View style={{ width: 120, height: 120, borderRadius: 25 }}>
                  <Image
                    source={item.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderTopRightRadius: 25,
                      borderBottomRightRadius: 25,
                    }}
                  />
                </View>
              </View>
            );
          })}
        </View>
        
      </ScrollView>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackGround,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: colors.lightDark,
    paddingTop: 40,
    paddingBottom: 20,
  },
  ingredients: {
    backgroundColor: colors.lightDark,
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignContent: "center",
    color: colors.lightBackGround,
  },
});
