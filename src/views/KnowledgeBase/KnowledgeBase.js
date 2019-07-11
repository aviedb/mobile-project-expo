import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { ListItem, List } from 'react-native-ui-kitten';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer
class KnowledgeBase extends Component {

  @observable data = [];
  @observable isFetching = true;

  componentDidMount() {
    setTimeout(() => {
      this.data = [
        { title: 'Knowledge Base 1', createdAt: '2019-06-20' },
        { title: 'Knowledge Base 2', createdAt: '2019-06-25' },
        { title: 'Knowledge Base 3', createdAt: '2019-07-01' },
        { title: 'Knowledge Base 4', createdAt: '2019-07-04' },
      ];
      this.isFetching = false;
    }, 2000);
  }

  _onRefresh = () => {
    this.isFetching = true;
    
    setTimeout(() => {
      this.isFetching = false;
    }, 2000);
  }

  renderItem = ({ item }) => {
    return (
      <ListItem 
        title={item.title}
        description={item.createdAt}
        style={styles.item}
        onPress={() => this.props.navigation.navigate('KnowledgeDetail', {
          title: item.title
        })}
      />
    );
  }

  render() {
    if (this.props.selectedIndex !== 1) return <View />

    return (
      <View style={styles.container}>
        <List 
          data={this.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => String(index)}
          onRefresh={this._onRefresh}
          refreshing={this.isFetching}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    borderBottomColor: '#EAEEF1',
    borderBottomWidth: 1
  }
});

export default KnowledgeBase;