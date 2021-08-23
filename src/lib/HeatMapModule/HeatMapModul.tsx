/* eslint-disable no-array-constructor */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import Heatmap from 'react-native-simpleheat';
import WebView from 'react-native-webview';
import Theme from '../Theme';
import {useLoggedUser, useSelectedPatient} from '~/hooks/useReduce';
import {useFocusEffect} from '@react-navigation/native';
import {Alert} from 'react-native';
import {MQTT_ADDR, mqtt_port} from '~/lib/apiSite/apiSite';

//** change require to import  */
import mqtt from '@taoqf/react-native-mqtt';
// var mqtt = require('@taoqf/react-native-mqtt');

// const channel = 4; //채널 임시로 4
let channel = '';

const DefaultWidth = 14;
const DefaultHeight = 25;
const interval = 20;
const widthMargin = 20;
const heightMargin = 50;

//HeatMapModule 안에 정의해도 call은 안하지만, 계속 할당되니 찝찝해서
//outside에 전역부분에 함수 끄집어 내 정의해서 useState 초기값으로 활용.
let XYArray: any;
XYArray = makeFrame(DefaultWidth, DefaultHeight) || [];

function makeFrame(width: number, height: number) {
  console.log('frame작동');
  let newArr = new Array();
  let twoDimenArray;
  //row 생성 for문
  for (let i = 0; i < height; i++) {
    //col 생성 for문
    let arr = new Array();
    for (let j = 0; j < width; j++) {
      arr[j] = [];
      //x,y 좌표값 insert for문
      for (let k = 0; k < 2; k++) {
        arr[j][0] = widthMargin + j * interval; //x값 i++씩 가산, 0~31까지.
        arr[j][1] = heightMargin + i * interval; //y값
        arr[j][2] = 0;
      }
    }
    newArr.push(arr);
    twoDimenArray = newArr.flat();
  }
  return twoDimenArray;
}

function HeatMapModule() {
  console.log(`HeatMapModule 페이지 랜더링`);
  const [selectedPatientState, setPatientReducer] = useSelectedPatient();
  console.log(`top deviceCode : ${selectedPatientState.deviceCode}`);
  channel = selectedPatientState.deviceCode;
  const [data, setData] = useState(XYArray);
  // const [conn, setConn] = useState(false);
  const defaultMaxValue = Theme.heatMap.max;
  const defaultGradient = Theme.heatMap.gradient;
  console.log(`channel : ${channel}`);
  console.log(`defaultMaxValue : ${defaultMaxValue}`);

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
      };
    }, []),
  );

  function mqttConnect() {
    console.log(`mqtt연결 시도`);
    let option = {
      port: mqtt_port,
      keepalive: 0,
    };
    let client = mqtt.connect(MQTT_ADDR, option);

    console.dir(client);

    client.on('connect', () => {
      console.log('MQTT connect');
      // let topic = channel + '/status';
      let topic = channel;
      client.subscribe(topic);
    });

    client.on('error', (err: string) => {
      console.log(`소켓 접속 에러 : ${err}`);
    });

    client.on('message', function (topic: any, message: any) {
      // message is Buffer
      /* byte방식 */
      console.log(`${message.toString()}`);

      /**
      TODO: 잠시만 주석 처리 8/17
       
      // let receivedArray = new Array();
      // for (let i = 0; i < message.length; i += 2) {
      //   receivedArray[i / 2] = message.readInt16BE(i);
      //   //Big엔디안 방식  16bit <- 8bit + 8bit
      //   //readInt16BE 는 message (즉 byte array)의 [0]과 [1] 두 바이트를 읽고 합친다.
      //   //16bit를 Big Endian으로 붙여 읽겠다는 함수임. 따라서 index를 0, 2, 4..2n으로 읽음
      // }

      //수신 데이터 확인용
      // if(receivedArray.length === 2048){
      //     for (let i = 0; i < receivedArray.length; i+=32) {
      //       console.log(`${receivedArray[i]} ${receivedArray[i+1]} ${receivedArray[i+2]} ${receivedArray[i+3]} ${receivedArray[i+4]} ${receivedArray[i+5]} ${receivedArray[i+6]} ${receivedArray[i+7]} ${receivedArray[i+8]} ${receivedArray[i+9]} ${receivedArray[i+10]} ${receivedArray[i+11]} ${receivedArray[i+12]} ${receivedArray[i+13]}  ${receivedArray[i+14]} ${receivedArray[i+15]} ${receivedArray[i+16]} ${receivedArray[i+17]} ${receivedArray[i+18]} ${receivedArray[i+19]} ${receivedArray[i+20]} ${receivedArray[i+21]} ${receivedArray[i+22]} ${receivedArray[i+23]} ${receivedArray[i+24]} ${receivedArray[i+25]} ${receivedArray[i+26]} ${receivedArray[i+27]} ${receivedArray[i+28]} ${receivedArray[i+29]} ${receivedArray[i+30]} ${receivedArray[i+31]}`);
      //     }
      //   }

      //받은 배열 사용할 값만 분리 25 x 14 size
      //즉 arr에서 row 40번~64번까지, col 1번~ 14번까지 데이터를 추출해야함
      let result = [];
      let column = 32;
      for (let i = 1248; i < receivedArray.length; i += column) {
        result.push(receivedArray.slice(i, i + DefaultWidth));
      }
      let newResult = result.flat();

      //조작 데이터 확인용
      // for (let i = 0; i < newResult.length; i+=14) {
      //     console.log(`${newResult[i]} ${newResult[i+1]} ${newResult[i+2]} ${newResult[i+3]} ${newResult[i+4]} ${newResult[i+5]} ${newResult[i+6]} ${newResult[i+7]} ${newResult[i+8]} ${newResult[i+9]} ${newResult[i+10]} ${newResult[i+11]} ${newResult[i+12]} ${newResult[i+13]}`);
      //   }

      //실제코드
      for (let i = 0; i < XYArray.length; i++) {
        XYArray[i][2] = newResult[i];
      }
      //불변성에 대해서 좀더 고민해봐야 겠음. 리랜더링이 안됨. slice() 사용시 됨.
      let newState = XYArray.slice();
      // console.log(newState);

      setData(newState);
       */
    });
    return client;
  }

  return (
    <>
      {console.log('HeatMap 상단 리랜더링')}
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
