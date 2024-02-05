import colors from './colors';

const btn = {
    justifyContent: 'center',
    height: 45,
    borderRadius: 5,
};

const btnText = {
    color: 'white',
    fontFamily: "Nunito-Bold",
    fontSize: 22,
    textAlign: 'center',
    letterSpacing: 5
};

export const theme = {
    colors: {
        primary: colors.colmenaGreen,
        text: colors.colmenaGrey,
        placeholder: colors.colmenaGrey,
    },
};

export const styles = {
    screen: {
        flex: 1,
        backgroundColor: colors.background
    },
    scrollViewScreen: {
        flex: 1,
    },
    container: {
        flex: 1,
        width: '100%',
        padding: 30,
        // alignItems: 'center',
    },
    screenLogoLogin: {
        alignItems: 'center',
        width: '100%',
        height: 50,
        maxWidth: 300,
        marginTop: 90,
        marginBottom: 70,
    },
    screenLogoRegister: {
        width: '100%',
        height: 50,
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 30,
    },
    screenTitleContainer: {
        overflow: 'hidden',
    },
    screenTitleShadow: {
        backgroundColor: '#fff',
        width: '100%',
        height: 1,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    mapShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 2,
    },
    screenTitle: {
        fontFamily: 'Nunito-Bold',
        fontSize: 22,
        padding: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    inputsStyle: {
        backgroundColor: 'white',
        fontSize: 18
    },
    btnPrimary: {
        ...btn,
        backgroundColor: colors.colmenaGreen,
    },
    btnDisabled: {
        ...btn,
        backgroundColor: colors.accentLightGray,
    },
    btnSecondary: {
        ...btn,
        backgroundColor: colors.primaryDavysGray,
    },
    btnTextWhite: {
        ...btnText,
        color: 'white',
    },
    actionBtnPrimary: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 10,
        height: 40,
        borderRadius: 7,
        backgroundColor: colors.primaryOldMossGreen,
        borderColor: colors.primaryDavysGray,
        borderWidth: 1,
        marginBottom: 15,
    },
    actionBtnAccent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        height: 40,
        borderRadius: 7,
        backgroundColor: 'white',
        borderColor: colors.primaryDavysGray,
        borderWidth: 1,
        marginBottom: 15,
    },
    actionBtnDanger: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
        height: 40,
        borderRadius: 7,
        backgroundColor: '#a52127',
        marginBottom: 15,
    },
    actionBtnEndSession: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        height: 40,
        borderRadius: 7,
        backgroundColor: colors.accentLightGray,
        borderColor: colors.primaryDavysGray,
        borderWidth: 0,
        marginBottom: 15,
    },
    actionBtnDisabled: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
        height: 40,
        borderRadius: 7,
        backgroundColor: colors.accentLightGray,
        marginBottom: 15,
    },
    actionBtnText: {
        paddingLeft: 10,
        color: 'white',
        fontFamily: 'Nunito-Bold',
        fontSize: 16,
        letterSpacing: 0
    },
    infoTextLink: {
        color: colors.primaryOldMossGreen,
        fontFamily: 'Nunito-Bold',
        fontSize: 16,
    },
    infoContainer: {
        marginTop: 30,
        alignItems: 'center'
    },
    infoText: {
        color: colors.primaryDavysGray,
        fontFamily: 'Nunito-Regular',
        fontSize: 16
    },
    pickerContainer: {
        marginTop: 12,
        marginBottom: 20,
        borderBottomColor: '#9a9a9a',
        borderBottomWidth: 1.5,
    },
    pickerTitle: {
        marginLeft: 12,
        color: colors.primaryDavysGray,
        fontSize: 19,
        fontFamily: 'Nunito-Regular'
    },
    customInputContainer: {
        marginTop: 12,
        marginBottom: 20,
        borderBottomColor: '#9a9a9a',
        borderBottomWidth: 1.5,
    },
    customInputTitle: {
        marginLeft: 12,
        color: colors.primaryDavysGray,
        fontSize: 12,
        fontFamily: 'Nunito-Regular',
    },
    customInputText: {

    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputsContainer: {
        marginBottom: 10,
        padding: 10,
    },
    input: {
        flex: 1,
        textAlign: 'center',
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 40,
    },
    avatar: {
        flex: 2,
        marginLeft: 20,
        backgroundColor: colors.primarySilver
    },
    saveIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
        height: 40,
        borderRadius: 50,
        backgroundColor: colors.primaryOldMossGreen,
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
    map: {
        margin: 0,
        padding: 0,
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
    getMyLocationIcon: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 2,
        width: 40,
        height: 40,
        textAlign: 'center',
        paddingTop: 4.75,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 2,
    },
    showMeOnMapContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 15,
        bottom: 65,
    },
    showMeOnMapIcon: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 2,
        width: 40,
        height: 40,
        textAlign: 'center',
        paddingTop: 6.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 2,
    },
    m_t_lg: {
        marginTop: 70,
    },
    m_t_md: {
        marginTop: 35,
    },
    m_t_sm: {
        marginTot: 15,
    },
    m_b_lg: {
        marginBottom: 70,
    },
    m_b_md: {
        marginBottom: 35,
    },
    m_b_sm: {
        marginBottom: 15,
    },
    antTagGold: {
        color: '#faad14',
        backgroundColor: '#fffbe6',
        borderWidth: 1,
        borderColor: '#ffe58f',
        fontFamily: 'Nunito-Bold',
    },
    antTagGreen: {
        color: '#52c41a',
        backgroundColor: '#f6ffed',
        borderWidth: 1,
        borderColor: '#b7eb8f',
        fontFamily: 'Nunito-Bold',
    },
    antTagRed: {
        color: '#f5222d',
        backgroundColor: '#fff1f0',
        borderWidth: 1,
        borderColor: '#ffa39e',
        fontFamily: 'Nunito-Bold',
    },
};