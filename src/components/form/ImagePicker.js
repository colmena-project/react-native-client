import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, KeyboardAvoidingView, StyleSheet } from 'react-native';
import * as ImagePickerExpo from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Divider } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';


const ImagePicker = props => {

    const aspect = props.aspect ? props.aspect : [16, 9];

    const handleShowModal = show => {
        props.show(show);
    };

    const handleTakePhoto = async () => {
        handleShowModal(false)
        try {
            getPermissionAsync();
            let result = await ImagePickerExpo.launchCameraAsync({
                mediaTypes: ImagePickerExpo.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: aspect,
                quality: 0.7,
                base64: true
            });
            if (!result.cancelled) {
                props.takenImage(result.base64, 'pic.jpg');
            }
        } catch (E) {
            console.log(E);
        }
    };

    const handlePickFromGallery = async () => {
        handleShowModal(false)
        try {
            getPermissionAsync();
            let result = await ImagePickerExpo.launchImageLibraryAsync({
                mediaTypes: ImagePickerExpo.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: aspect,
                quality: 0.7,
                base64: true
            });
            if (!result.cancelled) {
                props.takenImage(result.base64, 'pic.jpg');
            }
        } catch (E) {
            console.log(E);
        }
    };

    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Lo sentimos! Colmena necesita los permisos de la cámara!');
            }
        }
    };

    return (
        <KeyboardAvoidingView behavior={'position'}>
            <Modal
                transparent={true}
                onRequestClose={props.onRequestClose}
                animationType="fade"
                visible={props.visible}
                backdrop={false}
                position={"bottom"}
                entry={"bottom"}>
                <View style={styles.modalContainer}>
                    <View style={styles.card}>
                        <TouchableOpacity style={styles.btnContainer} onPress={handleTakePhoto}>
                            <Feather name={'camera'} size={24} color={'black'} />
                            <Text style={styles.text}>Tomar foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnContainer} onPress={handlePickFromGallery}>
                            <Feather name={'image'} size={24} color={'black'} />
                            <Text style={styles.text}>Seleccionar de galería</Text>
                        </TouchableOpacity>
                        <Divider />
                        <TouchableOpacity style={styles.noIconTextContainer} onPress={() => handleShowModal(false)}>
                            <Text style={styles.noIconText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    card: {
        backgroundColor: '#fff',
        paddingVertical: 10
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 10,
        paddingLeft: 5,
        paddingRight: 15,
        paddingVertical: 10
    },
    noIconTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        paddingLeft: 5,
        paddingRight: 15,
        paddingVertical: 10
    },
    text: {
        fontFamily: 'Nunito-Regular',
        fontSize: 18,
        marginLeft: 10
    },
    noIconText: {
        fontFamily: 'Nunito-Regular',
        fontSize: 18,
        textAlign: 'center'
    }
});

export default ImagePicker;