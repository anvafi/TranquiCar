import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Pressable,
    Image,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';    en principio no necesario con bbdd
import { Ionicons } from '@expo/vector-icons';

const Maintenance = (props) => {

    const [maintenances, setMaintenances] = useState([]);

    const loadMaintenances = async () => {
        try {
            const data = await AsyncStorage.getItem('maintenances');

            if (data !== null) {
                setMaintenances(JSON.parse(data));
            }

        } catch (error) {
            console.log('Error loading maintenances', error);
        }
    };

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            loadMaintenances();
        });

        return unsubscribe;
    }, [props.navigation]);

    const group = maintenances.reduce((acc, item) => {
        const year = item.year;

        if (!acc[year]) acc[year] = [];

        acc[year].push(item);

        return acc;
    }, {});

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                {/* HEADER */}
                <View style={styles.header}>

                    <View style={styles.topRow}>

                        <Pressable onPress={() => props.navigation.goBack()}>
                            <Ionicons name="arrow-back" size={30} color="black" />
                        </Pressable>

                        <Image
                            source={require('../../assets/logoX.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />

                        <View style={{ width: 30 }} />

                    </View>

                    <Text style={styles.title}>Maintenance</Text>

                </View>

                {/* LIST */}
                <View style={styles.content}>

                    {Object.keys(group).sort((a, b) => b - a).map((year) => (

                        <View key={year}>

                            <Text style={styles.year}>{year}</Text>

                            {group[year].map((item) => (

                                <View key={item.id} style={styles.card}>

                                    <Text style={styles.cardTitle}>{item.maintenanceType}</Text>

                                    <Text style={styles.cardSubtitle}>
                                        {item.date} - {item.kilometers} km
                                    </Text>

                                    <Text style={styles.cost}>{item.cost}€</Text>

                                </View>

                            ))}

                        </View>

                    ))}

                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },

    header: {
        paddingHorizontal: 15,
        paddingTop: 10,
    },

    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    logo: {
        width: 140,
        height: 80,
    },

    title: {
        fontSize: 38,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20,
    },

    content: {
        paddingHorizontal: 10,
        paddingBottom: 40,
    },

    year: {
        fontSize: 26,
        fontWeight: 'bold',
        marginVertical: 15,
        marginLeft: 5,
    },

    card: {
        backgroundColor: '#EFEFEF',
        borderRadius: 16,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#DDD',
    },

    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    cardSubtitle: {
        fontSize: 16,
        color: '#777',
        marginTop: 5,
    },

    cost: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },

});

export default Maintenance;
