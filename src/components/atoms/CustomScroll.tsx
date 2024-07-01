// React and libs
import {ColorValue, ScrollView, StyleSheet} from 'react-native';

// Utilities
import {deviceWidth} from '../../utils/helper';

interface Props {
  children: any;
  backgroundColor?: ColorValue;
  main?: boolean;
}

const CustomScroll = (props: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.container_scrollView,
        props.main ? styles.main : null,
      ]}
      style={[
        {
          backgroundColor: props.backgroundColor,
        },
      ]}>
      {props.children}
    </ScrollView>
  );
};

export default CustomScroll;

const styles = StyleSheet.create({
  container_scrollView: {
    alignItems: 'center',
    width: deviceWidth,
    paddingBottom: 32,
  },
  main: {
    paddingTop: '15%',
    paddingHorizontal: '5%',
  },
});
