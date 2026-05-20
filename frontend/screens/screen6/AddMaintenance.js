import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    Image,
    ScrollView,
    SafeAreaView,
    Alert,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';

const AddMaintenance = (props) => {
    const [maintenanceType, setMaintenanceType] = useState('Aceite');

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const [kilometers, setKilometers] = useState('');
    const [cost, setCost] = useState('');
    const [notes, setNotes] = useState('');

    const { vehicleId } = props.route.params;

    const handleAddMaintenance = async () => {
        // const maintenanceData = {
        //     maintenanceType,
        //     date: `${day}/${month}/${year}`,
        //     kilometers,
        //     cost,
        //     notes,
        // };
        try {

            const response = await fetch('http://192.168.1.34:3000/api/maintenance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    maintenanceType,
                    date: `${year}-${month}-${day}`,
                    kilometers: Number(kilometers),
                    cost: cost ? Number(cost) : null,
                    notes,
                    vehicleId,
                }),
            });

            // console.log(maintenanceData);
            const data = await response.json();

            Alert.alert('Mantenimiento añadido correctamente');

            props.navigation.goBack();

        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'No se pudo conectar con el servidor');
        }
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView bounces={false}>

                {/* HEADER CON LOGO */}
                <View style={styles.headerBackground}>
                    <View style={styles.headerTop}>
                        <Pressable onPress={() => props.navigation.goBack()}>
                            <MaterialIcons name="arrow-back" size={28} color="white" />
                        </Pressable>
                        <Image
                            source={require('../../assets/logoBlanco.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <View style={{ width: 28 }} />
                    </View>
                    <Text style={styles.headerTitle}>Maintenance</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Tipo de mantenimiento</Text>

                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={maintenanceType}
                            onValueChange={(itemValue) => setMaintenanceType(itemValue)}
                        >
                            <Picker.Item label="Aceite" value="Aceite" />
                            <Picker.Item label="Filtros" value="Filtros" />
                            <Picker.Item label="Frenos" value="Frenos" />
                            <Picker.Item label="Neumáticos" value="Neumaticos" />
                            <Picker.Item label="ITV" value="ITV" />
                        </Picker>
                    </View>

                    <Text style={styles.label}>Fecha</Text>
                    <View style={styles.dateRow}>
                        <TextInput
                            style={styles.dateInput}
                            placeholder="DD"
                            keyboardType="numeric"
                            maxLength={2}
                            value={day}
                            onChangeText={setDay}
                        />
                        <TextInput
                            style={styles.dateInput}
                            placeholder="MM"
                            keyboardType="numeric"
                            maxLength={2}
                            value={month}
                            onChangeText={setMonth}
                        />
                        <TextInput
                            style={styles.dateInput}
                            placeholder="YYYY"
                            keyboardType="numeric"
                            maxLength={4}
                            value={year}
                            onChangeText={setYear}
                        />
                    </View>

                    <View style={styles.doubleInputRow}>
                        <View style={styles.doubleInputBox}>
                            <Text style={styles.label}>Kilometraje</Text>
                            <View style={styles.inputWithSuffix}>
                                <TextInput
                                    style={styles.inputHalf}
                                    placeholder=""
                                    keyboardType="numeric"
                                    value={kilometers}
                                    onChangeText={setKilometers}
                                />
                                <Text style={styles.simbolText}>Km</Text>
                            </View>
                        </View>
                        <View style={styles.doubleInputBox}>
                            <Text style={styles.label}>Coste</Text>
                            <View style={styles.inputWithSuffix}>
                                <TextInput
                                    style={styles.inputHalf}
                                    placeholder=""
                                    keyboardType="numeric"
                                    value={cost}
                                    onChangeText={setCost}
                                />
                                <Text style={styles.simbolText}>€</Text>
                            </View>
                        </View>
                    </View>

                    {/* NOTAS */}
                    <Text style={styles.label}>Notas</Text>

                    <TextInput
                        style={styles.notesInput}
                        multiline
                        numberOfLines={6}
                        value={notes}
                        onChangeText={setNotes}
                    />

                    {/* BOTÓN */}
                    <Pressable
                        style={styles.addButton}
                        onPress={handleAddMaintenance}
                    >
                        <Text style={styles.addButtonText}>Add</Text>
                    </Pressable>

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

    headerBackground: {
        backgroundColor: '#1a1a1a',
        paddingHorizontal: 20,
        paddingBottom: 30,
        paddingTop: 20,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 120,
        height: 120,
    },
    headerTitle: {
        color: 'white',
        fontSize: 34,
        fontWeight: 'bold',
    },

    formContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },

    label: {
        fontSize: 18,
        color: '#7a7a7a',
        marginBottom: 10,
        fontWeight: '600',
    },

    pickerContainer: {
        backgroundColor: '#ECECEC',
        borderRadius: 10,
        marginBottom: 30,
        overflow: 'hidden',
    },

    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },

    dateInput: {
        width: '30%',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 10,
        paddingVertical: 15,
        textAlign: 'center',
        fontSize: 18,
    },

    doubleInputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },

    doubleInputBox: {
        width: '47%',
    },

    inputWithSuffix: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECECEC',
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 55,
    },

    inputHalf: {
        flex: 1,
        fontSize: 18,
    },

    simbolText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4a4a4a',
    },

    notesInput: {
        backgroundColor: '#ECECEC',
        borderRadius: 10,
        height: 160,
        textAlignVertical: 'top',
        padding: 15,
        fontSize: 16,
        marginBottom: 30,
    },

    addButton: {
        backgroundColor: '#8B0000',
        height: 60,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    addButtonText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
});

export default AddMaintenance;