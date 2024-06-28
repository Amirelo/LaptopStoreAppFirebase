import {
  Animated,
  ColorValue,
  DimensionValue,
  FlexAlignType,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {deviceHeight, deviceWidth} from '../../utils/helper';
import {AuthContext} from '../../screens/Auth/AuthContext';

interface Props {
  children?: any;
  type?: keyof typeof styles;
  marginTop?: DimensionValue;
  backgroundColor?: ColorValue;
  borderStyle?: any;
  borderColor?: ColorValue;
  scrollable?: boolean;
  alignSelf?: FlexAlignType;
  customStyles?: any;
}

const CustomView = (props: Props) => {
  const {theme} = React.useContext(AuthContext);
  const colors = theme;
  let containerStyle = props.type ? styles[props.type] : styles.container;
  const backgroundColor =
    props.backgroundColor != null
      ? colors[`${String(props.backgroundColor)}Color`]
      : colors.backgroundColor;
  const borderColor =
    props.borderColor != null
      ? colors[`${String(props.borderColor)}Color`]
      : colors.borderColor;

  const AnimatedView = Animated.createAnimatedComponent(View);
  return (
    <AnimatedView
      style={[
        {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          alignSelf: props.alignSelf,
          marginTop:
            props.marginTop != null
              ? props.marginTop
              : props.type == null
              ? 0
              : 8,
        },
        containerStyle,
        props.borderStyle,
        props.customStyles,
      ]}>
      {props.children}
    </AnimatedView>
  );
};

export default CustomView;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  container_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container_inputrow: {
    flexDirection: 'row',
    width: deviceWidth * 0.9,
    height: 48,
    alignItems: 'center',
  },
  container_rowJustify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  container_rowJustify90: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  container_rowJustify90Screen: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: deviceWidth * 0.9,
  },
  container_left: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    flex: 1,
  },
  container_right: {
    alignSelf: 'flex-end',
    paddingEnd: '5%',
    flex: 1,
  },

  container_header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  container_banner: {
    width: deviceWidth * 0.9,
    height: deviceHeight * 0.3,
  },
  container_tab: {
    width: deviceWidth * 0.9,
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  container_accountTab: {
    width: deviceWidth * 0.9,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  container_absolute: {
    width: deviceWidth,
    position: 'absolute',
    height: '100%',
    backgroundColor: '#00000020',
  },
  container_absoluteBottomItem: {
    width: '100%',
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0,
  },
  container_none: {},
});
