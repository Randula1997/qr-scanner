/* eslint-disable prettier/prettier */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native-svg';
import EventCard from './EventCard';
import {View} from 'react-native';
import styles from './styles';

const Events = () => {
  const [loading, setLoading] = useState(true);
  const [eventdata, setEventData] = useState<any[]>([]);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    setLoading(true);
    const apiUrl =
      'http://124.43.17.223:8020/ITRACK/api/services/app/eventCalander/GetAll';

    try {
      const response = await axios.post(apiUrl);
      setLoading(false);
      if (!response.data.success) {
        throw new Error('Data not Available');
      }
      const data = response.data.result.items;
      setEventData(data);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text>Events</Text>
        <View>
          {eventdata ? (
            <EventCard data={eventdata} />
          ) : (
            <Text>No data found</Text>
          )}
        </View>
      </View>
    </>
  );
};

export default Events;
