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
/* '21.6.10 David */
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