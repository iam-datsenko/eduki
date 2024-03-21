/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ParamList} from '../types';
import {useOrientation} from '../hooks/useOrientation';

type Props = NativeStackScreenProps<ParamList, 'Single'>;

const SingleScreen: FC<Props> = ({route}) => {
  const {item} = route.params;
  const orientation = useOrientation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          orientation === 'LANDSCAPE' && {
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        ]}>
        <Image
          source={{uri: item.firstPreviewImage.watermarked}}
          resizeMethod={'scale'}
          resizeMode={'cover'}
          style={[
            styles.image,
            orientation === 'PORTRAIT'
              ? {width: '100%', height: '50%'}
              : {width: '50%', height: '100%'},
          ]}
        />

        <View style={styles.textContainer}>
          <View style={styles.aboutContainer}>
            <View style={styles.innerAboutContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.author}>
                {item.author.details.publicName}
              </Text>
            </View>

            <Text style={styles.price}>{item.price} €</Text>
          </View>

          <Text style={styles.description}>{item.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 16,
  },
  image: {
    width: '100%',
    height: '50%',
    justifyContent: 'flex-end',
    backgroundColor: '#ddd',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'white',
  },
  textContainer: {
    flex: 1,
    gap: 16,
  },
  aboutContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  innerAboutContainer: {
    flex: 1,
    gap: 4,
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
  description: {
    textAlign: 'justify',
  },
});

export default SingleScreen;
