/* eslint-disable no-array-constructor */
/* eslint-disable prettier/prettier */
import {useFocusEffect} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
//** change require to import  */
import mqtt from '@taoqf/react-native-mqtt';
import React, {useState} from 'react';
import {Alert} from 'react-native';
import Heatmap from 'react-native-simpleheat';
import WebView from 'react-native-webview';
import {useSelectedPatient} from '~/hooks/useReduce';
import {MQTT_ADDR, mqtt_port} from '~/lib/apiSite/apiSite';
import Theme from '../Theme';
import DeviceInfo from 'react-native-device-info';

// var mqtt = require('@taoqf/react-native-mqtt');

// const channel = 4; //채널 임시로 4
let channel = '';

const DefaultWidth = 15;
const DefaultHeight = 30;

//폰
let widthInterval = 20;
let heightInterval = 18;

//탭 :되는 소스
let isTablet = DeviceInfo.isTablet();
if (Theme._WIDTH > 700 && isTablet) {
  widthInterval = 39;
  heightInterval = 27;
}

const widthMargin = 55;
const heightMargin = 35;

const socketCloseInterval = 30; //초단위
let socketAutoClose: NodeJS.Timeout;
const consoleTest = true;

type HeatMapModuleProps = {
  props: {
    navigation: StackNavigationProp<HomeStackNaviParamList>;
    route: RouteProp<HomeStackNaviParamList, any>;
  };
};

function HeatMapModule({props}: HeatMapModuleProps) {
  const {navigation, route} = props;
  // console.log(`HeatMapModule 페이지 랜더링`);
  const [selectedPatientState, setPatientReducer] = useSelectedPatient();
  channel = selectedPatientState.deviceCode;

  //HeatMapModule 안에 정의해도 call은 안하지만, 계속 할당되니 찝찝해서
  //outside에 전역부분에 함수 끄집어 내 정의해서 useState 초기값으로 활용.
  let XYArray: any;
  XYArray = makeFrame(DefaultWidth, DefaultHeight) || [];

  const [data, setData] = useState(XYArray);
  const defaultMaxValue = Theme.heatMap.max;
  const defaultGradient = Theme.heatMap.gradient;

  function makeFrame(width: number, height: number) {
    console.log('makeFrame호출');
    let newArr = new Array();
    let twoDimenArray;

    let testCol0 = 0,
      testCol14 = 0;
    //row 생성 for문
    for (let i = 0; i < height; i++) {
      //col 생성 for문
      let arr = new Array();

      for (let j = 0; j < width; j++) {
        arr[j] = [];
        //x,y 좌표값 insert for문
        for (let k = 0; k < 2; k++) {
          arr[j][0] = widthMargin + j * widthInterval; //x값 i++씩 가산, 0~15까지.
          arr[j][1] = heightMargin + i * heightInterval; //y값
          arr[j][2] = 0;
        }

        //width값 알기 공식
        // if (j === 0) {
        //   console.log(`col가 0일때 가로 첫 좌표 : ${arr[j][0]}`);
        //   testCol0 = arr[j][0];
        // } else if (j === 14) {
        //   console.log(`col가 14일때 가로 첫 좌표 : ${arr[j][0]}`);
        //   testCol14 = arr[j][0];
        //   console.log(`width 값 : ${testCol14 - testCol0}`);
        //   console.log('====================================');
        //   console.log(Theme._WIDTH);
        //   console.log(Theme._HEIGHT);
        //   console.log('====================================');
        // }
        //height값 알기 공식
        // if (i === 0 && j === 0) {
        //   console.log(`row 0일때 세로 첫 좌표 : ${arr[j][1]}`);
        //   testCol0 = arr[j][1];
        // }
        // if (i === 29 && j === 0) {
        //   console.log(`row가 29일때 세로 첫 좌표 : ${arr[j][1]}`);
        //   testCol14 = arr[j][1];
        // }
      }
      newArr.push(arr);
      twoDimenArray = newArr.flat();
      //height 값 알기 공식
      // console.log(testCol14);
      // console.log(testCol0);
      // console.log(`height 값 : ${testCol14 - testCol0}`);
      // console.log('====================================');
      // console.log(Theme._WIDTH);
      // console.log(Theme._HEIGHT);
      // console.log('====================================');
    }
    return twoDimenArray;
  }

  useFocusEffect(
    React.useCallback(() => {
      console.log(`HeatMapModule useFocusEffect 작동`);
      console.log(`channel2 : ${channel}`);
      console.log(`defaultMaxValue2 : ${defaultMaxValue}`);
      // Alert.alert('Screen was focused');
      // Do something when the screen is focused
      let client: any;
      if (channel) {
        client = mqttConnect();
      }

      return () => {
        // Alert.alert('Screen was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        if (client) {
          console.log('MQTT 종료');
          client.end();
        }
        console.log('HeatMapModule 페이지 종료');
        //TODO:  디버그시 setInterval 끄기
        cancelSocketAutoClose();
        //데이터 초기화
        console.log('setData 호출 : 데이터 초기화');
        setData(makeFrame(DefaultWidth, DefaultHeight));

        console.log('setPatientReducer 호출 : 데이터 초기화');
        //환자 선택 초기화
        setPatientReducer({
          deviceCode: '',
          id: '',
          patientName: '',
          patientCondition: '',
          patientImg: '',
        });
      };
    }, []),
  );

  function cancelSocketAutoClose() {
    console.log('소켓 종료 타이머 클리어 호출');
    clearInterval(socketAutoClose);
  }

  function mqttConnect() {
    console.log(`mqtt연결 시도`);
    let socketCount = 1;
    let isReceivng = false;
    let option = {
      port: mqtt_port,
      keepalive: 0,
    };
    let client = mqtt.connect(MQTT_ADDR, option);

    // console.log(client);

    client.on('connect', () => {
      console.log('MQTT connect');
      // let topic = channel + '/status';
      let topic = channel;
      client.subscribe(topic);
    });

    client.on('error', (err: string) => {
      console.log(`소켓 접속 에러 : ${err}`);
    });

    client.on('message', function (topic: any, message: Buffer) {
      socketCount = 1;
      isReceivng = true;
      // message is Buffer
      /* byte방식 */
      // console.log(`${message.toString('utf-8')}`);
      //buffer.toString(encodingType, startNum, length)
      let STX = message.toString('utf-8', 0, 1);
      let ETX = message.toString('utf-8', 901, 902);

      if (consoleTest) {
        console.log(`STX : ${STX}`);
        console.log(`갯수 : ${message.length}`);
        console.log(`ETX : ${ETX}`);
      }

      //받는 데이터 유효성 체크
      //TODO: 유효성 하기 위해서 아두이노에서 DUMMY 쏴야겠다
      if (message.length !== 902) {
        console.log(
          `client message error: message.length 갯수 에러 : ${message.length}개`,
        );
        Alert.alert('메시지 갯수 오류');
        navigation && navigation.goBack();
      }
      if (STX !== 'S') {
        console.log(`client message error: STX 문자 에러, 받은 STX : ${STX}`);
        Alert.alert('STX 문자 없음');
        navigation && navigation.goBack();
      }
      if (ETX !== 'E') {
        console.log(`client message error: ETX 문자 에러, 받은 ETX : ${ETX}`);
        Alert.alert('ETX 문자 없음');
        navigation && navigation.goBack();
      }

      let receivedArray = new Array();

      for (let i = 1; i < message.length - 1; i += 2) {
        //index 확인 로그
        // console.log(`i 값 : ${i}, Array Index : ${(i - 1) / 2}`);
        let value = message.readUInt16BE(i);
        receivedArray[(i - 1) / 2] = value > 10000 ? (value * 2) / 6 : 0;
        //Big엔디안 방식  16bit <- 8bit + 8bit
        //readInt16BE 는 message (즉 byte array)의 [0]과 [1] 두 바이트를 읽고 합친다.
        //16bit를 Big Endian으로 붙여 읽겠다는 함수임. 따라서 index를 0, 2, 4..2n으로 읽음
        //NOTE: -> 변경 21/09/16
        // for문 초기 시작 i = 0에서  i = 1 부터로, 종료조건 i < message.length 에서 message.length -1 로 변경
        // 변경 후, i는 449까지 돌아, receivedArray[224] (=225개 배열) 까지 입력하고 종료함
      }

      //2021/09/11 수정 : 데이터 30row X 15 col X 2byte = 900개

      //과거꺼 백업.(25row x 14col)
      //받은 배열 사용할 값만 분리 25 x 14 size
      //즉 arr에서 row 40번~64번까지, col 1번~ 14번까지 데이터를 추출해야함
      // let result = [];
      // let column = 32;
      // for (let i = 1248; i < receivedArray.length; i += column) {
      //   result.push(receivedArray.slice(i, i + DefaultWidth));
      // }
      // let newResult = result.flat();
      let newResult = receivedArray.flat();

      if (consoleTest) {
        for (let i = 0; i < newResult.length; i += 15) {
          console.log(
            `${newResult[i]} ${newResult[i + 1]} ${newResult[i + 2]} ${
              newResult[i + 3]
            } ${newResult[i + 4]} ${newResult[i + 5]} ${newResult[i + 6]} ${
              newResult[i + 7]
            } ${newResult[i + 8]} ${newResult[i + 9]} ${newResult[i + 10]} ${
              newResult[i + 11]
            } ${newResult[i + 12]} ${newResult[i + 13]} ${newResult[i + 14]}`,
          );
        }
      }

      //실제코드
      for (let i = 0; i < XYArray.length; i++) {
        XYArray[i][2] = newResult[i];
      }
      //불변성에 대해서 좀더 고민해봐야 겠음. 리랜더링이 안됨. slice() 사용시 됨.
      let newState = XYArray.slice();
      // console.log(newState);
      setData(newState);
    });
    //30s 후 자동 소켓 닫음.
    //TODO:  디버그시 setInterval 끄기
    socketAutoClose = setInterval(function () {
      console.log(`소켓 카운트 : ${socketCount}`);
      socketCount++;
      if (socketCount === socketCloseInterval) {
        socketCount = 1;
        isReceivng = false;
        Alert.alert('통신이 종료되었습니다');
        //cancelSocketAutoClose();
        // console.log('소켓 정상 자동 종료');
        // clearInterval(socketAutoClose);
        navigation && navigation.goBack();
      }
    }, 1000);

    return client;
  }

  return (
    <>
      {/* {console.log('HeatMap 상단 리랜더링')} */}
      <Heatmap
        WebView={WebView} // <-- Implementors must define the <WebView/> component!
        data={data}
        alpha={1.3} // <-- Control transparency for overlays!
        radius={18}
        blur={15}
        max={defaultMaxValue}
        gradient={defaultGradient}
      />
    </>
  );
}

export default HeatMapModule;
