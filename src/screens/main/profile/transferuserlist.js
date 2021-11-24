import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert, Image, TextInput} from 'react-native';
import { Avatar } from 'react-native-elements';
import { Parse } from 'parse/react-native';
import Input from '../../../components/form/Input';
import ImagerPicker from '../../../components/form/ImagePicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapPicker from '../../../components/address/MapPicker';
import colors from '../../../constants/colors';
import validate from '../../../services/Validate';
import { Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';


const TransferUserList = props => {    
    const [isLoading, setIsLoading] = useState(true);
    const [userlist, setUserList] = useState([]);
    const [searchResultList, setSearchResultList] = useState();
    const [searchtxt, setSearchTxt] = useState("");
    const [searchStatus, setSearchStatus] = useState(false);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const parseAccounts = new Parse.Query('Account');
            const userAccounts = await parseAccounts.find();
            
            const list = [];
            userAccounts.forEach(obj => {
                // if(obj.get('walletId') && obj.get('user').get('email')){
                if(obj.get('walletId')){
                    const one_fields = {
                        firstName: obj.get('firstName'),
                        lastName: obj.get('lastName'),
                        nickname: obj.get('nickname'),
                        email: obj.get('user').get('email'),
                        aboutMe: obj.get('aboutMe'),                
                        walletId: obj.get('walletId')? obj.get('walletId') : null,
                        avatar: obj.get('avatar') ? obj.get('avatar')._url : null,
                        id: obj.id
                    }
                    list.push(one_fields);
                }
                
            });
            console.log("list::", list);
            setUserList(list);
            setIsLoading(false);
        } catch (err) {
            console.log('Error!! ' + err);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            fetchData();
        });
        return unsubscribe;
    }, [props.navigation]);

    const onSearchUser = (text) =>{
        setSearchTxt(text);
        if(text == ""){
            setSearchStatus(false);
        }else{
            setSearchStatus(true);
            const filterusers = [];
            for (let i = 0 ; i < userlist.length ; i ++ ) {
                if(userlist[i].firstName.toLowerCase().includes(text.toLowerCase()) || userlist[i].lastName.toLowerCase().includes(text.toLowerCase()) || userlist[i].nickname.toLowerCase().includes(text.toLowerCase())|| userlist[i].walletId.toLowerCase().includes(text.toLowerCase())){
                    filterusers.push(userlist[i])
                }
            }
            setSearchResultList(filterusers);
        }
    }
    const onCloseSearch = () =>{
        console.log("exit")
        setSearchTxt("");
        setSearchStatus(false);
    }

    const handleTransferCoin = (oneuser) => {
        props.navigation.navigate('TransferCoin',{oneuser});
    };

    const renderItem = ({item: oneuser}) => (
        <TouchableOpacity onPress={handleTransferCoin.bind(this,oneuser)}>
            <View width="100%" style={{padding: 10}} flexDirection="row" justifyContent="space-between">
                {oneuser.avatar ? (
                        <Image
                            style={{width:50, height: 50}}   
                            source={{uri: oneuser.avatar}}
                            resizeMode="cover"
                            borderRadius={100}
                        />
                    ) : (
                        <Image
                            style={{width:50, height: 50}}
                            source={require('../../../../assets/user.png')}
                            resizeMode="cover"
                            borderRadius={100}
                        />
                    )}
                <View flex={1} justifyContent="space-between" style={{marginStart:10}}>
                    <View/>
                    <Text width="100%" style={{fontSize:16, fontFamily: 'Nunito-Regular'}}>
                        {oneuser.nickname}
                    </Text>                    
                    <View/>
                </View>                         
            </View>            
        </TouchableOpacity>        
    );
    
    const renderRecentItem = ({item: oneuser}) => (
        <TouchableOpacity onPress={handleTransferCoin.bind(this, oneuser)}>
            <View width={70} height={100} alignItems="center">
                <View style={{padding: 5}}>
                    {oneuser.avatar ? (
                        <View>
                            <Image
                            style={{width:40, height: 40}}   
                            source={{uri: oneuser.avatar}}
                            resizeMode="cover"
                            borderRadius={100}
                            />
                        </View>
                        ) : (
                            <Image
                                style={{width:40, height: 40}}
                                source={require('../../../../assets/user.png')}
                                resizeMode="cover"
                                borderRadius={100}
                            />
                        )}
                    <View justifyContent="space-between" flexDirection="row">
                        <View/>
                        <Text style={{fontSize:14, fontFamily: 'Nunito-Regular'}}>
                            {oneuser.nickname}
                        </Text>                    
                        <View/>
                    </View>                         
                </View>            
            </View>
        </TouchableOpacity>
                
    );

    return (
            <View style={{ height:"100%",width:"100%",  backgroundColor: colors.colmenaBackground }}>
                {isLoading ? <ActivityIndicator style={{ marginTop: 50 }} size={"large"} color={colors.colmenaGreen}
                        /> :
                <View style={{margin:15}} flex={1} justifyContent="space-between">
                    <Text  style={{ color: '#000', fontSize:22, fontFamily: 'Mulish-Regular'}}>A quién quieres enviar jellys?</Text>
                    <Text  style={{ color: '#000', fontSize:14, fontFamily: 'Lato-Regular'}}>Elije un contacto de tu lista o inicia un nuevo envío</Text>
                    <View style={{margin:10, padding:10, borderColor:"#999", borderWidth:1, borderRadius:10}} flexDirection="row"> 
                        <TextInput
                            flex={1}
                            onChangeText={text => onSearchUser(text) }
                            value={searchtxt}
                            placeholder="NOMBRE, CODIGO"
                            style={{fontFamily: 'Mulish-Regular'}}
                        />
                        {searchStatus &&
                            <Ionicons name="md-close-circle-outline" size={24} onPress={onCloseSearch}/>
                        }
                        
                    </View>
                    {searchStatus ?
                    <View flex = {1}>
                        {searchResultList.length>0 ?
                            <View>
                                <Text style={{marginTop:5, color: '#000', fontSize:16}}>Todos los contactos</Text> 
                                <FlatList                            
                                    data={searchResultList}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.id}/>
                            </View>
                            :
                            <View>
                                <Text  style={{ color: '#f00', fontSize:16}}>Use el nombre correcto o el Numero de WALLET para lograr el envio y agregar el nombre a tu lista</Text>
                            </View>
                            
                        }
                        
                    </View>
                    :
                    <View flex = {1}>
                        <Text  style={{ color: '#000', fontSize:16,marginTop: 5, fontFamily: 'Nunito-Regular'}}>Recientes</Text>
                        <FlatList
                            height={100}
                            horizontal
                            data={userlist}
                            renderItem={renderRecentItem}
                            keyExtractor={item => item.id}/>
                        <Text style={{marginTop:10, color: '#000', fontSize:16, fontFamily: 'Nunito-Regular'}}>Todos los contactos</Text> 
                        <FlatList
                            data={userlist}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}/>
                    </View>
                    }
                </View>
                }
            </View>  
    );
};

const styles = StyleSheet.create({
    scrollViewWrapper: {
        flex: 1,
        padding: 0,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: colors.colmenaBackground,
    },
    scrollView: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 8,
        flex: 1,
    },
    activityIndicator: {
        flex: 1,
    },
    brand: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },
    brandText: {
        fontFamily: 'Montserrat-Medium',
        fontWeight: '300',
        fontSize: 26,
        color: colors.colmenaGrey,
        marginLeft: 30,
    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputsContainer: {
        marginBottom: 30,
    },
    input: {
        flex: 1,
        textAlign: 'center',
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 40,
    },
    saveIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: '#e8e8e8',
    },
    changePassword: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        padding: 5,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: '#e8e8e8',
    },
    getCurrentPositionIcon: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 10,
        bottom: 10,
    },
});

export default TransferUserList;