import React, {useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import images from '../asstes';

const {width} = Dimensions.get('window');
const IMAGE_ASPECT_RATIO = 16 / 9; // Adjust this based on your images
const IMAGE_HEIGHT = width / IMAGE_ASPECT_RATIO; // Dynamic height

const MyCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Carousel
          loop
          width={width}
          height={IMAGE_HEIGHT}
          data={images?.carouselImages}
          autoPlay
          autoPlayInterval={1000}
          scrollAnimationDuration={900}
          onSnapToItem={index => setActiveIndex(index)}
          defaultIndex={activeIndex}
          renderItem={({item}) => {
            return (
              <View style={styles.imageContainer}>
                <Image source={item} style={styles.image} />
              </View>
            );
          }}
        />
        <View style={styles.dotsContainer}>
          {images?.carouselImages.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveIndex(index)}
              style={[
                styles.dot,
                activeIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  carouselContainer: {
    position: 'absolute',
    flex: 1,
    height: '100%',
  },
  imageContainer: {
    width: width,
    height: IMAGE_HEIGHT,
    overflow: 'hidden',
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
  },
  dotsContainer: {
    flexDirection: 'row',
    position: 'relative',
    alignSelf: 'center',
    top: 160,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#fff',
    opacity: 1,
  },
  inactiveDot: {
    backgroundColor: 'gray',
    opacity: 0.5,
  },
});

export default MyCarousel;
