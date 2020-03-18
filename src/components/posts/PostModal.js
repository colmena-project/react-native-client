import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Modal, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../styles/colors';

const PostModal = props => {

    const [ text, setText ] = useState('');

    const handleOnSendButton = () => {
        props.onSendPress(text);
        setText('');
    };
    
    const handleOnCameraButton = () => {
        props.onCameraPress();
    };

    return (
        <KeyboardAvoidingView behavior={'position'}>

            <Modal
                transparent={true}
                onRequestClose={props.onRequestClose}
                animationType="fade"
                visible={props.visible} style={styles.container}
                backdrop={false}
                position={"bottom"}
                entry={"bottom"}>
                <View style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: 'white',
                        width: '100%',
                        height: 50
                    }}>
                        <TouchableOpacity style={styles.icon} onPress={handleOnCameraButton}>
                        <Feather name={'camera'} size={30} color={'black'} />
                        </TouchableOpacity>
                        <View style={{flex:1, justifyContent: 'center', paddingHorizontal: 10,}}>
                            <TextInput value={text} onChangeText={value => setText(value)} autoFocus = {true} placeholder={'Escribe algo...'}/>
                        </View>
                        <TouchableOpacity style={styles.icon} onPress={handleOnSendButton}>
                            <Ionicons name={'md-send'} size={30} color={colors.colmenaGreen} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'green'
    },
    modalContainer: {
        backgroundColor: 'red'
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        width: 30,
        height: 50,
    }
});

export default PostModal;