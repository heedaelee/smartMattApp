# react-native-simpleheat 라이브러리 링크 내 깃헙에 연결해둠
apk만들때마다 아래 custom한 lib 부분이 초기화 되서.

# 라이브러리 히스토리
21/10/25 @react-native-firebase/app @react-native-firebase/messaging 2개 추가(for Push)

# react-native-simpleheat
라이브러리 내부에 HeatMap.js 파일에 아래와 같이 opacity 값 안주면 app crash 남

const styles = StyleSheet
  .create(
    {
      containerStyle: {
        flex: 1,
      },
      webView: {
        flex: 1,
        opacity:0.99,
        backgroundColor: 'transparent',
      },
    },
  );

또한 타입 제공이 안되므로 index.d.ts파일 만들어야 함 
아래 예시

# node_modules/react-native-simple-time-picker/lib/TimePicker.js 
47행 MAX_HOURS = 23 -> 5로 변경


# 백업 코드
/* '21.6.10 David 
Heatmap.js 모듈 타입 파일이 없어서 타입스크립트 만듦. 아래 ts 형식임.
*/
declare module "react-native-simpleheat" {
  export default class Heatmap extends React.Component<HeatmapProps , any>{}

  interface HeatmapProps {
    WebView: Component<WebViewProps & P>
    data: any[]
    alpha?: number
    radius?: number
    blur?:number
    max?:number
    gradient?:{}
}
}
