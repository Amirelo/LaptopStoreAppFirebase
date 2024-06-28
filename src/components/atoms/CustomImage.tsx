import {StyleSheet, Image, DimensionValue, ColorValue, ImageStyle, ImageSourcePropType} from 'react-native';
import React from 'react';
import {AuthContext} from '../../screens/Auth/AuthContext';

interface Props{
  source: ImageSourcePropType|undefined,
  type?: keyof typeof styles,
  marginTop ?: DimensionValue,
  customStyles?: ImageStyle,
  linkType?: 'uri' | null,
  tintColor?: ColorValue,
  width?: DimensionValue,
  resizeMode?: ImageStyle['resizeMode'],
}

const CustomImage = (
  props:Props
) => {
  const {theme} = React.useContext(AuthContext);
  const colors = theme;
  const tintColor = props.tintColor ? colors[`${String(props.tintColor)}Color`] : '';
  return (
    typeof props.source === 'string' ?
    <Image
      
      resizeMode={props.resizeMode ? props.resizeMode : 'cover'}
      source={{uri: props.source}}
      style={[{
        marginTop: props.marginTop,
        tintColor: tintColor,
        width: props.width,
      },
        props.type ? styles[props.type] : null,
        props.customStyles
      ]}
    />

    :
    <Image
      
      resizeMode={props.resizeMode ? props.resizeMode : 'cover'}
      source={props.source}
      style={[{
        marginTop: props.marginTop,
        tintColor: tintColor,
        width: props.width,
      },
        props.type ? styles[props.type] : null,
        props.customStyles
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
