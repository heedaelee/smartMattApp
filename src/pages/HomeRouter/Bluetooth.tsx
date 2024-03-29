/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import BluetoothTemplate from '~/components/templates/HomeRouter/Bluetooth/BluetoothTemplate';
import useInput from '~/hooks/useInput';
import useBoolean from '~/hooks/useBoolean';
import {Alert, Platform} from 'react-native';
import base64 from 'base-64'; //base 64 인코딩
import {BleManager} from 'react-native-ble-plx';

type BluetoothProps = {
  navigation: StackNavigationProp<HomeStackNaviParamList, 'Bluetooth'>;
};

type bleReceivedDataType = {
  PASS: string;
  SSID: string;
  IP?: string;
  CODE?: string;
};

let finalDevice: any,
  deviceID: any,
  scanedDevice: any,
  isPower: boolean = false;

const BLE_SEREVER_NAME = 'Matt';
const manager = new BleManager();

const Bluetooth = ({navigation}: BluetoothProps) => {
  /* TODO: BLE 모듈 5/19 ~  
    TODO: 추후 BLE데이터 받아오기.
  */

  const [ssid, setSsid] = useInput('');
  const [ssidPassword, setSsidPassword] = useInput('');

  //수정/조회 토글
  const [isEdit, setIsEdit] = useBoolean(false);
  //블루투스 연결 토글
  const [isBleConn, setIsBleConn] = useBoolean(false);
  //블루투스 파워
  const [power, setPower] = useBoolean(false);
  //BLE 수신 데이터
  const [bleData, setBledata] = useInput('');

  //유효성
  const [isSsid, setIsSsid] = useBoolean(false);
  const [isSsidPassword, setIsSsidPassword] = useBoolean(false);

  console.log('Bluetooth.tsx 랜더링과');
  console.log(`값체크 SSID : ${ssid} PASS : ${ssidPassword} `);

  //BLE 꺼지면..
  // if (!isBleConn) {
  //   console.log('BLE 꺼짐 -> initializer() 호출');
  //   initializer();
  // }
  //상태 초기화
  function initializer() {
    if (finalDevice) {
      finalDevice = null;
    }
    if (isEdit) {
      setIsEdit(false);
    }
    if (isBleConn) {
      setIsBleConn(false);
    }
    if (ssid) {
      setSsid('');
    }
    if (ssidPassword) {
      setSsidPassword('');
    }
  }

  useEffect(() => {
    console.log(`useEffect 탐_ refreshed`);
    console.log(finalDevice);
    console.log(power);

    finalDevice ? setIsBleConn(true) : setIsBleConn(false);

    if (!power) isPowered();

    //power on && Device 객체 없을시..
    if (power && !finalDevice) {
      console.log('스캔함수');
      scanAndConnect();
    }
    //컴포넌트 unmount시 초기화 함수 호출
    return initializer();
  }, [power]);

  //BLE 파워 연결 함수
  const isPowered = () => {
    const subscription = manager.onStateChange(state => {
      if (state === 'PoweredOn') {
        console.log(`블루투스 파워가 켜졌습니다`);
        isPower = true; //탭 switch 후에도 유지되는 flag 위해..
        setPower(true); //react 리랜더링용
      } else {
        console.log('파워 꺼짐');
        //power off
        finalDevice = null;
        isPower = false;
        setIsBleConn(false); //당연히 also Conn false
        setPower(false);
      }
    }, true);
  };

  //BLE Scan & Connect 함수
  let startTime: any = new Date();
  let endTime: any; //페이지 리랜더링마다 초기화
  const scanAndConnect = () => {
    try {
      manager.startDeviceScan(null, null, (error, device) => {
        console.log(`스캔을 시작합니다.`);
        endTime = new Date();
        let timeDiff: any = endTime - startTime; //in ms
        // strip the ms
        timeDiff /= 1000;
        // get seconds
        let seconds = Math.round(timeDiff);

        if (seconds > 5) {
          console.log('스캔 중지');
          manager.stopDeviceScan(); //stop scanning if more than 5 secs passed
        }

        if (error) {
          console.log(error);
          return;
        }
        if (finalDevice) {
          console.log('finalDevice 존재');
          manager.stopDeviceScan();
          return;
        }
        if (device) {
          if (device.name === BLE_SEREVER_NAME) {
            console.log(`디바이스 찾음 : ${device.name}`);
            manager.stopDeviceScan(); // 스캔 멈추기
            console.log('scanAndConnect() : scan complete');

            scanedDevice = device;
            console.log('try to connect');

            device
              .connect({requestMTU: 100})
              .then(device => {
                //연결된 device 객체 set
                deviceID = device.id;
                device.isConnected().then(res => {
                  console.log(`isConnected? : ${res}`);
                });
                return device.discoverAllServicesAndCharacteristics();
              })
              .then(async dev => {
                console.log('success to connect');
                finalDevice = dev;
                let bleReceivedData: bleReceivedDataType;
                let services = await dev.services();

                for (let service of services) {
                  console.log(`서비스 uuid:  ${service.uuid}`);
                  if (service.uuid === '8183d256-b358-4c62-a487-d2e7429bfc39') {
                    await service
                      .readCharacteristic('61661f32-bc34-4513-a43d-20c2f3970829')
                      .then((res: any) => {
                        console.log(`res.value : ${res.value}`);
                        bleReceivedData = JSON.parse(base64.decode(res.value));

                        console.log(
                          'BLE 최종 성공 setIsBleConn,setSsid,setSsidPassword 호출',
                        );
                        console.log(bleReceivedData);
                        setIsBleConn(true);
                        if (bleReceivedData) {
                          if (bleReceivedData.SSID) {
                            console.log(`bleData.SSID 탄다 값 : ${bleReceivedData.SSID}`);
                            setSsid(bleReceivedData.SSID);
                          }
                          if (bleReceivedData.PASS) {
                            console.log(`bleData.PASS 탄다 값 : ${bleReceivedData.PASS}`);
                            setSsidPassword(bleReceivedData.PASS);
                          }
                        }
                      })
                      .catch(error => {
                        console.log(`service.readCharacteristic 에러 : ${error}`);
                      });
                  }
                }
              })
              .catch(error => {
                console.log(`접속 에러 : ${error}`);
              });
          }
        } else {
          console.log('manager.startDeviceSCan에서 device 객체 존재 X');
        }
      });
    } catch (error) {
      console.log(`manager.startDeviceScan 에서 에러 catch : ${JSON.stringify(error)}`);
    }
  };

  const submitToMatt = () => {
    if (!isBleConn) {
      Alert.alert('블루투스가 연결되어 있지 않습니다');
      return;
    }

    //접속 살아있는지 체크.
    console.log('접속 살아있는지 체크');
    console.log(`DeviceID : ${deviceID}`);
    manager
      .isDeviceConnected(deviceID)
      .then(res => console.log(`isDeviceConected ${res}`));

    let serviceUUID = '8183d256-b358-4c62-a487-d2e7429bfc39';
    let CharacteristicUUID_write = '61661f33-bc34-4513-a43d-20c2f3970829';
    console.log(`ssid: ${ssid} pass: ${ssidPassword}`);
    let dataToSend = `SSID:${ssid}PASS:${ssidPassword}`;

    // 1. 상세 || 수정 페이지
    if (isSsid && isSsidPassword && isEdit) {
      // 2-1. 수정페이지만

      //그러니까 연결된 최종 device 객체를 가지고 다니며 사용하면 되는거였다. 전역으로
      finalDevice.writeCharacteristicWithResponseForService(
        serviceUUID,
        CharacteristicUUID_write,
        base64.encode(dataToSend),
      );
      /** 유저가 시리얼 코드 변경 하면 안되므로 CODE는 일단 전송 취소 */
      // .then(() => {
      //   return finalDevice.writeCharacteristicWithResponseForService(
      //     serviceUUID,
      //     CharacteristicUUID_write,
      //     base64.encode(CODE),
      //   );
      // });
    }
    initializer();
    // 2-2. 상세페이지는 바로 여기
    navigation.navigate('BottomNaviRouter', {
      screen: '홈',
    });
  };

  //Wifi password encrypted
  const encryptedPassword = () => {
    const passCnt = ssidPassword.length;
    let newPassword = '';
    for (let i = 0; i < passCnt; i++) {
      newPassword += '*';
    }
    return newPassword;
  };

  const NewEncryptedPassword = encryptedPassword();
  console.log(`#254 행 ${ssid} , New : ${NewEncryptedPassword} `);
  //수정페이지로 전환
  const goToEditPage = () => {
    setIsEdit(true);
  };

  return (
    <BluetoothTemplate
      navigation={navigation}
      state={{
        isBleConn,
        ssid,
        ssidPassword,
        NewEncryptedPassword,
        isEdit,
      }}
      setState={{
        setIsBleConn,
        setSsid,
        setSsidPassword,
        setIsEdit,
      }}
      validation={{
        ssid: {isSsid, setIsSsid},
        ssidPassword: {isSsidPassword, setIsSsidPassword},
      }}
      goToEditPage={goToEditPage}
      submitToMatt={submitToMatt}
    />
  );
};

export default Bluetooth;
