import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    scrollViewWrapper: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView_Wrapper: {
        backgroundColor: 'white',
    },
    scrollView: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 8,
        flex: 1,
    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileHeader: {
        width: '100%',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED'
    },
    profilePicture: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        overflow: 'hidden',
    },
    profileHeadertitle: {
        fontFamily: 'Nunito-Regular',
        fontSize: 12,
        textAlign: 'justify',
        color: '#4C4C4C'
    },
    name: {
        fontFamily: 'Nunito-Regular',
        fontSize: 15,
        textAlign: 'justify',
        color: '#4C4C4C',
        marginLeft: 5,
    },
    locationInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 5,
    },
    addressTexts: {
        fontSize: 16,
        color: '#4C4C4C',
        fontFamily: 'Nunito-Regular'
    },
    aboutMeInfo: {
        margin: 5,
    },
    aboutMeText: {
        textAlign: 'justify',
        fontFamily: 'Nunito-Light',
        color: '#4C4C4C',
    },
    btnContainer: {
        width: '100%',
        marginTop: 10,
    },
    editInfoBtn: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: colors.colmenaGreen,
        borderRadius: 5,
        paddingVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    editInfoBtnText: {
        textAlign: 'center',
        color: colors.colmenaGreen,
        fontFamily: 'Nunito-Regular',
        fontSize: 16
    },
    activityContainer: {
        flex: 1,
        width: '100%',
    },
    brandText: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '300',
        fontSize: 30,
        color: colors.colmenaGrey,
        marginLeft: 30,
    },
    activityTitle: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '300',
        fontSize: 30,
        color: colors.colmenaGrey,
        marginLeft: 30,
        fontSize: 18,
        color: '#4C4C4C',
        paddingVertical: 10,
        marginLeft: 0,
        marginTop: 15
    },
    activityExtraInfo: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '300',
        fontSize: 30,
        color: colors.colmenaGrey,
        marginLeft: 30,
        fontSize: 18,
        color: '#4C4C4C',
        paddingVertical: 10,
        marginLeft: 0,
        marginTop: 15
    },
    activityExtraInfoDetail: {
        fontSize: 12,
        fontFamily: 'Nunito-Light',
        marginLeft: 10,
    },
    tabBarContainer: {
        flex: 1,
    },
    tabBar: {  // Íconos de los tabs
        flexDirection: 'row',
        marginTop: 15,
    },
    tabItem: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 10,
        marginLeft: 0,
        borderBottomWidth: 3,
    },
    tabContent: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    wasteTabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED'
    },
    wasteTab_Container: {
        height: 200
    },
    locationTabContainer: {
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED'
    },


    wasteInfoContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED'
    },
    wasteCardsContainer: {
        paddingVertical: 20,
        paddingLeft: 20,
    },
    wasteTitle: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 18,
        color: '#4c4c4c',
        marginBottom: 10,
    },
    wasteCardTitle: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 10,
        color: '#6E7989',
        backgroundColor: '#D8DAE0',
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 3,
        marginBottom: 5,
        textTransform: 'uppercase',
    },
    wasteDescription: {
        textAlign: 'left',
        fontFamily: 'Nunito-Regular',
        fontSize: 16,
        color: '#4C4C4C',
    },
    impactDescription: {
        textAlign: 'left',
        fontFamily: 'Nunito-Regular',
        fontSize: 16,
        color: '#4C4C4C',
    },
    wasteCard: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 115,
        height: 165,
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    wasteItem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 165,
        padding: 10,
    },
    cellItem:{
        marginTop: 10,
        height : 200
    },
    impactTitle: {
        color: colors.colmenaGreen,
        fontFamily: 'Nunito-Regular',
        fontSize: 20
    },
    impactImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain'
    },
    wasteImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    impactDescription: {
        textAlign: 'center',
        fontFamily: 'Nunito-Regular',
        fontSize: 16,
        color: '#4C4C4C',
    },
    activityTitle: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '300',
        fontSize: 30,
        color: colors.colmenaGrey,
        marginLeft: 30,
        fontSize: 18,
        color: '#4C4C4C',
        paddingVertical: 10,
        marginLeft: 0,
        marginTop: 15
    },
    activityExtraInfo: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '300',
        fontSize: 30,
        color: colors.colmenaGrey,
        marginLeft: 30,
        fontSize: 18,
        color: '#4C4C4C',
        paddingVertical: 10,
        marginLeft: 0,
        marginTop: 15
    },
    activityExtraInfoDetail: {
        fontSize: 12,
        fontFamily: 'Nunito-Light',
        marginLeft: 10,
    },
});

export default styles;