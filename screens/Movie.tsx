import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { RestLink } from 'apollo-link-rest'
import gql from 'graphql-tag'
import React, { FC, useContext } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ThemeContext from '../contexts/ThemeContext'

interface Movie {
  poster_path: string,
  vote_count: number,
  video: boolean,
  media_type: string,
  id: number,
  adult: boolean,
  backdrop_path: string,
  original_language: string,
  original_title: string,
  genre_ids: number[],
  title: string,
  vote_average: number,
  overview: string,
  release_date: string
}

const restLink = new RestLink({ uri: 'https://api.themoviedb.org/3/' })

// setup your client
const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
})

const query = gql`
  query popularPeople {
    popularPeople @rest(type: "PopularPeople", path: "person/popular?api_key=4a49de9b6809da00e4fddaf84e624664") {
      page
      total_results
      total_pages
      results
    }
  }
`

interface RatingProps {
  voteAverage: number,
  voteCount: number
}

const Rating: FC<RatingProps> = ({ voteAverage, voteCount }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <View style={styles.ratingWrap}>
      <Icon name='star' size={24} color={voteAverage > 0 ? 'orange' : theme.color} />
      <Icon name='star' size={24} color={voteAverage > 2 ? 'orange' : theme.color} />
      <Icon name='star' size={24} color={voteAverage > 4 ? 'orange' : theme.color} />
      <Icon name='star' size={24} color={voteAverage > 6 ? 'orange' : theme.color} />
      <Icon name='star' size={24} color={voteAverage > 8 ? 'orange' : theme.color} />
      <Text style={[styles.voteCountText, { color: theme.color }]}>({voteCount})</Text>
    </View>
  )
}

interface Props {
  route: any
  navigation: any,
}

const Movie: FC<Props> = ({ route, navigation }) => {
  const { theme } = useContext(ThemeContext)
  const movie: Movie = route.params.movie

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
          <Image style={styles.movieImage} source={movie.poster_path ? { uri: 'http://image.tmdb.org/t/p/w780/' + movie?.poster_path } : require('../assets/images/image-default.png')} />
          <View style={styles.mainContent}>
            <View style={styles.controlsWrap}>
              <Rating voteAverage={movie.vote_average} voteCount={movie.vote_count} />
              <Icon name={'bookmark'} size={30} color={theme.color} />
            </View>
            <Text style={[styles.movieTitle, { color: theme.color }]}>{movie.title}</Text>
            <Text style={[styles.movieOverview, { color: theme.color }]}>{movie.overview}</Text>
          </View>
        </ScrollView>
      </View>
    </ApolloProvider>
  )
}

export default Movie

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
  movieImage: {
    height: 500,
    marginBottom: 30,
  },
  controlsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  ratingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteCountText: {
    marginLeft: 10,
    fontSize: 14,
  },
  mainContent: {
    paddingHorizontal: 12,
  },
  movieTitle: {
    marginTop: 0,
    marginBottom: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
  movieOverview: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20,
  },
})