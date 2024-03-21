/* eslint-disable react-native/no-inline-styles */
import React, {FC, memo} from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {Material, ParamList} from '../types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useOrientation} from '../hooks/useOrientation';

type Props = {
  item: Material;
  isEven: boolean;
};

const MaterialCard: FC<Props> = memo(
  ({item, isEven}) => {
    const orientation = useOrientation();
    const {width} = useWindowDimensions();
    const cardWidth = (width - 16 * 3) / 2;
    const navigation = useNavigation<NativeStackNavigationProp<ParamList>>();

    return (
      <Pressable
        style={[
          styles.wrapper,
          {
            width: orientation === 'PORTRAIT' ? '100%' : cardWidth,
            marginRight: orientation === 'LANDSCAPE' && isEven ? 0 : 16,
          },
        ]}
        onPress={() => navigation.navigate('Single', {item})}>
        <ImageBackground
          source={{uri: item.firstPreviewImage.watermarked}}
          resizeMethod={'scale'}
          resizeMode={'cover'}
          style={styles.image}>
          <View style={styles.container}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.author.details.publicName}</Text>
            <Text style={styles.price}>{item.price} €</Text>
          </View>
        </ImageBackground>
      </Pressable>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.item.id === nextProps.item.id;
  },
);

const styles = StyleSheet.create({
  wrapper: {
    height: 400,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#ddd',
  },
  container: {
    gap: 4,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  author: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default MaterialCard;
