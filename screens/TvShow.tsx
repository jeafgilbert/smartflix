import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { RestLink } from 'apollo-link-rest'
import React, { FC, useContext } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ThemeContext from '../contexts/ThemeContext'

interface TvShow {
  backdrop_path: string,
  first_air_date: string,
  genre_ids: number[],
  id: number,
  name: string,
  origin_country: string[],
  original_language: string,
  original_name: string,
  overview: string,
  popularity: number,
  poster_path: string,
  vote_average: number,
  vote_count: number
}

const restLink = new RestLink({ uri: 'https://api.themoviedb.org/3/' })

// setup your client
const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
})

interface RatingProps {
  voteAverage: number
}

const Rating: FC<RatingProps> = ({ voteAverage }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <View style={styles.ratingWrap}>
      <Icon name='star' size={24} color={voteAverage > 0 ? 'orange' : theme.color} />
      <Icon name='star' size={24} color={voteAverage > 2 ? 'orange' : theme.color} />
      <Icon name='star' size={24} color={voteAverage > 4 ? 'orange' : theme.color} />
      <Icon name='star' size={24} color={voteAverage > 6 ? 'orange' : theme.color} />
      <Icon name='star' size={24} color={voteAverage > 8 ? 'orange' : theme.color} />
    </View>
  )
}

interface Props {
  route: any
  navigation: any,
}

const TvShow: FC<Props> = ({ route, navigation }) => {
  const { theme } = useContext(ThemeContext)
  const tvShow: TvShow = route.params.tvShow

  const back = () => {
    navigation.pop()
  }

  return (
    <ApolloProvider client={client}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <TouchableOpacity onPress={back} style={styles.backButton}>
          <Icon name={'keyboard-backspace'} size={40} color={'#fff'} />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.mainScroll}>
          <Image style={styles.tvShowImage} source={tvShow.poster_path ? { uri: 'http://image.tmdb.org/t/p/w780/' + tvShow?.poster_path } : require('../assets/images/image-default.png')} />
          <View style={styles.mainContent}>
            <View style={styles.controlsWrap}>
              <Rating voteAverage={tvShow.vote_average} />
              <Icon name={'bookmark'} size={30} color={theme.color} />
            </View>
            <Text style={[styles.tvShowTitle, { color: theme.color }]}>{tvShow.name}</Text>
            <Text style={[styles.tvShowOverview, { color: theme.color }]}>{tvShow.overview}</Text>
          </View>
        </ScrollView>
      </View>
    </ApolloProvider>
  )
}

export default TvShow

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    zIndex: 10,
    top: 50,
    left: 8,
    width: 48,
    height: 48,
  },
  mainScroll: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  tvShowImage: {
    height: 500,
    marginBottom: 30,
  },
  controlsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingWrap: {
    flexDirection: 'row',
  },
  mainContent: {
    paddingHorizontal: 12,
  },
  tvShowTitle: {
    marginTop: 0,
    marginBottom: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
  tvShowOverview: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20,
  },
})