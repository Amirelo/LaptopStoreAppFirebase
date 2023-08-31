import {Animated, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {deviceHeight, deviceWidth} from '../../utils/helper';
import { AuthContext } from '../../screens/Auth/AuthContext';

const CustomView = ({
  children,
  type,
  marginTop,
  backgroundColor,
  borderStyle,
  borderColor,
  scrollable,
  alignSelf,
  animated,
  customStyles,
}) => {
  const {theme} = React.useContext(AuthContext);
  const colors = theme;
  let containerStyle = type ? styles[`container_${type}`] : styles.container;
  backgroundColor =
    backgroundColor != null
      ? colors[`${backgroundColor}Color`]
      : colors.backgroundColor;
  borderColor =
    borderColor != null ? colors[`${borderColor}Color`] : colors.borderColor;
  return scrollable ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container_scrollView}
      style={[
        {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        },

        borderStyle,
        marginTop
          ? {marginTop: marginTop}
          : type == null
          ? {marginTop: 0}
          : {marginTop: 8},
      ]}>
      {children}
    </ScrollView>
  ) : animated ? (
    <Animated.View
      style={[
        {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        },
        containerStyle,
        borderStyle,
        alignSelf ? {alignSelf: alignSelf} : {},
        marginTop != null
          ? {marginTop: marginTop}
          : type == null
          ? {marginTop: 0}
          : {marginTop: 8},
        customStyles ? customStyles : {},
      ]}>
      {children}
    </Animated.View>
  ) : (
    <View
      style={[
        {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        },
        containerStyle,
        borderStyle,
        alignSelf ? {alignSelf: alignSelf} : {},
        marginTop != null ? {marginTop: marginTop} : {marginTop: 0},
      ]}>
      {children}
    </View>
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
  container_scrollView: {
    alignItems: 'center',
    width: deviceWidth,
    paddingBottom: 32,
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
