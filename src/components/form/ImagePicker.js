import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, KeyboardAvoidingView, StyleSheet } from 'react-native';
import * as ImagePickerExpo from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Divider } from 'react-native-paper';


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
                        <TouchableOpacity onPress={handleTakePhoto}>
                            <Text style={styles.text}>Tomar foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handlePickFromGallery}>
                            <Text style={styles.text}>Seleccionar de galería</Text>
                        </TouchableOpacity>
                        <Divider />
                        <TouchableOpacity onPress={() => handleShowModal(false)}>
                            <Text style={styles.text}>Cancelar</Text>
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
    text: {
        fontFamily: 'Nunito-Regular',
        fontSize: 18,
        paddingHorizontal: 20,
        paddingVertical: 10
    }
});

export default ImagePicker;