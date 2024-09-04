import { View, Text, FlatList, ListRenderItem, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ListingType } from '@/types/listingType'
import Colors from '@/constants/Colors'
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'

type Props = {
    listings: any[];
    category: string;
}

const Listing = ({listings, category}: Props) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('Update Listing');
        setLoading(true);

        setTimeout(() => {
            setLoading(false)
        }, 200)
    }, [category]);

    const getAlertColor = (alertLevel: string) => {
        switch (alertLevel.toLowerCase()) {
            case 'high':
                return '#FF0000';
            case 'moderate':
                return '#FFFF00';
            case 'low':
                return '#00FF00';
            default:
                return Colors.black;
        }
    };

    const renderItems:ListRenderItem<ListingType> = ({item}) => {
        return(
            <Link href={`/listing/${item.id}`} asChild>
            <TouchableOpacity>
                <View style={styles.item}>
                    <Image 
                        source={{uri: item.image}} 
                        style={styles.image}
                    />
                    <View style={styles.bookmark}>
                        <Ionicons name="bookmark-outline" size={20} color={Colors.white}/>
                    </View>
                    <Text style={styles.itemTxt} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <FontAwesome5 
                                name="map-marker-alt"
                                size={18}
                                color={Colors.primaryColor}
                            />
                            <Text style={styles.itemLocation}>{item.location}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignContent: 'space-evenly'}}>
                            <MaterialCommunityIcons name="alert" size={18} color='#ffd700' style={{paddingRight: 5}}/>
                            <Text style={[styles.itemAlert, { color: getAlertColor(item.alert) }]}>{item.alert}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            </Link>
        )
    }

  return (
    <View>
      <FlatList 
        data={loading ? [] : listings} 
        renderItem={renderItems} 
        horizontal 
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default Listing

const styles = StyleSheet.create({
    item: {
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 10,
        marginRight: 20,
        width: 220
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 30
    },
    bookmark: {
        position: 'absolute',
        top: 185,
        right: 30,
        backgroundColor: Colors.primaryColor,
        padding: 10,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: Colors.white
    },
    itemTxt: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 10
    },
    itemLocation: {
        fontSize: 14,
        marginLeft: 5
    },
    itemAlert: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.primaryColor
    }
})
