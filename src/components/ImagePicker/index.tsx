import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image as ImageNative,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import MultipleImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import ActionSheet from 'react-native-actionsheet';
import async from 'async';
import ButtonView from '../ButtonView';
import styles from './style';
import {Metrics, Colors, Fonts} from '../../theme';
import utils from '../../utils';
import {strings} from '../../i18n';
import Config from 'react-native-config';

type ImagePickerProps = {
  source: any;
  onImagePicked: (image: any) => void;
  imageStyle?: ImageStyle;
  iconStyle?: ViewStyle;
  iconContainerStyle?: ViewStyle;
  containerStyle?: ViewStyle | ViewStyle[];
  isMultiple?: boolean;
  isCropping?: boolean;
  hideActionSheet?: boolean;
  smallIcon?: any;
  renderCarRepairView?: boolean;
};

const resizeImageHandling = (
  selectedData: any,
  callback: (image: any) => void,
) => {
  let calculatedWidth = 720;
  let calculatedHeight = 480;

  if (selectedData.width && selectedData.height) {
    if (selectedData.width < 720) {
      calculatedWidth = selectedData.width;
      calculatedHeight = selectedData.height;
    } else {
      calculatedHeight = (selectedData.height / selectedData.width) * 720;
    }
  }

  ImageResizer.createResizedImage(
    selectedData.path,
    calculatedWidth,
    calculatedHeight,
    'JPEG',
    100,
  )
    .then(resizedImage => {
      callback({
        ...resizedImage,
        mime: selectedData.mime, // include mime type (like image/jpeg)
        originalFilename:
          selectedData.filename || selectedData.path?.split('/').pop(),
      });
    })
    .catch(err => {
      console.log(err);
      callback(null);
    });
};

const ImagePicker: React.FC<ImagePickerProps> = ({
  onImagePicked,
  source,
  imageStyle = styles.image,
  iconStyle = styles.editProfileBtn,
  iconContainerStyle = styles.editProfileBtnContainer,
  containerStyle = styles.container,
  isMultiple = false,
  isCropping = false,
  hideActionSheet = false,
  smallIcon,
  renderCarRepairView = false,
}) => {
  const [loaded, setLoaded] = useState(false);
  const actionSheetRef = useRef<ActionSheet>(null);

  console.log('>>> source', source);

  const handlePressActionSheet = (index: number) => {
    if (index === 0) {
      showCameraImagePicker();
    } else if (index === 1) {
      showImageGalleryPicker();
    }
  };

  const showCameraImagePicker = () => {
    MultipleImagePicker.openCamera({
      width: 720,
      height: 480,
      cropping: isCropping,
      mediaType: 'photo',
    }).then(
      selectedMedia => resizeImageHandling(selectedMedia, onImagePicked),
      error => {
        if (error?.code === 'E_PERMISSION_MISSING') {
          utils.showAlertWithDelay('Alert', 'CARHUB requires access to Camera');
        }
      },
    );
  };

  const showImageGalleryPicker = () => {
    MultipleImagePicker.openPicker({
      multiple: isMultiple,
      cropping: isCropping,
      mediaType: 'photo',
    }).then(
      selectedMedia => {
        if (isMultiple) {
          const editedArray: any[] = [];

          async.forEachSeries(
            selectedMedia,
            (mediaFile, callback) => {
              resizeImageHandling(mediaFile, resizedImage => {
                if (resizedImage) {
                  editedArray.push(resizedImage);
                }
                callback();
              });
            },
            () => onImagePicked(editedArray),
          );
        } else {
          resizeImageHandling(selectedMedia, onImagePicked);
        }
      },
      error => {
        if (error?.code === 'E_PERMISSION_MISSING') {
          utils.showCommonMessage(
            'Alert',
            'CARHUB requires access to Photo Gallery',
          );
        }
      },
    );
  };

  const renderLoader = () =>
    !loaded && (
      <View style={styles.loaderViewStyle}>
        <ActivityIndicator size="large" color="#ccc" />
      </View>
    );

  const renderCarRepair = () => (
    <View style={carRepairStyle.container}>
      <Text style={carRepairStyle.header}>
        {strings('imagePicker.pressHere')}
      </Text>
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        style={carRepairStyle.image}
        source={
          source?.uri
            ? {uri: source.uri, headers: {imagekey: Config.IMAGE_KEY}}
            : source
        }
        onLoadEnd={() => setLoaded(true)}
      />
      <Text style={carRepairStyle.text}>
        {strings('imagePicker.inOrderToDentPictures')}
      </Text>
      <Text style={carRepairStyle.subtext}>
        ( {strings('imagePicker.pleaseAddAsManyPictures')} )
      </Text>
    </View>
  );
  const getImageSource = (src: any) => {
    if (src?.uri && typeof src.uri === 'string') {
      return {
        uri: src.uri,
        headers: {imagekey: Config.IMAGE_KEY},
      };
    }
    return src || {};
  };

  return (
    <View>
      <ButtonView
        style={containerStyle}
        onPress={() => {
          !hideActionSheet && actionSheetRef.current?.show();
        }}>
        {renderLoader()}
        {renderCarRepairView ? (
          renderCarRepair()
        ) : (
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            style={imageStyle}
            source={getImageSource(source)}
            onLoadEnd={() => setLoaded(true)}
          />
        )}
      </ButtonView>
      {smallIcon && (
        <View style={iconContainerStyle}>
          <ButtonView
            onPress={() => {
              actionSheetRef.current?.show();
            }}
            style={styles.editProfileBtn}>
            <ImageNative source={smallIcon} style={iconStyle} />
          </ButtonView>
        </View>
      )}
      <ActionSheet
        ref={actionSheetRef}
        options={[
          strings('imagePicker.camera'),
          strings('imagePicker.gallery'),
          strings('imagePicker.cancel'),
        ]}
        cancelButtonIndex={2}
        onPress={handlePressActionSheet}
      />
    </View>
  );
};

const carRepairStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Metrics.ratio(4),
  },
  header: {
    color: Colors.white,
    fontFamily: Fonts.type.AvenirNextDemiBold,
    fontSize: Metrics.ratio(15),
  },
  image: {
    width: Metrics.ratio(45),
    height: Metrics.ratio(45),
    marginVertical: Metrics.ratio(5),
  },
  text: {
    color: Colors.white,
    fontFamily: Fonts.type.AvenirNextDemiBold,
    fontSize: Metrics.ratio(12),
  },
  subtext: {
    color: Colors.darkStaleBlue,
    fontFamily: Fonts.type.AvenirNextDemiBold,
    fontSize: Metrics.ratio(10),
    textAlign: 'center',
  },
});

export default ImagePicker;
