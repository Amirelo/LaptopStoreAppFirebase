// React and libs
import React from 'react';
import {
  StyleSheet,
  Image,
  DimensionValue,
  ColorValue,
  ImageStyle,
  ImageSourcePropType,
  ImageResizeMode,
} from 'react-native';

// Contexts
import {AuthContext} from '../../screens/Auth/AuthContext';

interface Props {
  source: ImageSourcePropType|string;
  preset?: keyof typeof styles;
  marginBottom?: DimensionValue;
  customStyles?: ImageStyle;
  tintColor?: ColorValue;
  width?: DimensionValue;
  resizeMode?: ImageResizeMode;
}

const CustomImage = (props: Props) => {
  const {theme} = React.useContext(AuthContext);
  const colors = theme;

  return (
    <Image
      resizeMode={props.resizeMode ? props.resizeMode : 'cover'}
      source={
        typeof props.source === 'string' ? {uri: props.source} : props.source
      }
      style={[
        {
          marginBottom: props.marginBottom,
          tintColor: props.tintColor ? colors[props.tintColor] : '',
          width: props.width,
        },
        props.preset ? styles[props.preset] : null,
        props.customStyles,
      ]}
    />
  );
};

export default CustomImage;

const styles = StyleSheet.create({
  header: {
    width: 72,
    height: 72,
    borderRadius: 10,
    marginTop: 103,
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginStart: 16,
    marginEnd: 12,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
    position: 'absolute',
  },
  productItem: {
    width: 139,
    height: 112,
    marginTop: 16,
    marginHorizontal: 8,
    alignSelf: 'center',
    borderRadius: 4,
  },
  cartItem: {
    width: 100,
    height: 70,
    alignSelf: 'center',
    marginHorizontal: 4,
  },
  searchBarIcon: {
    width: 24,
    height: 24,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 10,
  },
  productDetail: {
    width: 240,
    height: 200,
    borderRadius: 10,
  },
  headerImage: {
    width: '50%',
    height: 30,
  },
});
