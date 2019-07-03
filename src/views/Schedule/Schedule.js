import _ from 'lodash';
import React, {Component} from 'react';
import {
  Platform,
  Alert,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native';
import {ExpandableCalendar, AgendaList, CalendarProvider} from 'react-native-calendars';
import {
  Text
} from 'react-native-ui-kitten';


const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3); 
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);

function getFutureDates(days) {
  const array = [];
  for (let index = 1; index <= days; index++) {
    const date = new Date(Date.now() + (864e5 * index)); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(days) {
  return new Date(Date.now() - (864e5 * days)).toISOString().split('T')[0];
}

const ITEMS = [
  {title: dates[0], data: [{hour: '12am', duration: '1h', title: 'Ashtanga Yoga gimana kalau titlenya panjang hiya hiya hiya hiya terrrrrr panjangin dikit lagi'}]},
  {title: dates[1], data: [{hour: '4pm', duration: '1h', title: 'Pilates ABC'}, {hour: '5pm', duration: '1h', title: 'Vinyasa Yoga'}]},
  {title: dates[2], data: [{hour: '1pm', duration: '1h', title: 'Ashtanga Yoga'}, {hour: '2pm', duration: '1h', title: 'Deep Streches'}, {hour: '3pm', duration: '1h', title: 'Private Yoga'}]},
  {title: dates[3], data: [{hour: '12am', duration: '1h', title: 'Ashtanga Yoga'}]},
  {title: dates[4], data: [{}]},
  {title: dates[5], data: [{hour: '9pm', duration: '1h', title: 'Pilates Reformer'}, {hour: '10pm', duration: '1h', title: 'Ashtanga'}, {hour: '11pm', duration: '1h', title: 'TRX'}, {hour: '12pm', duration: '1h', title: 'Running Group'}]},
  {title: dates[6], data: [{hour: '12am', duration: '1h', title: 'Ashtanga Yoga'}]},
  {title: dates[7], data: [{}]},
  {title: dates[8], data: [{hour: '9pm', duration: '1h', title: 'Pilates Reformer'}, {hour: '10pm', duration: '1h', title: 'Ashtanga'}, {hour: '11pm', duration: '1h', title: 'TRX'}, {hour: '12pm', duration: '1h', title: 'Running Group'}]},
  {title: dates[9], data: [{hour: '1pm', duration: '1h', title: 'Ashtanga Yoga'}, {hour: '2pm', duration: '1h', title: 'Deep Streches'}, {hour: '3pm', duration: '1h', title: 'Private Yoga'}]},
  {title: dates[10], data: [{hour: '12am', duration: '1h', title: 'Ashtanga Yoga'}]}
];

export default class ExpandableCalendarScreen extends Component {

  onDateChanged = (/* date, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  }

  onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  }
  
  buttonPressed() {
    Alert.alert('show more');
  }

  itemPressed(id) {
    Alert.alert(id);
  }

  renderEmptyItem() {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  }

  renderItem = ({item}) => {
    if (_.isEmpty(item)) {
      return this.renderEmptyItem();
    }

    let TouchableComponent = Platform.select({
      android: TouchableNativeFeedback,
      ios: TouchableOpacity
    })
    
    return (
      <TouchableComponent 
        onPress={() => this.props.navigation.navigate('Settings')} 
      >
        <View style={styles.item}>
          <View>
            <Text style={styles.itemHourText}>{item.hour}</Text>
            <Text style={styles.itemDurationText}>{item.duration}</Text>
          </View>
          <Text style={styles.itemTitleText}>{item.title}</Text>
        </View>
      </TouchableComponent>
    );
  }

  getMarkedDates = () => {
    const marked = {};
    ITEMS.forEach(item => {
      // only mark dates with data
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        marked[item.title] = {marked: true};
      }
    });
    return marked;
  }

  getTheme = () => {
    const themeColor = '#3267FF';
    const lightThemeColor = '#e6efff';
    const disabledColor = '#a6acb1';
    const black = '#20303c';
    const white = '#ffffff';
    
    return {
      // arrows
      arrowColor: black,
      arrowStyle: {padding: 0},
      // month
      monthTextColor: black,
      textMonthFontSize: 16,
      textMonthFontWeight: 'bold',
      // day names
      textSectionTitleColor: black,
      textDayHeaderFontSize: 12,
      textDayHeaderFontWeight: 'normal',
      // today
      todayBackgroundColor: lightThemeColor,
      todayTextColor: themeColor,
      // dates
      dayTextColor: themeColor,
      textDayFontSize: 18,
      textDayFontWeight: '500',
      textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
      // selected date
      selectedDayBackgroundColor: themeColor,
      selectedDayTextColor: white,
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: white,
      disabledDotColor: disabledColor,
      dotStyle: {marginTop: -2}
    };
  }

  render() {    
    return (
      <CalendarProvider 
        date={ITEMS[0].title} 
        onDateChanged={this.onDateChanged} 
        onMonthChange={this.onMonthChange}
        theme={{todayButtonTextColor: '#0059ff'}} 
        disabledOpacity={0.6}
      >
        <ExpandableCalendar 
          // horizontal={false}
          // hideArrows
          // disablePan
          // hideKnob
          // initialPosition={'open'} // ExpandableCalendar.positions.OPEN - can't find static positions
          firstDay={1}
          markedDates={this.getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
          theme={this.getTheme()}
          leftArrowImageSource={require('../../assets/previous.png')}
          rightArrowImageSource={require('../../assets/next.png')}
          // calendarStyle={styles.calendar}
          // headerStyle={styles.calendar} // for horizontal only
        />
        <AgendaList
          sections={ITEMS}
          extraData={this.state}
          renderItem={this.renderItem}
          // sectionStyle={styles.section}
        />
      </CalendarProvider>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20, 
    paddingRight: 20
  },
  section: {
    backgroundColor: '#f0f4f7', 
    color: '#79838a'
  },
  item: {
    padding: 20, 
    backgroundColor: 'white', 
    borderBottomWidth: 1, 
    borderBottomColor: '#e8ecf0', 
    flexDirection: 'row'
  },
  itemHourText: {
    color: 'black'
  },
  itemDurationText: {
    color: 'grey', 
    fontSize: 12, 
    marginTop: 4,
    marginLeft: 4
  },
  itemTitleText: {
    color: 'black', 
    marginLeft: 16, 
    fontWeight: 'bold', 
    fontSize: 16
  },
  itemButtonContainer: {
    flex: 1, 
    alignItems: 'flex-end'
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52, 
    justifyContent: 'center',
    borderBottomWidth: 1, 
    borderBottomColor: '#e8ecf0' 
  },
  emptyItemText: {
    color: '#79838a',
    fontSize: 14
  }
});