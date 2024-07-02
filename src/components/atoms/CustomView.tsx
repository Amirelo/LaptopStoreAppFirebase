// React and libs
import React from 'react';
import {
  Animated,
  DimensionValue,
  FlexAlignType,
  StyleSheet,
  View,
} from 'react-native';

// Context
import {AuthContext} from '../../screens/Auth/AuthContext';

// Utilities
import {deviceHeight, deviceWidth} from '../../utils/helper';
import {ColorTheme} from '../../preferences/themes/colorTheme';

interface Props {
  children: any;
  preset?: keyof typeof styles;
  marginBottom?: DimensionValue;
  backgroundColor?: keyof (typeof ColorTheme)['light'];
  border?: keyof typeof borderStyles;
  borderColor?: keyof (typeof ColorTheme)['light'];
  alignSelf?: FlexAlignType;
  alignItems?: FlexAlignType
  styles?: any;
}
const AnimatedView = Animated.createAnimatedComponent(View);

const CustomView = (props: Props) => {
  const {theme} = React.useContext(AuthContext);
  const colors = theme;
  const borderColor =
    props.borderColor != null ? colors[props.borderColor] : colors.borderColor;

  return (
    <AnimatedView
      style={[
        {
          backgroundColor: props.backgroundColor != null
          ? colors[props.backgroundColor]
          : colors.backgroundColor,
          borderColor: borderColor,
          alignSelf: props.alignSelf,
          alignItems: props.alignItems,
          marginBottom:
            props.marginBottom != null
              ? props.marginBottom
              : props.preset == null
              ? 0
              : 8,
        },
        props.preset ? styles[props.preset] : styles.container,
        props.border ? borderStyles[props.border] : null,
        props.styles,
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
  main:{
    alignItems: 'center',
    flex: 1,
    paddingTop:'20%',
    paddingHorizontal:'5%'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputrow: {
    flexDirection: 'row',
    width: '100%',
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
    width: deviceWidth,
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
    width: deviceWidth,
    height: deviceHeight * 0.3,
  },
  tab: {
    width: deviceWidth,
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  accountTab: {
    width: deviceWidth,
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

const borderStyles = StyleSheet.create({
  textInput: {borderRadius: 6, borderWidth: 3},
  button: {borderRadius: 10},
  banner: {borderRadius: 20},
  borderOnly: {borderRadius: 0, borderWidth: 3},
});
