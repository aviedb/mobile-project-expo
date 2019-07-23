import React, { Component } from 'react';
import { 
  StatusBar, 
  Platform, 
  View, 
  SafeAreaView, 
  ScrollView, 
  Image,
  ActionSheetIOS
} from 'react-native';
import {
  Input,
  Text,
  TopNavigation,
  TopNavigationAction
} from 'react-native-ui-kitten';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { MaterialIcons } from '@expo/vector-icons';

import { icon } from '../../services/stores';
import Button from '../../components/Button';
import SelectInput from '../../components/SelectInput';
import Fab from '../../components/FloatingActionButton';
import BottomSheet from '../../components/BottomSheet';
import Divider from '../../components/Divider';
import Touchable from '../../components/Touchable';

import styles from './styles';
import theme from '../../styles/theme';

backIcon = () => {
  const name = Platform.OS === 'ios'? 'ios-arrow-back':'md-arrow-back';
  return icon.getIcon(name, Ionicons);
}

@observer
class AddReport extends Component {

  static navigationOptions = {
    header: null,
  };

  @observable image = null;
  @observable title = '';
  @observable sold = '';
  @observable stok = 'Stok Toko';
  @observable bottomSheetVisible = false;

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  pickImage = async (index) => {
    if (Platform.OS === 'android') {
      this.closeBottomSheet();
    }

    if (index === 0) return;
    if (index === 3) return this.image = null;

    await this.getPermissionAsync();

    const pickerType = index === 1? 'launchCameraAsync':'launchImageLibraryAsync';

    ImagePicker[pickerType]({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 2]
    }).then(res => {
      if (!res.cancelled) {
        this.image = res.uri
      }
    }).catch(err => {
      console.log(err);
    });
  }

  openActionSheet = () => {
    if (Platform.OS === 'android') {
      this.bottomSheetVisible = true;
    } else if (Platform.OS === 'ios') {
      let options = ['Cancel', 'Take photo', 'Choose image'];
      if (this.image) options.push('Remove picture');

      ActionSheetIOS.showActionSheetWithOptions({
        options,
        destructiveButtonIndex: this.image? 3:null,
        cancelButtonIndex: 0
      }, this.pickImage);
    }
  }

  closeBottomSheet = () => {
    this.bottomSheetVisible = false;
  }

  renderBottomSheet = () => {
    return (
      <BottomSheet
        isVisible={this.bottomSheetVisible}
        closeBottomSheet={this.closeBottomSheet}
        title="Foto Event"
      >
        <Touchable onPress={() => this.pickImage(1)}>
          <View style={styles.bottomSheetItem}>
            {icon.getIcon('camera-alt', MaterialIcons, theme["text-disabled-color"])}
            <Text style={styles.bottomSheetItemTitle}>Take photo</Text>
          </View>
        </Touchable>
        <Touchable onPress={() => this.pickImage(2)}>
          <View style={styles.bottomSheetItem}>
            {icon.getIcon('image', MaterialIcons, theme["text-disabled-color"])}
            <Text style={styles.bottomSheetItemTitle}>Choose image</Text>
          </View>
        </Touchable>
        {this.image &&
          <Touchable onPress={() => this.pickImage(3)}>
            <View style={styles.bottomSheetItem}>
              {icon.getIcon('clear', MaterialIcons, theme["text-danger-disabled-color"])}
              <Text style={styles.bottomSheetItemTitleDanger}>Remove picture</Text>
            </View>
          </Touchable>
        }
      </BottomSheet>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor="#eee"
          barStyle="dark-content" />
        <TopNavigation
          title="Add Report"
          alignment={Platform.OS==='android'? "start": "center"}
          leftControl={<TopNavigationAction
            icon={backIcon}
            onPress={() => this.props.navigation.goBack()}
          />}
          style={styles.header}
          titleStyle={styles.headerTitle}
        />
        <ScrollView style={styles.container}>
          <View style={styles.imageContainer}>
            <Text style={{position: 'absolute'}}>Foto Event</Text>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{uri: this.image}}
            />
          </View>
          <View style={styles.formContainer}>
            <Text category="h5">Report Detail</Text>
            <Divider color="#D3DDE9" marginBottom={20}/>
            <Input 
              label="Report Title"
              value={this.title}
              onChangeText={value => this.title = value}
              style={styles.input}
              labelStyle={styles.labelStyle}
            />
            <Input 
              label="Nomor yang dijual"
              value={this.sold}
              onChangeText={value => this.sold = value}
              keyboardType="numeric"
              style={styles.input}
              labelStyle={styles.labelStyle}
            />
            <SelectInput 
              label="Pilih stok"
              value={this.stok}
              onValueChange={value => this.stok = value}
              options={["Stok Toko", "Stok Telin"]}
              style={styles.select}
            />
          </View>
          <Fab
            style={styles.upload}
            underlayColor={theme["text-primary-active-color"]}
            onPress={this.openActionSheet}
          >
            {icon.getIcon(this.image?'edit':'upload', null, '#fff', 20)}
          </Fab>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button>Next</Button>
        </View>
        {this.renderBottomSheet()}
      </SafeAreaView>
    );
  }
}

export default AddReport;