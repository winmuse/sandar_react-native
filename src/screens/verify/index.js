
import React, { useEffect } from 'react';
import {
    PixelRatio,
    View,
    Text,
    Dimensions,
    ImageBackground,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import Styles from './style';
import GlobalFont from 'react-native-global-font'
import { WToast } from 'react-native-smart-tip';
import RNFetchBlob from 'rn-fetch-blob'

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

function actuatedNormalize(size) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}

const Verify = (props) => {
    const [first, setFirst] = React.useState("");
    const [second, setSecond] = React.useState("");
    const [third, setThird] = React.useState("");
    const [fourth, setFourth] = React.useState("");
    const [autoFocus1, setAutofocus1] = React.useState(true);
    const [autoFocus2, setAutofocus2] = React.useState(false);
    const [autoFocus3, setAutofocus3] = React.useState(false);
    const [autoFocus4, setAutofocus4] = React.useState(false);
    const [zeroinput, setZeroinput] = React.useState(null);
    const [firstInput, setFirstinput] = React.useState(null);
    const [secondInput, setSecondinput] = React.useState(null);
    const [thirdInput, setThirdinput] = React.useState(null);

    useEffect(() => {
        let fontName = 'Bubble Bobble'
        GlobalFont.applyGlobal(fontName)
    }, [])

    const show = () => {
        const toastOpts = {
            data: 'The secret is not correct.',
            textColor: '#ffffff',
            backgroundColor: '#26ce4f',
            width: "100%",
            duration: WToast.duration.LONG, //1.SHORT 2.LONG
            position: WToast.position.TOP, // 1.TOP 2.CENTER 3.BOTTOM
        }
        WToast.show(toastOpts)
    }

    const resendalert = () => {
        const toastOpts = {
            data: 'The phone number is not correct.',
            textColor: '#ffffff',
            backgroundColor: '#26ce4f',
            width: "100%",
            duration: WToast.duration.LONG, //1.SHORT 2.LONG
            position: WToast.position.TOP, // 1.TOP 2.CENTER 3.BOTTOM
        }

        WToast.show(toastOpts)
    }

    const resendsuccess = () => {
        const toastOpts = {
            data: 'Enter the secret sent to the SMS.',
            textColor: '#ffffff',
            backgroundColor: '#26ce4f',
            width: "100%",
            duration: WToast.duration.LONG, //1.SHORT 2.LONG
            position: WToast.position.TOP, // 1.TOP 2.CENTER 3.BOTTOM
        }

        WToast.show(toastOpts)
    }

    const handlechangefirst = (text) => {
        if (first.length === 0) {
            setFirst(text);
            firstInput.focus();
        }
    }
    const handlechangesecond = (text) => {
        if (second.length === 0) {
            setSecond(text);
            secondInput.focus();
        }
    }
    const handlechangethird = (text) => {
        if (third.length === 0) {
            setThird(text);
            thirdInput.focus();
        }
    }
    const handlechangefourth = (text) => {
        // if (fourth.length === 0) {
        //     setFourth(text);
        //     if (first !== "" && second !== "" && third !== "") {
        //         var secret = first + second + third + text;
        //         const data = {
        //             "ClientId": 24,
        //             "DeviceToken": ApiConfig.devicetoken,
        //             "Secret": secret,
        //             "FBToken": ApiConfig.countrycode,
        //             "TimeZone": ApiConfig.timezone,
        //         }
        //         RNFetchBlob.config({
        //             trusty: true
        //         }).fetch('POST', ApiConfig.url + 'FinishRegistration', {
        //             'Content-Type': 'application/json',
        //             'Transfer-Encoding': 'Chunked'
        //         }, JSON.stringify(data))
        //             .then(res => res.json())
        //             .then(function (res) {
        //                 if (res.status === true) {
        //                     props.ChangePlayerid(res.PlayerId);
        //                     setFirst("");
        //                     setSecond("");
        //                     setThird("");
        //                     setFourth("");
        //                     props.navigation.navigate("Main");
        //                 }
        //                 else {
        //                     show();
        //                     setFirst("");
        //                     setSecond("");
        //                     setThird("");
        //                     setFourth("");
        //                     zeroinput.focus();
        //                 }
        //             })
        //             .catch((errorMessage, statusCode) => {
        //                 console.log("catch--------------->!", errorMessage);
        //             })
        //     }
        //     else {
        //         show();
        //         setFirst("");
        //         setSecond("");
        //         setThird("");
        //         setFourth("");
        //     }
        // }
        alert("Verified!!!")
    }

    const setZeroInputRef = element => {
        setZeroinput(element);
    }
    const setFistInputRef = element => {
        setFirstinput(element);
    };
    const setSecondInputRef = element => {
        setSecondinput(element);
    };
    const setThirdInputRef = element => {
        setThirdinput(element);
    };

    const resend = () => {
        // RNFetchBlob.config({
        //     trusty: true
        // }).fetch('POST', ApiConfig.url + 'StartRegistration', {
        //     'Content-Type': 'application/json',
        //     'Transfer-Encoding': 'Chunked'
        // }, JSON.stringify(props.registerdata))
        //     .then(res => res.json())
        //     .then(function (res) {
        //         if (res.status === true) {
        //             resendsuccess();
        //             zeroinput.focus();
        //         }
        //         else
        //             resendalert();
        //     })
        //     .catch((errorMessage, statusCode) => {
        //         console.log("catch--------------->!", errorMessage);
        //     })
    }

    return (
        <>
            <View style={Styles.container}>
                <ScrollView style={{ height: "100%" }}>
                    <View style={Styles.div}>
                        <View style={Styles.div1}>
                            <Text style={Styles.title1}>Please check your phone number for OTP and enter below</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '60%', justifyContent: 'space-between' }}>
                            <View>
                                <TextInput
                                    autoFocus={autoFocus1}
                                    maxLength={1}
                                    keyboardType="numeric"
                                    ref={setZeroInputRef}
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="#777777"
                                    autoCapitalize="none"
                                    style={Styles.csstext}
                                    value={first}
                                    onChangeText={handlechangefirst}
                                />
                            </View>
                            <View>
                                <TextInput
                                    autoFocus={autoFocus2}
                                    maxLength={1}
                                    keyboardType="numeric"
                                    ref={setFistInputRef}
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="#777777"
                                    autoCapitalize="none"
                                    style={Styles.csstext}
                                    value={second}
                                    onChangeText={handlechangesecond}
                                />
                            </View>
                            <View>
                                <TextInput
                                    autoFocus={autoFocus3}
                                    maxLength={1}
                                    keyboardType="numeric"
                                    ref={setSecondInputRef}
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="#777777"
                                    autoCapitalize="none"
                                    style={Styles.csstext}
                                    value={third}
                                    onChangeText={handlechangethird}
                                />
                            </View>
                            <View>
                                <TextInput
                                    autoFocus={autoFocus4}
                                    maxLength={1}
                                    keyboardType="numeric"
                                    ref={setThirdInputRef}
                                    underlineColorAndroid="transparent"
                                    // placeholder="Full Name"
                                    placeholderTextColor="#777777"
                                    autoCapitalize="none"
                                    style={Styles.csstext}
                                    value={fourth}
                                    onChangeText={handlechangefourth}
                                />
                            </View>
                        </View>
                        <View style={Styles.btnDiv}>
                            <TouchableOpacity style={Styles.btnSignup}
                                onPress={() => { props.navigation.navigate('Verify') }}
                            >
                                <Text style={[Styles.btnTxt, { color: '#fff' }]}>Sign In!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};

export default Verify;