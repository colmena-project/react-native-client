import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Parse } from 'parse/react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../constants/colors';
import { FlatList } from 'react-native-gesture-handler';
import Moment from 'moment';
import AnimatedNumbers from 'react-native-animated-numbers';

const ActivityWallet = props => {

    const fields = {
        firstName: '',
        lastName: '',
        nickname: '',
        email: '',
        aboutMe: '',
        address: '',
        street: '',
        city: '',
        state: '',
        country: '',
        addressDescription: '',
        coords: { latitude: -27.3715333, longitude: -55.9170078 },
        walletId: '',
    };
    const [inputs, setInputs] = useState(fields);
    const [isLoading, setIsLoading] = useState(true);
    const [balance, setBalance] = useState("0.00");
    const [activitydata, setActivityData] = useState([]);
    const [activitysdata, setActivitySData] = useState([]);
    const [activityrdata, setActivityRData] = useState([]);
    const [selitem, setSelItem] = useState(0);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const parseAddress = new Parse.Query('Address');
            const transaction = new Parse.Query('Transaction');
            transaction.descending('createdAt').equalTo('expiredAt', undefined);
            const userTransactions = await transaction.find();
            parseAddress.equalTo('default', true);
            const userAddress = await parseAddress.first();            
            const parseAccount = await userAddress.get('account').fetch();
            console.log("transaction history::::", userTransactions);
            setInputs({
                ...inputs,
                firstName: parseAccount.get('firstName'),
                lastName: parseAccount.get('lastName'),
                nickname: parseAccount.get('nickname'),
                email: parseAccount.get('user').get('email'),
                aboutMe: parseAccount.get('aboutMe'),
                street: userAddress.get('street'),
                city: userAddress.get('city'),
                state: userAddress.get('state'),
                country: userAddress.get('country'),
                addressDescription: userAddress.get('description'),
                address: `${userAddress.get('street')}, ${userAddress.get('city')}, ${userAddress.get('state')}`,
                coords: userAddress.get('latLng').toJSON(),
                walletId: parseAccount.get('walletId')
            });
            setActivitySData([]);
            setActivityRData([]);
            setActivityData([]);
            if(parseAccount.get('walletId')){
                fetch('https://api.sandbox.circularnetwork.io/v1/project/JYC/users/'+ parseAccount.get('walletId'))
                .then((response) => response.json())
                .then((json) => {
                    const result = json.result;
                    setBalance(result.balance);
                })
                .catch((error) =>{
                    setIsLoading(false);
                    console.error(error);
                });

                fetch('https://api.sandbox.circularnetwork.io/v1/project/JYC/users/'+ parseAccount.get('walletId') +"/activity")
                // fetch('https://api.sandbox.circularnetwork.io/v1/project/TEST/users/zt44zpzsxm1l/activity')
                .then((response) => response.json())
                .then((json) => {
                    const result = json.result;
                    let sactivity = []
                    let ractivity = []
                    let allactivity = []
                    result.map((oneresult) =>{
                        let create_date = new Date(oneresult.created_at);
                        const one_fields = {
                            amount: oneresult.amount,                            
                            contract: oneresult.contract,
                            // created_at: create_date.toLocaleString(),
                            created_at: Moment(create_date).format('dd D/MM/yyyy HH:mm'),
                            dest_account_type: oneresult.dest_account_type,
                            from:oneresult.from?oneresult.from:{
                                account_name: "", 
                                avatar: null, 
                                name: "Colmena"
                            },
                            to:oneresult.to?oneresult.to:{
                                account_name: "", 
                                avatar: null, 
                                name: "Colmena"
                            },
                            memo: oneresult.memo,
                            name: oneresult.name,
                            project_id: oneresult.project_id,
                            signature: oneresult.signature,
                            status: oneresult.status,
                            tx_id: oneresult.tx_id,
                        }
                        allactivity.push(one_fields);
                        if(one_fields.to.account_name == parseAccount.get('walletId')){
                            ractivity.push(one_fields);
                        }else{
                            sactivity.push(one_fields);
                        }

                    });
                    setActivitySData(sactivity);
                    setActivityRData(ractivity);
                    setActivityData(allactivity);
                })
                .catch((error) =>{
                    setIsLoading(false);
                    console.error(error);
                });
            }
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            console.log('Error!! ' + err);
        }
    };

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            fetchData();
        });
        return unsubscribe;
    }, [props.navigation]);

    const onSetselitem = (item) =>{
        setSelItem(item);
    }

    const handleTransferUserList = () => {
        props.navigation.navigate('TransferUserList');
    };

    const handleRequestUserList = () => {
        props.navigation.navigate('RequestUserList');
    };
    const handleScanQRCode = () => {
        props.navigation.navigate('ScanQRCode');
    };

    const transactiondate= (postdate)=>{
        const date1 = new Date(postdate)
        return postdate
    }

    const renderItem = ({item: oneActivity}) => (
        <View>
            {oneActivity.from.account_name == inputs.walletId?
                <View width="100%" style={{padding: 10}} flexDirection="row" justifyContent="space-between">
                    {oneActivity.to.avatar ? (
                        <View style={{margin: 10}}>
                            <Image
                            style={{width:60, height: 60}}   
                            source={{uri: oneActivity.to.avatar}}
                            resizeMode="cover"
                            borderRadius={100}
                            />
                        </View>
                        ) : (
                            <Image
                                style={{width:60, height: 60, margin:10}}   
                                source={require('../../../../assets/user.png')}
                                resizeMode="cover"
                                borderRadius={100}
                            />
                        )}
                    <View flex={1} justifyContent="space-between">
                        <View/>
                        <Text width="100%" style={{fontFamily: 'Nunito-Regular'}}>
                            {oneActivity.to.name}
                        </Text>
                        <Text width="100%" style={{ fontSize:12,fontFamily: 'Nunito-Regular'}}>
                            {transactiondate(oneActivity.created_at)}
                        </Text>
                        <View/>
                    </View>
                    <View alignItems={'center'} justifyContent="space-between">
                        <View/>
                            <Text  style={{ color: '#ff0000', fontSize:15, fontFamily: 'Nunito-Regular' }}>                        
                                -{oneActivity.amount}
                            </Text>
                            <Text  style={{ color: '#ff0000', fontSize:15, fontFamily: 'Nunito-Regular' }}>                        
                                {oneActivity.memo=="MATERIAL"?"MATERIAL": "TRANSPORT"}
                            </Text>
                        <View/>
                    </View>            
                </View>
                :
                <View width="100%" style={{padding: 10}} flexDirection="row" justifyContent="space-between">
                    {oneActivity.from.avatar ? (
                        <View style={{margin: 10}}>
                            <Image
                            style={{width:60, height: 60}}   
                            source={{uri: oneActivity.from.avatar}}
                            resizeMode="cover"
                            borderRadius={100}
                            />                         
                        </View>
                        ) : (
                            <Image
                                style={{width:60, height: 60, margin:10}}   
                                source={require('../../../../assets/user.png')}
                                resizeMode="cover"
                                borderRadius={100}
                            />
                        )}
                    <View flex={1} justifyContent="space-between">
                        <View/>
                        <Text width="100%" style={{fontFamily: 'Nunito-Regular'}}>
                            {oneActivity.from.name}
                        </Text>
                        <Text width="100%" style={{fontSize:12,fontFamily: 'Nunito-Regular'}}>
                            {transactiondate(oneActivity.created_at)}
                        </Text>
                        <View/>
                    </View>
                    <View alignItems={'center'} justifyContent="space-between">
                        <View/>
                            <Text  style={{ color: '#21BDA3', fontSize:15, fontFamily: 'Nunito-Regular'}}>                        
                                +{oneActivity.amount}
                            </Text>
                                <Text  style={{ color: '#555', fontSize:15, fontFamily: 'Nunito-Regular'}}>                        
                                    {oneActivity.memo=="MATERIAL"?"MATERIAL": "TRANSPORT"}
                                </Text>                                                               
                        <View/>
                    </View>
                </View>
            }
        </View>
        
      );  

    return (
        <View style={{ flex: 1, backgroundColor: colors.colmenaBackground }}>
            {isLoading ? <ActivityIndicator style={{ marginTop: 50 }} size={"large"} color={colors.colmenaGreen} /> :
                <View flex={1} alignItems ="center">
                    <View flexDirection="row" style={{ padding: 20}}>
                        <View flex={1}>                            
                            <Text style={{fontFamily: 'Lato-Regular'}}>Hola, {inputs.firstName} !</Text>
                            <View flexDirection="row"><AnimatedNumbers fontStyle={{fontSize:30,color: '#21BDA3'}} animateToNumber={balance}/><Text style={{ color: '#21BDA3', fontSize:30, fontFamily: 'Mulish-Regular'}}> JYC</Text></View>
                            <Text size={20} style={{fontFamily: 'Lato-Regular'}}>Tu Balance</Text>
                        </View>
                        <View width ={70} alignItems = {'center'}>
                            <Text style={{fontFamily: 'Nunito-Regular'}}>Co2</Text>
                            <MaterialIcons name="arrow-downward" color = {'#21BDA3'} size = {30}/>
                            <Text style={{ color: '#21BDA3', fontSize:18, fontFamily: 'Nunito-Regular'}}>0.0 kg</Text>
                        </View>
                    </View>
                    <View flexDirection="row" style={{ padding: 5}} width="100%">
                        <View style={{ padding: 5}} alignItems ="center">
                            <TouchableOpacity onPress={handleTransferUserList}>
                                <Image
                                    style={{width:60, height: 60}}
                                    source={require('../../../../assets/enviar.png')}
                                    resizeMode="cover"
                                    borderRadius={100}
                                />
                            </TouchableOpacity>
                            <Text style={{ color: '#21BDA3', fontSize:14, fontFamily: 'Nunito-Regular'}}>Enviar</Text>
                        </View>
                        <View style={{ padding: 5}} alignItems ="center">
                            <TouchableOpacity onPress={handleRequestUserList}>
                                <Image
                                    style={{width:60, height: 60}}
                                    source={require('../../../../assets/pedir.png')}
                                    resizeMode="cover"
                                    borderRadius={100}
                                />
                            </TouchableOpacity>
                            <Text style={{ color: '#21BDA3', fontSize:14, fontFamily: 'Nunito-Regular'}}>Pedir</Text>
                        </View>

                        <View style={{ padding: 5}} alignItems ="center">
                            <TouchableOpacity onPress={handleScanQRCode}>
                                <Image
                                    style={{width:60, height: 60}}
                                    source={require('../../../../assets/qrcode.png')}
                                    resizeMode="cover"
                                    borderRadius={100}
                                />
                            </TouchableOpacity>
                            <Text style={{ color: '#21BDA3', fontSize:14, fontFamily: 'Nunito-Regular'}}>Leer QR</Text>
                        </View>
                    </View>
                    <View flexDirection="row" width = "100%" style={{ padding: 20}} justifyContent="space-between">
                        {selitem == 0 ? 
                            <View flex ={1} alignItems = {'center'} backgroundColor ={'#21BDA3'} style={{ padding: 10}}>
                                <TouchableOpacity onPress={onSetselitem.bind(this,0)}>
                                    <View>
                                        <Text style={{ color: '#fff', fontSize:15 }}>Todos</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            :
                            <View flex ={1} alignItems = {'center'} style={{ padding: 10}}>
                                <TouchableOpacity onPress={onSetselitem.bind(this,0)}>
                                    <View>
                                        <Text style={{ color: '#bbbbbb', fontSize:15,fontFamily: 'Nunito-Regular'}}>Todos</Text>
                                    </View>
                                </TouchableOpacity>                               
                            </View>
                        }
                        {selitem == 1 ?
                            <View flex ={1} alignItems = {'center'} backgroundColor ={'#21BDA3'} style={{ padding: 10}}>
                            <TouchableOpacity onPress={onSetselitem.bind(this,1)}>
                                <View>
                                    <Text style={{ color: '#fff', fontSize:15, fontFamily: 'Nunito-Regular'}}>Recibidos</Text>
                                </View>
                            </TouchableOpacity>
                            
                            </View>
                            :
                            <View flex ={1} alignItems = {'center'} style={{ padding: 10}}>
                                <TouchableOpacity onPress={onSetselitem.bind(this,1)}>
                                    <View>
                                        <Text style={{ color: '#bbbbbb', fontSize:15, fontFamily: 'Nunito-Regular'}}>Recibidos</Text>
                                    </View>
                                </TouchableOpacity>
                                
                            </View>
                        }

                        {selitem == 2 ?
                            <View flex ={1} alignItems = {'center'} backgroundColor ={'#21BDA3'} style={{ padding: 10}}>
                                <TouchableOpacity onPress={onSetselitem.bind(this,2)}>
                                    <View>
                                        <Text style={{ color: '#fff', fontSize:15 }} >Enviados</Text>
                                    </View>
                                </TouchableOpacity>
                            
                            </View>
                            :
                            <View flex ={1} alignItems = {'center'} style={{ padding: 10}}>
                                <TouchableOpacity onPress={onSetselitem.bind(this,2)}>
                                    <View>
                                        <Text style={{ color: '#bbbbbb', fontSize:15 }} >Enviados</Text>
                                    </View>
                                </TouchableOpacity>                                
                            </View>
                        }
                    </View>
                    {selitem == "0" &&
                        <FlatList
                            width = "100%"
                            style={{ padding:20 }}
                            data={activitydata}
                            renderItem={renderItem}
                            keyExtractor={item => item.tx_id}
                        />
                    }
                    {selitem == "1" &&
                        <FlatList
                            width = "100%"
                            style={{ padding:20 }}
                            data={activityrdata}
                            renderItem={renderItem}
                            keyExtractor={item => item.tx_id}
                        />
                    }
                    {selitem == "2" &&
                        <FlatList
                            width = "100%"
                            style={{ padding:20 }}
                            data={activitysdata}
                            renderItem={renderItem}
                            keyExtractor={item => item.tx_id}
                        />
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

export default ActivityWallet;