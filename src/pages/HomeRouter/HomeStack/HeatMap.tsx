/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeatMapModule from '~/lib/HeatMapModule/HeatMapModul';
import Theme from '~/lib/Theme';

const _WIDTH = Theme._WIDTH;
const _HEIGHT = Theme._HEIGHT;
const defaultGradient = Theme.heatMap.gradient;
const defaultMaxValue = Theme.heatMap.max;

const HeatMap = ({}) => {
  console.log('HeatMap 페이지 랜더링')

  /*Context 사용 Gradient 값 가져오기 */
  //key array 추출
  const keyArr = Object.keys(defaultGradient);
  //number화
  const keyArrNumbered = keyArr.map(i => Number(i));
  //내림차순
  keyArrNumbered.sort((a, b) => b - a);
  let finArr = [];

  //내림차순으로 추출된 gradient key,
  //RN의 heatMap Gradient(0(Blue)~1(Red)) 방식에서 -> LinearGradient(0(Red)~1(Blue))방식으로 변경
  //for문 돌리며, 내림차순이니 각 요소별 차이를, 배열 만들어서
  //하나하나 누적시키며 배열[] 에 push해주면 됨.
  for (let i = 0; i < keyArrNumbered.length - 1; i++) {
    //요소 차
    let diff = +(keyArrNumbered[i] - keyArrNumbered[i + 1]).toFixed(1);
    //console.log(diff);
    //첫번째 값은 그래도 push
    if (!finArr[finArr.length - 1]) {
      finArr.push(diff);
    } else {
      // console.log(
      //   `${finArr[finArr.length - 1]} + ${diff} = ${(
      //     finArr[finArr.length - 1] + diff
      //   ).toFixed(1)}`,
      // );
      //두번쨰 값부터 diff를 누적해줌. 그리고 Number화
      let numberShouldBeFixed = 0;
      numberShouldBeFixed = finArr[finArr.length - 1] + diff;
      // console.log(Number(numberShouldBeFixed.toFixed(1)));
      finArr.push(Number(numberShouldBeFixed.toFixed(1)));
    }
  }
  //끝자리는 요소 1를 push
  finArr.push(1);
  // console.log('finArr : ');
  // console.log(finArr);

  useEffect(() => {
    console.log(`HeatMap useEffect 콜`);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.HeatmapView}>
        <HeatMapModule />
      </View>

      {/* 그레데이션 5가지 소수점 & 정수 state로 주고 LinearGradient랑 heatmap 같이 사용하면 되겠다! */}
      <View style={styles.GradationContainer}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          // locations={[0.2, 0.3, 0.4, 0.2, 1]}
          locations={finArr}
          colors={[
            'rgb(255,0,0)',
            'rgb(255,255,0)',
            'rgb(0,255,0)',
            'rgb(0,255,255)',
            'rgb(0,0,255)',
          ]}
          style={styles.linearGradient}
        />
        <View style={styles.colorBar4}>
          <View style={{width: 5, height: 1, borderWidth: 0.7}} />
          <Text style={{fontSize: _WIDTH / 45}}>
            {Math.round((defaultMaxValue * 3) / 4)}
          </Text>
        </View>
        <View style={styles.colorBar3}>
          <View style={{width: 5, height: 1, borderWidth: 0.7}} />
          <Text style={{fontSize: _WIDTH / 45}}>
            {Math.round((defaultMaxValue * 2) / 4)}
          </Text>
        </View>
        <View style={styles.colorBar2}>
          <View style={{width: 5, height: 1, borderWidth: 0.7}} />
          <Text style={{fontSize: _WIDTH / 45}}>
            {Math.round((defaultMaxValue * 1) / 4)}
          </Text>
        </View>
        <View style={styles.colorBar1}>
          <View style={{width: 5, height: 1, borderWidth: 0.7}} />
          <Text style={{fontSize: _WIDTH / 45}}>0</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'row'},
  HeatmapView: {flex: 14},
  GradationContainer: {flex: 1, height: '90%', justifyContent: 'center'},
  linearGradient: {top: '2%', width: '20%', height: '90%'},
  colorBar1: {
    position: 'absolute',
    top: '95%',
    left: '20%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorBar2: {
    position: 'absolute',
    top: '72.6%',
    left: '20%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorBar3: {
    position: 'absolute',
    top: '50.4%',
    left: '20%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorBar4: {
    position: 'absolute',
    top: '28.2%',
    left: '20%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorBar5: {
    position: 'absolute',
    top: '6%',
    left: '20%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HeatMap;
