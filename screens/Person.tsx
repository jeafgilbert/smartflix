import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { RestLink } from 'apollo-link-rest'
import React, { FC, useContext } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ThemeContext from '../contexts/ThemeContext'

interface Film {
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  media_type: string,
  original_language: string,
  original_title: string,
  overview: string,
  poster_path: string,
  release_date: string,
  vote_average: number,
  vote_count: number,
  // movie
  adult: boolean,
  title?: string,
  video: boolean,
  // tv
  first_air_date?: string,
  name?: string,
  origin_country?: string[],
  original_name?: string
}

interface Person {
  popularity: number,
  known_for_department: string,
  name: string,
  id: number,
  profile_path: string,
  adult: boolean,
  known_for: Film[],
}

const restLink = new RestLink({ uri: 'https://api.themoviedb.org/3/' })

// setup your client
const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
})

interface Props {
  route: any
  navigation: any,
}

const Person: FC<Props> = ({ route, navigation }) => {
  const { theme } = useContext(ThemeContext)
  const person: Person = route.params.person

  const goToMovie = (film: Film) => {
    navigation.navigate('Movie', { movie: film })
  }

  const goToTvShow = (film: Film) => {
    navigation.navigate('TvShow', { tvShow: film })
  }

  const goToDetailScreen = (mediaType: string, film: Film) => {
    switch (mediaType) {
      case 'movie':
        goToMovie(film)
        break
      case 'tv':
        goToTvShow(film)
        break
    }
  }

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
          <Image style={styles.personImage} source={person.profile_path ? { uri: 'http://image.tmdb.org/t/p/w780/' + person?.profile_path } : require('../assets/images/image-default.png')} />
          {
            theme.name === 'dark'
              ? <Image source={require('../assets/images/person-image-overlay.png')} style={styles.personImageOverlay} />
              : <Image source={require('../assets/images/person-image-overlay-light.png')} style={styles.personImageOverlay} />
          }
          <View style={styles.personDetailsWrap}>
            <Text style={[styles.personName, { color: theme.color }]}>{person.name}</Text>
            <View style={styles.filmList}>
              {
                person.known_for.map((film: Film, key: number) => {
                  const title = film.media_type === 'movie' ? film.title : film.name

                  return (
                    <View key={key}>
                      <TouchableWithoutFeedback onPress={() => goToDetailScreen(film.media_type, film)} style={styles.filmWrap}>
                        <Image source={film.poster_path ? { uri: 'http://image.tmdb.org/t/p/w185/' + film.poster_path } : require('../assets/images/image-default.png')} style={styles.filmImage} />
                        <View style={styles.filmDetailsWrap}>
                          <Text style={[styles.filmTitle, { color: theme.color }]}>{title}</Text>
                          <Text style={[styles.filmOverview, { color: theme.color }]}>{film.overview.substr(0, 200) + ' ...'}</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  )
                })
              }
            </View>
          </View>
        </ScrollView>
      </View>
    </ApolloProvider>
  )
}

export default Person

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
  personImage: {
    height: 500,
    marginBottom: 30,
  },
  personDetailsWrap: {
    marginTop: -100,
    paddingHorizontal: 12,
  },
  personName: {
    marginTop: 0,
    marginBottom: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
  filmList: {
  },
  filmWrap: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  filmImage: {
    width: 100,
    height: 150,
  },
  personImageOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  filmDetailsWrap: {
    marginLeft: 16,
  },
  filmTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  filmOverview: {
    marginTop: 2,
    fontSize: 16,
  },
})