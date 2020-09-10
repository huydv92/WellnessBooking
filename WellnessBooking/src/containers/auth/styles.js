import { StyleSheet } from 'react-native';
import { Dimensions, Platform } from 'react-native';
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#fff'
    },
    hwrap: {
        paddingHorizontal: 16
    },
    center: {
        justifyContent: 'center',
        flex: 1
    },
    scrollview: {
        flex: 1,
        paddingBottom: 5,
        justifyContent: 'center'
    },
    separatorWrap: {
        marginTop: 30,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: { width: 80, height: 80 },
    separator: {
        borderBottomWidth: 1,
        flexGrow: 1,
        borderColor: "#E8E8E8"
    },
    forgotWrap: {
        marginVertical: 15,
        alignItems: 'flex-end'
    },
    forgotText: {
        color: "#595959"
    },
    loginText: {
        color: "#00979D",
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonWrap: {
        flexDirection: 'row',
        marginTop: 30
    },
    wrapLogo: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
      },

});