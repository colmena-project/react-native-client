import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Modal, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import ImagerPicker from '../form/ImagePicker';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import colors from '../../constants/colors';
import { useEffect } from 'react';

const PostModal = props => {

    const [text, setText] = useState('');
    const [postImage, setPostImage] = useState(null);
    const [filename, setFilename] = useState('');
    const [showImagePicker, setShowImagePicker] = useState(false);

    useEffect(() => {
        console.log(postImage ? true : false);
    }, [postImage]);

    const handleTakenImage = (image, filename) => {
        setPostImage(image);
        setFilename(filename);
    };

    const handleOnCancelPress = () => {
        setText('');
        setPostImage(null);
        props.onCancelPress();
    };

    const handleOnSendButton = () => {
        if (text && text !== '') {
            Alert.alert(
                'Nuevo post',
                'Se procederá a crear un nuevo post. ¿Continuar?',
                [
                    {
                        text: 'Cancelar',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    {
                        text: 'Sí, continuar',
                        onPress: send
                    },
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert('No ingresó ningún texto.');
        }
    };

    const send = () => {
        props.onSendPress(text, postImage, filename);
        setText('');
        setPostImage(null);
    };

    const handleShowImagePicker = show => {
        setShowImagePicker(show)
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
                <ImagerPicker
                    aspect={[1, 1]}
                    onRequestClose={() => setShowImagePicker(false)}
                    show={handleShowImagePicker}
                    visible={showImagePicker}
                    takenImage={handleTakenImage}
                />
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
                            <TouchableOpacity style={styles.editingIcon} onPress={() => handleShowImagePicker(true)}>
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