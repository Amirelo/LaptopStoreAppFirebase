// React and libs
import {
  ColorValue,
  ScrollView,
  StyleSheet,
} from 'react-native';

// Utilities
import {deviceWidth} from '../../utils/helper';

interface Props {
  children: any;
  backgroundColor?: ColorValue;
}

const CustomScroll = (props: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container_scrollView}
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
});
