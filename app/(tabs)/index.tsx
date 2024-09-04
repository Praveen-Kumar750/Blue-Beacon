import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { useHeaderHeight } from '@react-navigation/elements'
import { SearchBar } from 'react-native-screens'
import CategoryButtons from '@/components/CategoryButtons'
import Listing from '@/components/Listing'
import listingData from '@/data/destination.json';
import groupData from '@/data/groups.json';
import GroupListing from '@/components/GroupListing'

const Page = () => {
  const headerHeight = useHeaderHeight();
  const [category, setCategory] = useState('All');

  const onCatChanged = (category: string) => {
    console.log("Category: ", category);
    setCategory(category);
  }
  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => { }} style={{ marginLeft: 20 }}>
              <Image
                source={{
                  uri: "https://xsgames.co/randomusers/avatar.php?g=female"
                }}
                style={{ width: 40, height: 40, borderRadius: 10 }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => { }}
              style={{
                marginRight: 20,
                backgroundColor: Colors.white,
                padding: 10,
                borderRadius: 10,
                shadowColor: "#171717",
                shadowOffset: { width: 2, height: 4 },
                shadowRadius: 3
              }}
            >
              <Ionicons name="notifications" size={20} color={Colors.black} />
            </TouchableOpacity>
          )
        }}
      />
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.headingTxt}>Explore The Beautiful Beaches!</Text>
          <View style={styles.searchSectionWrapper}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} style={{ marginRight: 5, marginTop: 3.5 }} color={Colors.black} />
              <TextInput placeholder='Search...' style={{ fontSize: 18 }} />
            </View>
            <TouchableOpacity onPress={() => { }} style={styles.filterBtn}>
              <Ionicons name='options' size={28} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <CategoryButtons onCategoryChanged={onCatChanged} />
          <Listing listings={listingData} category={category}/>
          <GroupListing listings={groupData}/>
        </ScrollView>
      </View>
    </>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.bgColor,
  },
  headingTxt: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.black,
    marginTop: 10
  },
  searchSectionWrapper: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 10,
  },
  filterBtn: {
    backgroundColor: Colors.primaryColor,
    padding: 15,
    borderRadius: 10,
    marginLeft: 20,
  }
})    