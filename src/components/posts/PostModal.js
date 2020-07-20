import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Modal, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import ImagerPicker from 'expo-image-picker';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import colors from '../../constants/colors';
import { useEffect } from 'react';

const PostModal = props => {

    const [text, setText] = useState('');
    const [postImage, setPostImage] = useState(null);
    const [filename, setFilename] = useState('');

    useEffect(() => {
        console.log(postImage ? true : false);
    }, [postImage]);

    const handleOnCancelPress = () => {
        setText('');
        setPostImage(null);
        props.onCancelPress();
    };

    const handleOnSendButton = () => {
        if (text && text !== '') {
            props.onSendPress(text, postImage, filename);
            setText('');
            setPostImage(null);
        } else {
            Alert.alert('No ingresó ningún texto.');
        }
    };

    const options = {
        title: 'Nueva imagen',
        takePhotoButtonTitle: 'Tomar foto',
        chooseFromLibraryButtonTitle: 'Seleccionar desde galería',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    const showImagePicker = () => {
        ImagePicker.showImagePicker(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                try {
                    setFilename(response.fileName);
                    setPostImage(response.data);
                } catch (ex) {
                    console.log(ex);
                }
            }
        });
    };

    return (
        <KeyboardAvoidingView behavior={'position'}>

            <Modal
                transparent={false}
                onRequestClose={props.onRequestClose}
                animationType="fade"
                visible={props.visible}
                style={styles.modalContainer}
                backdrop={false}
                position={"bottom"}
                entry={"bottom"}>
                <View style={styles.modal}>
                    <View style={styles.addPost}>
                        <TouchableOpacity style={styles.cancelBtn} onPress={handleOnCancelPress}>
                            <Text style={styles.cancelBtnText}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.icon} onPress={handleOnSendButton}>
                            <Ionicons name={'md-send'} size={24} color={'white'} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'space-between' }} >
                        <View style={styles.post}>
                            {/* <MaterialCommunityIcons style={styles.editingIcon} name={'pencil'} size={26} color={'white'} /> */}
                            <TouchableOpacity style={styles.editingIcon} onPress={showImagePicker}>
                                <Feather name={'camera'} size={24} color={'white'} />
                            </TouchableOpacity>
                            <View style={styles.postInput}>
                                <TextInput
                                    style={{ textAlignVertical: 'top', color: 'white' }}
                                    value={text}
                                    onChangeText={value => setText(value)}
                                    autoFocus={true}
                                    placeholder={'Escribe algo...'}
                                    placeholderTextColor={'white'}
                                    multiline
                                    numberOfLines={4}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{ width: '100%', alignItems: 'center', maxHeight: 150, marginBottom: 30 }}>
                        {postImage ?
                            <Image style={{ resizeMode: 'contain', borderRadius: 2, margin: 20, padding: 20, width: '100%', height: '100%' }} source={{ uri: `data:image/jpeg;base64,${postImage}` }} />
                            :
                            <View></View>}
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
    },
    modal: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        flex: 1,
    },
    addPost: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 30,
        marginTop: 10,
        marginBottom: 20
    },
    post: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    postInput: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        width: 30,
        height: 50,
    },
    editingIcon: {
        marginTop: 5,
        marginLeft: 30,
    },
    cancelBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        width: 70,
        height: 50,
    },
    cancelBtnText: {
        color: colors.colmenaGreen
    }
});

export default PostModal;