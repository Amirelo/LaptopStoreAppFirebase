import { ColorValue, DimensionValue, FlexAlignType, ScrollView, StyleSheet } from "react-native"
import { deviceWidth } from "../../utils/helper"

interface Props{
    children?: any,
    marginTop?: DimensionValue,
    backgroundColor?: ColorValue,
    borderColor?: ColorValue,
  }

const CustomScroll = (props:Props) =>{
    return(
<ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container_scrollView}
      style={[
        {
          backgroundColor: props.backgroundColor,
          borderColor: props.borderColor,
          marginTop: props.marginTop
          ? props.marginTop
          : 8,

        },

       
      ]}>
      {props.children}
    </ScrollView>
    )
}

export default CustomScroll

const styles = StyleSheet.create({
    container_scrollView: {
        alignItems: 'center',
        width: deviceWidth,
        paddingBottom: 32,
      },
})