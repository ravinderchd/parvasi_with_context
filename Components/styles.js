import styled from 'styled-components';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { View, Text, Image, TouchableOpacity , Dimensions} from 'react-native';

//Colors defination
export const devideId = Device.osName;
export const devideOS = Device.osName;

const statusBarHeight = Constants.statusBarHeight;
export const Colors = {
    primary: '#ffffff',
    secondary: 'grey',
    tertiary: 'red',
    darkLight: '#9CA3AF',
    brand: '#6D28D9',
    green : '#10B981',
    red : '#Ef4444',
    formLabel: '#dddddd',
    black: '#111111',
    light: "#fff",
    buttonBgColor: '#E03B41',
    grey: '#888888',
};


const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;


export const LoginHeader = styled.Text `
    font-size:30px;
    text-align: center;
  
    font-weight:bold;
    height:50px;
    width:100%;
    font-family: 'Roboto-Regular';
`;
export const StyledContainer = styled.View`
    flex:1;
    flex-direction: column ;
    padding: 15px;
    background-color: ${primary};
    padding-top: ${statusBarHeight +10 }px;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-width: 0;
 `;
 export const StyledContainer1 = styled.View`
    flex:1;
    flex-direction: column ;
    padding: 5px;
    /* background-color: ${primary}; */
    padding-top: ${statusBarHeight +10 }px;
    justify-content: center;
    align-items: center;
 
    height: 100%;
 `;

export const InnerContainters = styled.View`
   
    width:100%;
    
    align-items: center; 
  
`;
export const InfoText = styled.Text`
    color: ${Colors.grey};
    font-size: 14px;
    text-align: center;
`;
export const WelcomeContainer = styled(InnerContainters)`
    padding:25px;
    padding-top: 30px;
    justify-content: center ;
    align-items: center;

    
   
`;
export const PageLogo = styled.Image`
    height:70px;
    width: 250px;
    z-index:0;
`;

export const Avatar = styled.Image`
    width: 100px;
    
    height: 100px;
    border-radius: 50px;
    border-color: ${Colors.brand};
    border-width: 2px ;
    margin-top:10px;
    margin-bottom:10px ;


`;

export const WelcomeImage = styled.Image`
    height:50%;
    min-width: 10%;
    
`;


export const PageTitle = styled.Text`
    font-size:20px;
    text-align: center;
    font-weight: bold;
    color: ${brand};

    ${(props) => props.welcome && `font-size: 25px`}
`;

export const SubTitle = styled.Text`
    font-size:18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight:bold;

    text-align: center;
    font-weight: bold;
    color: ${secondary};

    ${(props) => props.welcome && `margin-bottom:5px;font-weight:normal;`}
`;
export const StyledFormArea = styled.View`
    width: 90%;
    /* border:2px solid #ff0000; */
    
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${Colors.light};
    padding:1px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    border: 1px solid #000000;
    border-radius: 10px;
    height: 42px;
    margin-top:10px;

 
`;

export const StyledInputLable = styled.Text `
    font-size:24px;
    color: ${tertiary};
    text-align: left;


`;
export const MsgBox = styled.Text`
    text-align: center ;
    font-size: 13px;
    margin-top: 18px;
    color: ${(props) => props.type == 'SUCCESS' ? green : red};
`;
export const LeftIcon = styled.View`
    left: 10px;
    top:18px;
    position: absolute;
    z-index:1;
  
`;

export const RightIcon = styled.TouchableOpacity `
    right: 15px;
    top:18px;
    position: absolute;
    z-index:1;
`;
export const RightText = styled.TouchableOpacity `
    right: 45px;
    top:18px;
    position: absolute;
    z-index:1;
`;
export const StyledButton = styled.TouchableOpacity `
    padding:15px;
    background-color: ${Colors.buttonBgColor};
    justify-content: center;
    border-radius: 10px;
  
    height: 60px;
    align-items: center;
    ${(props) => props.google == true && `'background-color' = '#ff0000'`}
`;

export const ButtonText = styled.Text `
    color: ${primary};
    font-size: 16px;
`;

export const StyledLine = styled.TouchableOpacity`
    background-color: ${Colors.black};
    height: 1px;
    z-index:1;
    /* margin-top: 40px; */

`;

export const ExtraText = styled.Text`
    margin-right:10px ;
`
export const TextLink = styled.Text`
    color: red;

`;

export const TopHalf = styled.View `
    flex:1;
    justify-content: center ;
    align-items:center;

`;
export const CodeInputContainer = styled.Pressable`
    width: 70% ;
    flex-direction: row;
    justify-content: space-between ;
`;
export const CodeInput = styled.View`
    border-color: ${Colors.grey} ;
    min-width: 15% ;
    border-width: 2px;
    border-radius: 5px ;
    padding: 12px;
    

`;
export const CodeInputText = styled.Text`
    font-size: 22px;
    font-weight: bold;
    text-align: center ;
    color: ${Colors.brand};
`;
export const CodeInputFocused = styled(CodeInput)`
    border-color: ${Colors.green} ;
`;

export const BottomHalf = styled.View `

`;
export const ExtraView = styled.View`
    justify-content:center ;
    flex-direction:row ;
    align-items:center;
    padding:10px;
  
`;
export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
 const phoneNumberMask = [
  "(",
  /[1-9]/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/
];











