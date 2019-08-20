import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  Avatar,
  Badge,
} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

import Colors from '../../constants/Colors';
import chatData from '../../constants/data.json';


export default class NewMatchesScreen extends React.Component {

  getMachedDays = val => {
    let curDate = moment();
    let valDate = moment(val);

    return curDate.diff(valDate, 'days');
  }
  listItemRender = (item) => {
    const data = item.item;
    return (
      <View style={styles.messageContainer}>
        <Avatar
          rounded
          size={60}
          source={{
            uri: data.profile.photos[0]         // when photo is invalid, render gray circle
          }}
          onPress={() => this.props.navigation.navigate('ViewProfile')}
        />
        <View
          style={styles.textContainer}
        >
          <View style={styles.nameWithBadge}>
            <Text style={styles.name} >
              {data.profile.name}
            </Text>
            {
              data.unread &&       // data.unread or data.conversation.unread, which one?
              <Badge status='primary' />
            }
          </View>
          <Text
            numberOfLines={2}
            ellipsizeMode='tail'
            style={styles.lastHistory}
          >
            You matched {this.getMachedDays(data.matchedOn)} days ago
            </Text>
        </View>
        <TouchableOpacity
          style={styles.sendIcon}
          onPress={() => this.props.navigation.navigate('SendMessage')}
        >
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-send' : 'md-send'}
            size={26}
            color="#2f95dc"
          />
        </TouchableOpacity>
      </View>
    )
  };

  render() {
    let filteredData = chatData.filter(function (item) {
      return !item.conversation
    });

    return (
      <View style={styles.container}>
        {
          filteredData.length ? (
            <FlatList
              data={filteredData}
              keyExtractor={(item, index) => item.messageId}
              renderItem={this.listItemRender}
            />
          ) : (
              <View style={styles.noData}>
                <Text>
                  You have no matches
                </Text>
              </View>
            )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageContainer: {
    flexDirection: 'row',
    margin: 25,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingRight: 60,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  nameWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  name: {
    marginRight: 5,
  },
  lastHistory: {
    color: 'grey',
    lineHeight: 20,
  },
  sendIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noData: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})