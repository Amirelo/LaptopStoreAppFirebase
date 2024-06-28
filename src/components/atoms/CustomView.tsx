// React and libs
import React from 'react';
import {
  Animated,
  ColorValue,
  DimensionValue,
  FlexAlignType,
  StyleSheet,
  View,
} from 'react-native';

// Context
import {AuthContext} from '../../screens/Auth/AuthContext';

// Utilities
import {deviceHeight, deviceWidth} from '../../utils/helper';

interface Props {
  children?: any;
  type?: keyof typeof styles;
  marginTop?: DimensionValue;
  backgroundColor?: ColorValue;
  borderStyle?: any;
  borderColor?: ColorValue;
  alignSelf?: FlexAlignType;
  customStyles?: any;
}

const CustomView = (props: Props) => {
  const {theme} = React.useContext(AuthContext);
  const colors = theme;
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
        props.type ? styles[props.type] : styles.container,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputrow: {
    flexDirection: 'row',
    width: deviceWidth * 0.9,
    height: 48,
    alignItems: 'center',
  },
  rowJustify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  rowJustify90: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  rowJustify90Screen: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: deviceWidth * 0.9,
  },
  left: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    flex: 1,
  },
  right: {
    alignSelf: 'flex-end',
    paddingEnd: '5%',
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  banner: {
    width: deviceWidth * 0.9,
    height: deviceHeight * 0.3,
  },
  tab: {
    width: deviceWidth * 0.9,
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  accountTab: {
    width: deviceWidth * 0.9,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  absolute: {
    width: deviceWidth,
    position: 'absolute',
    height: '100%',
    backgroundColor: '#00000020',
  },
  absoluteBottomItem: {
    width: '100%',
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0,
  },
  none: {},
});
