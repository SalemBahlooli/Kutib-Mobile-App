

  
import { StyleSheet, Text, View , Image ,ScrollView , Pressable ,FlatList } from 'react-native';

import React, { useState, useCallback, useEffect } from 'react'

import Spinner from 'react-native-loading-spinner-overlay';





export const SearchByChatBot = ({}) => {
    const [fetchError, setFetchError] = useState(null);
    const [bookList, setBookList] = useState(['']);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([])

    const WIDTH = 200; // or any number
    const HEIGHT = 2000; // or any number
    
  

    


    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ])
      }, [])
    
      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages),
        )
      }, [])
   
    
      return (
      

        <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
       
        
      );
    };
  

    
