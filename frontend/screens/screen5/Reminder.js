// screens/screen6/Reminders.js

import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Pressable,
    Image,
} from 'react-native';
import Context from '../../context/Context';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../../config/api';


const Reminders = (props) => {
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            if (user?.id) {
                loadReminders();
            }
        });

        return unsubscribe;
    }, [props.navigation, user]);

    const [reminders, setReminders] = useState([]);
    const { user } = useContext(Context);

    const loadReminders = async () => {
        try {
            const response = await fetch(
                `${API_URL}/api/reminders/user/${user.id}`
            );

            const data = await response.json();

            setReminders(data);

        } catch (error) {
            console.log('Error loading reminders', error);
        }
    };

    const groupedReminders = reminders.reduce((groups, reminder) => {
        const year = reminder.nextReminderDate
            ? reminder.nextReminderDate.split('-')[0]
            : reminder.createdAt.split('-')[0];

        if (!groups[year]) {
            groups[year] = [];
        }

        groups[year].push(reminder);

        return groups;
    }, {});

    return (
        <SafeAreaView style={styles.mainContainer}>

            <ScrollView bounces={false}>

                <View style={styles.headerContainer}>

                    <View style={styles.topRow}>

                        <Pressable onPress={() => props.navigation.goBack()}>
                            <Ionicons
                                name="arrow-back"
                                size={32}
                                color="black"
                            />
                        </Pressable>

                        <Image
                            source={require('../../assets/logoNegro.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />

                        <View style={{ width: 32 }} />

                    </View>

                    <Text style={styles.title}>Remainders</Text>

                </View>

                <View style={styles.contentContainer}>

                    {Object.keys(groupedReminders).map((year) => (

                        <View key={year}>

                            <Text style={styles.yearText}>
                                {year}
                            </Text>

                            {groupedReminders[year].map((reminder) => (

                                <Pressable
                                    key={reminder.id}
                                    style={styles.card}
                                    onPress={() =>
                                        props.navigation.navigate('EditReminder', {
                                            reminder: reminder,
                                        })
                                    }>
                                    <Text style={styles.cardTitle}>
                                        {reminder.maintenanceType}
                                    </Text>

                                    <Text style={styles.cardSubtitle}>
                                        {reminder.nextReminderDate || 'Undated'} - {reminder.nextReminderKm || 'without km'} km
                                    </Text>

                                </Pressable>

                            ))}

                        </View>

                    ))}

                </View>

            </ScrollView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },

    headerContainer: {
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
        color: '#000',
        marginTop: 10,
        marginBottom: 30,
    },

    contentContainer: {
        paddingHorizontal: 10,
        paddingBottom: 40,
    },

    yearText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 15,
        marginTop: 15,
        marginLeft: 5,
    },

    card: {
        backgroundColor: '#EFEFEF',
        borderRadius: 18,
        paddingVertical: 18,
        paddingHorizontal: 16,
        marginBottom: 18,

        borderWidth: 1,
        borderColor: '#DDDDDD',
    },

    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 5,
    },

    cardSubtitle: {
        fontSize: 16,
        color: '#8A8A8A',
        fontWeight: '600',
    },

});

export default Reminders;
