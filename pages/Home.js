import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../assets/colors/colors";
import categoriesData from "../assets/data/categoriesData";
import popularData from "../assets/data/populardata";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Home = ({ navigation }) => {

  const [input, setInput] = useState("");
  const [list, setList] = useState(popularData);
  const [showCategory, setShowCategory] = useState("all")
 

  function selectCategory(option) {
    if (option === "non-veg") {
      setList(popularData.filter((p) => p.categories === option));
    } else if (option === "veg") {
      setList(popularData.filter((p) => p.categories === option));
    }else if (option === "high-rating"){
       setList(popularData.filter((p)=> p.rating > 3)) 
    }else {
      setList(popularData);
    }
  }

  function searchHandle(){
    setList(
       [popularData.find((p) => p.title === input)]
    )
  }
  

  return (
    <View style={styles.container}>
      <ScrollView>
        
        {/* --header-- */}
        <SafeAreaView>
          <View style={styles.header}>
            <Feather name="users" size={24} color={colors.lightBackGround} />
            <Feather name="menu" size={24} color={colors.lightBackGround} />
          </View>
        </SafeAreaView>

        {/* --title-- */}
        <View style={styles.title}>
          <Text style={{ fontWeight: "300" }}>hunger</Text>
          <Text style={{ fontWeight: "bold", fontSize: 30 }}>Restaurants</Text>
        </View>

        {/* --search bar-- */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 18,
          }}
        >
          <TextInput
            style={styles.inputSearch}
            placeholder="Search By Name ( with proper case )"
            value={input}
            onChangeText={(text) => setInput(text)}
          />
          <TouchableOpacity onPress={()=>{searchHandle()}}>
            <View>
          <Feather
            name="search"
            size={20}
            color={colors.lightBackGround}
            style={{
              backgroundColor: colors.lightDark,
              paddingHorizontal: 17,
              paddingVertical: 6,
              borderRadius: 25,
            }}
          />
          </View>
          </TouchableOpacity>
        </View>

        {/* --categories-- */}
        <View>
          <Text
            style={{
              marginHorizontal: 20,
              fontSize: 18,
              marginTop: 10,
              fontWeight: "800",
            }}
          >
            filters
            
          </Text>
          <ScrollView horizontal={true} >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 20,
              marginHorizontal: 20,
              justifyContent: "space-between",
              gap:10
            }}
          >
            {categoriesData.map((item) => {
              return (
                <View key={item.id}>
                    
                  <View style={styles.categoryItem}>
                    <View style={styles.categoryImageBox}>
                      <Image
                        source={item.image}
                        style={{ height: "100%", width: "100%" }}
                      />
                    </View>
                    <Text style={styles.categoryText}>{item.title}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        selectCategory(item.title);
                        setShowCategory(item.title)
                      }}
                    >
                      <View style={{ marginHorizontal: 34, marginTop: 5 }}>
                        <Feather
                          name="chevrons-right"
                          style={styles.categoryIcon}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
               
              );
            })}
          </View>
          </ScrollView>
        </View>

        {/* --popular-- */}
        <View>
          <Text
            style={{
              marginHorizontal: 20,
              fontSize: 18,
              marginTop: 10,
              fontWeight: "800",
            }}
          >
            popular 
            <Text style={{fontSize:15, fontWeight:'500'}} >  {showCategory}</Text>
          </Text>

          <View style={{ marginHorizontal: 20, marginTop: 20 }}>
            {list.map((item) => {
              return (
                <View key={item.id}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Details", { item: item });
                    }}
                  >
                    <View
                      key={item.id}
                      style={{
                        marginBottom: 20,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: "white",
                        borderRadius: 25,
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
                          <Text style={{ fontWeight: "300" }}>
                            {item.sizeName}
                          </Text>
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
                      <View
                        style={{ width: 120, height: 120, borderRadius: 25 }}
                      >
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
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

export default Home;

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
  title: {
    margin: 20,
  },
  inputSearch: {
    height: 40,
    marginVertical: 0,
    borderBottomWidth: 0.2,
    padding: 10,
    width: 250,
  },
  categoryItem: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingBottom: 10,
    shadowColor: "black",
    elevation: 2,
  },
  categoryImageBox: {
    height: 80,
    width: 100,
    marginBottom: -10,
  },
  categoryText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
  },
  categoryIcon: {
    backgroundColor: colors.lightBackGround,
    textAlign: "center",
    paddingVertical: 10,
    borderRadius: 26,
  },
});
