
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import colors from '../../../constants/colors';
import styles from '../../../constants/profileStyles';
import FeedListU from '../../../components/posts/FeedListU';

import { useDispatch } from 'react-redux';
import Auth from '../../../services/Auth';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AuthorizedScreen from '../../../components/auth/AuthorizedScreen';
import Parse from 'parse/react-native';
import UserService from '../../../services/User';
import WasteService from '../../../services/Waste';
import ManageWasteCategory from '../../../components/waste/ManageWasteCategory';


const UserProfile = props => {
    const [userAccount, setUserAccount] = useState(null);
    const POST_PER_LOAD_LIMIT = 20;
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [posts, setPosts] = useState([]);    
    const [postsQty, setPostsQty] = useState(0);
    const [selpage, setSelPage] = useState(0);
    const [containers, setContainers] = useState(null);
    const [wasteTypes, setWasteTypes] = useState(null);
    const [transactions, setTransactions] = useState(null);
    const [balance, setBalance] = useState("0.00");

    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const account = await Parse.Cloud.run("getMyAccount");
            const addresses = account.addresses;
            console.log("address:::", account.walletId);
            console.log("______________________");
            setUserAccount(account);            
            const fetchPosts = new Parse.Query("Post");
            fetchPosts.equalTo('createdBy', account.user).descending('createdAt').limit(POST_PER_LOAD_LIMIT);
            const result = await fetchPosts.find();
            setPostsQty(result.length);
            setPosts(result);

            const fetchedWasteTypes = await WasteService.fetchWasteTypes(dispatch);
            const fetchedContainers = await UserService.fetchRecoveredContainers(dispatch);
            setWasteTypes(fetchedWasteTypes);
            setContainers(fetchedContainers);

            const fetchedTransactions = await UserService.fetchTransactions();
            const transportTransactions = fetchedTransactions.filter(transaction => transaction.get('type') === 'TRANSPORT');
            setTransactions(transportTransactions);

            if(account.walletId){
                fetch('https://api.sandbox.circularnetwork.io/v1/project/JYC/users/'+ account.walletId)
                .then((response) => response.json())
                .then((json) => {
                    const result = json.result;
                    setBalance(result.balance);
                })
                .catch((error) =>{
                    console.error(error);
                });
            }

            setIsLoading(false);
        } catch (err) {
            console.log('fetchData - User Profile' + err);
        }
        setIsLoading(false);
    };

    const loadMorePosts = async () => {
        try {
            setIsLoadingMore(true);
            const fetchPosts = new Parse.Query("Post");
            fetchPosts.equalTo('createdBy', userAccount.user).descending("createdAt").limit(POST_PER_LOAD_LIMIT).skip(posts.length);
            const result = await fetchPosts.find();
            const updatedPosts = [...posts, ...result];
            setPostsQty(updatedPosts.length);
            setPosts(updatedPosts);
            setIsLoadingMore(false);
        } catch (err) {
            console.log("loadMorePosts - User Profile" + err);
        }
    };

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            fetchData();
        });
        return unsubscribe;
    }, [props.navigation]);

    useEffect(() => {
        if(userAccount != null){
            if (selpage == 0){
                props.navigation.setOptions({ title: userAccount.firstName+ " " + userAccount.lastName });
            }else if(selpage == 1){
                props.navigation.setOptions({ title: 'Impacto' });
            }else if(selpage == 2){
                props.navigation.setOptions({ title: 'Mis Pendientes' });
            }
        }        

    }, [selpage, userAccount]);

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    };

    const handleOnEndReached = () => {
        loadMorePosts();
    };

    const handleLogout = () => {
        Auth.logOut(dispatch);
    };

    const handleEditProfile = () => {
        props.navigation.navigate('EditProfile');
    };
    const handleActivityWallet = () => {
        props.navigation.navigate('ActivityWallet');
    };
    const handleTransferUserList = () => {
        props.navigation.navigate('TransferUserList');
    };

    const handleOnUsernamePress = (user) => {
        // props.navigation.navigate("OthersProfile",{ user });
    };
    const handleManageProductPress = type => {
        props.navigation.navigate('ManageWaste', { type });
    };

    const onSetPage = (pagenumb) => {
        setSelPage(pagenumb);
    };

    return (
        <AuthorizedScreen>
            {isLoading || !userAccount ? <ActivityIndicator style={{ flex: 1, alignItems: 'center' }} size={'large'} color={colors.colmenaGreen} /> :
                <ScrollView style={{ ...styles.scrollViewWrapper }} onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                        handleOnEndReached();
                    }
                }}>
                    {/* *********** PROFILE HEADER *********** */}
                    <View style={{ ...styles.profileHeader }}>
                        <View style={{flexDirection:'row', marginBottom:20}}>
                            <View style={{alignItems: 'center', flex:1}}>
                                <TouchableOpacity onPress={onSetPage.bind(this,0)}>
                                    <Ionicons name={'md-person'} size={30} color={selpage == 0 ? colors.colmenaGreen : '#4C4C4C'} />
                                    <Text style={styles.profileHeadertitle}>
                                        Perfil
                                    </Text>
                                </TouchableOpacity>                                
                                {selpage == 0 &&
                                 <View style={{width:100,height:2, backgroundColor:colors.colmenaGreen}}/>
                                }
                            </View>
                            <View style={{alignItems: 'center', flex:1}}>
                                <TouchableOpacity onPress={onSetPage.bind(this,1)} style={{alignItems: 'center'}}>
                                    <Ionicons name={'md-cube'} size={30} color={selpage == 1 ? colors.colmenaGreen : '#4C4C4C'} />
                                    <Text style={styles.profileHeadertitle}>
                                        Residuos
                                    </Text>
                                </TouchableOpacity>                                
                                {selpage == 1 &&
                                 <View style={{width:100,height:2, backgroundColor:colors.colmenaGreen}}/>
                                }
                            </View>
                            <View style={{alignItems: 'center', flex:1}} >
                                <TouchableOpacity onPress={onSetPage.bind(this,2)} style={{alignItems: 'center'}}>
                                    <Ionicons name={'md-clipboard'} size={30} color={selpage == 2 ? colors.colmenaGreen : '#4C4C4C'} />
                                    <Text style={styles.profileHeadertitle}>
                                        Pendientes
                                    </Text>
                                </TouchableOpacity>                               
                                {selpage == 2 &&
                                 <View style={{width:100,height:2, backgroundColor:colors.colmenaGreen}}/>
                                }
                            </View>
                        </View>
                        {selpage == 0 &&
                            <View>
                                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                    <View style={styles.profilePicture}>
                                        {(userAccount && userAccount.avatar) ?
                                            <Image
                                                style={styles.avatar}
                                                source={{ uri: userAccount.avatar._url }}
                                            /> :
                                            <Image
                                                style={styles.avatar}
                                                source={require('../../../../assets/default_user_1.png')}
                                            />
                                        }                                        
                                    </View>

                                    <View style={{}}>
                                        <Text style={styles.name}>
                                            @{userAccount.createdBy.get('username')}
                                        </Text>                                
                                        <View style={styles.locationInfo}>
                                            <EvilIcons name={'location'} size={25} color={'#4C4C4C'} />
                                            <Text style={styles.titleTexts}>{userAccount.addresses[0].city}, {userAccount.addresses[0].state}</Text>
                                        </View>
                                        <View style={styles.aboutMeInfo}>
                                            <Text style={styles.aboutMeText}>
                                                {userAccount.aboutMe}
                                            </Text>
                                        </View>                                
                                    </View>
                                </View>
                                <View style={{ ...styles.btnContainer, paddingHorizontal: 30 }}>
                                    <TouchableOpacity onPress={handleEditProfile} style={styles.editInfoBtn}>
                                        <Text style={styles.editInfoBtnText}>Editar info pública</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ ...styles.btnContainer, paddingHorizontal: 30 }}>
                                    <TouchableOpacity onPress={handleLogout} style={styles.editInfoBtn}>
                                        <Text style={styles.editInfoBtnText}>Cerrar sesión</Text>
                                    </TouchableOpacity>
                                </View>
                                {/* *********** FIN PROFILE HEADER *********** */}
                                {/* *********** ACTIVIDAD (POSTS) *********** */}
                                <View style={styles.activityContainer}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                        <Text style={styles.activityTitle}>Actividad</Text>
                                        <Text style={styles.activityExtraInfo}>
                                            {postsQty} <Text style={styles.activityExtraInfoDetail}>POSTS</Text>
                                        </Text>
                                    </View>

                                    <FeedListU onPress={handleOnUsernamePress} data={posts} />
                                    {isLoadingMore &&
                                        <ActivityIndicator
                                            size={"large"}
                                            color={colors.colmenaGreen}
                                        />}
                                </View>
                                {/* *********** FIN ACTIVIDAD (POSTS) *********** */}
                            </View>
                        }
                        {selpage == 1 &&
                            <View>
                                {containers && containers.length > 0 ?
                                <View>
                                    <View style={styles.wasteTabContainer}>
                                        {wasteTypes && wasteTypes.map(wasteType => {
                                            return <ManageWasteCategory key={wasteType.id} onPress={handleManageProductPress} wasteType={wasteType} containers={containers} />
                                        })
                                        }
                                    </View>
                                    <View style={styles.locationInfo}>
                                        <EvilIcons name={'location'} size={35} color={'#4C4C4C'} />
                                        <Text style={styles.addressTexts}>{userAccount.addresses[0].city}, {userAccount.addresses[0].state}</Text>
                                    </View>
                                    <View flexDirection="row" style={{ padding: 20}}>
                                        <View flex={1}>                           
                                            <Text style={{ color: '#29c17e', fontSize:30, fontFamily: 'Mulish-Regular'}}>{balance} JYC</Text>
                                            <Text size={20} style={{fontFamily: 'Lato-Regular'}}>Tu Balance</Text>
                                        </View>
                                        <View width ={70} alignItems = {'center'}>
                                            <Text style={{fontFamily: 'Nunito-Regular'}}>Co2</Text>
                                            <MaterialIcons name="arrow-downward" color = {'#29c17e'} size = {30}/>
                                            <Text style={{ color: '#29c17e', fontSize:18, fontFamily: 'Nunito-Regular'}}>0.0 kg</Text>
                                        </View>
                                    </View>
                                    <View style={{ ...styles.btnContainer, paddingHorizontal: 30 }}>
                                        <TouchableOpacity onPress={handleActivityWallet} style={styles.editInfoBtn}>
                                            <Text style={styles.editInfoBtnText}>Ver más movimientos</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                <View style={{ justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20}}>
                                    <Image style={{ resizeMode: 'contain', width: 150, height: 150}} source={require('../../../../assets/profile/empty_transactions.png')} />
                                    <Text style={{ paddingHorizontal: 20, textAlign: 'center', fontFamily: 'Nunito-Light', fontSize: 18, color: '#4B4B4B' }}>
                                        No tenés actividades pendientes. Intenta con el menú de acciones.
                                    </Text>
                                </View>
                                }
                            
                            </View>                            
                        }
                        {selpage == 2 &&
                            <View>
                                {/* {containers && containers.length > 0 ?
                                <View>
                                    <View style={styles.wasteTabContainer}>
                                        {wasteTypes && wasteTypes.map(wasteType => {
                                            return <ManageWasteCategory key={wasteType.id} onPress={handleManageProductPress} wasteType={wasteType} containers={containers} />
                                        })
                                        }
                                    </View>
                                    <View style={styles.locationInfo}>
                                        <EvilIcons name={'location'} size={35} color={'#4C4C4C'} />
                                        <Text style={styles.addressTexts}>{userAccount.addresses[0].city}, {userAccount.addresses[0].state}</Text>
                                    </View>
                                    <View flexDirection="row" style={{ padding: 20}}>
                                        <View flex={1}>                           
                                            <Text style={{ color: '#29c17e', fontSize:30, fontFamily: 'Mulish-Regular'}}>{balance} JYC</Text>
                                            <Text size={20} style={{fontFamily: 'Lato-Regular'}}>Tu Balance</Text>
                                        </View>
                                        <View width ={70} alignItems = {'center'}>
                                            <Text style={{fontFamily: 'Nunito-Regular'}}>Co2</Text>
                                            <MaterialIcons name="arrow-downward" color = {'#29c17e'} size = {30}/>
                                            <Text style={{ color: '#29c17e', fontSize:18, fontFamily: 'Nunito-Regular'}}>0.0 kg</Text>
                                        </View>
                                    </View>
                                    <View style={{ ...styles.btnContainer, paddingHorizontal: 30 }}>
                                        <TouchableOpacity onPress={handleTransferUserList} style={styles.editInfoBtn}>
                                            <Text style={styles.editInfoBtnText}>Ver más movimientos</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                : */}
                                <View style={{ justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20}}>
                                    <Image style={{ resizeMode: 'contain', width: 150, height: 150}} source={require('../../../../assets/profile/empty_transactions.png')} />
                                    <Text style={{ paddingHorizontal: 20, textAlign: 'center', fontFamily: 'Nunito-Light', fontSize: 18, color: '#4B4B4B' }}>
                                        No tenés actividades pendientes. Intenta con el menú de acciones.
                                    </Text>
                                </View>
                                {/* } */}
                            
                            </View>
                            
                        }
                    </View>
                </ScrollView>
            }
        </AuthorizedScreen>
    );
};

export default UserProfile;