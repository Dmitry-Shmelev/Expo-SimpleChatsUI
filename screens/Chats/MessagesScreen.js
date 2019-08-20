import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Avatar,
  Badge,
} from 'react-native-elements';

import chatData from '../../constants/data.json';


export default class MessagesScreen extends React.Component {

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
        <TouchableOpacity
          style={styles.textContainer}
          onPress={() => this.props.navigation.navigate('SendMessage')}
        >
          <View style={styles.nameWithBadge}>
            <Text style={styles.name} >
              {data.profile.name}
            </Text>
            {
              data.conversation.unread &&       // data.unread or data.conversation.unread, which one?
              <Badge status='primary' />
            }
          </View>
          <Text
            numberOfLines={2}
            ellipsizeMode='tail'
            style={styles.lastMessage}
          >
            {
              data.conversation.lastMessage        // when message is overload, it will end with '...'
            }
          </Text>
        </TouchableOpacity>
      </View>
    )
  };

  render() {
    let filteredData = chatData.filter(function (item) {
      return item.conversation
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
                  You have no messages
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingRight: 60,
  },
  nameWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  name: {
    marginRight: 5,
  },
  lastMessage: {
    color: 'grey',
    lineHeight: 20,
  },
  noData: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})