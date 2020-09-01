import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { RestLink } from 'apollo-link-rest'
import gql from 'graphql-tag'
import React, { FC, useContext, useEffect, useState } from 'react'
import { ApolloProvider } from 'react-apollo'
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import ThemeContext from '../contexts/ThemeContext'

interface Movie {
  popularity?: number,
  vote_count?: number,
  video?: boolean,
  poster_path?: string,
  id: number,
  adult?: boolean,
  backdrop_path?: string,
  original_language?: string,
  original_title?: string,
  genre_ids?: string[],
  title: string,
  vote_average?: number,
  overview?: string,
  release_date?: string
}

interface TvShow {
  original_name: string,
  genre_ids: number[],
  name: string,
  popularity: number,
  origin_country: string[],
  vote_count: number,
  first_air_date: string,
  backdrop_path: string,
  original_language: string,
  id: number,
  vote_average: number,
  overview: string
}

const restLink = new RestLink({ uri: 'https://api.themoviedb.org/3/' })

// setup your client
const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
})

const query = gql`
  query topRatedMovies {
    nowPlayingMovies @rest(type: "NowPlayingMovies", path: "movie/now_playing?api_key=4a49de9b6809da00e4fddaf84e624664") {
      page
      total_results
      total_pages
      results
    },
    onTheAirTvShows @rest(type: "onTheAirTvShows", path: "tv/on_the_air?api_key=4a49de9b6809da00e4fddaf84e624664") {
      page
      total_results
      total_pages
      results
    }
  }
`

const Home: FC = () => {
  const { theme } = useContext(ThemeContext)
  const [activeCategory, _setActiveCategory] = useState<string>('movies')
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([])
  const [onTheAirTvShows, setOnTheAirTvShows] = useState<Movie[]>([])

  useEffect(() => {
    client.query({ query }).then(response => {
      // Movies
      setNowPlayingMovies(response.data.nowPlayingMovies.results)

      // TV Shows
      setOnTheAirTvShows(response.data.onTheAirTvShows.results)
    })
  }, [])

  const toggleCategory = (category: string) => {
    if (category === 'movies') {
    }
    else if (category === 'tv-shows') {
    }

    setActiveCategory(category)
  }

  const setActiveCategory = (category: string) => {
    _setActiveCategory(category)
  }

  return (
    <ApolloProvider client={client}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.categoriesWrap}>
          <TouchableWithoutFeedback onPress={() => toggleCategory('movies')} style={[styles.categoryButton, { borderColor: activeCategory === 'movies' ? theme.tintColorActive : theme.tintColor }]}>
            <Text style={[styles.categoryButtonText, { color: activeCategory === 'movies' ? theme.tintColorActive : theme.tintColor }]}>Film</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => toggleCategory('tv-shows')} style={[styles.categoryButton, { borderColor: activeCategory === 'tv-shows' ? theme.tintColorActive : theme.tintColor }]}>
            <Text style={[styles.categoryButtonText, { color: activeCategory === 'tv-shows' ? theme.tintColorActive : theme.tintColor }]}>Acara TV</Text>
          </TouchableWithoutFeedback>
        </View>
        <Text style={[styles.headingText, { color: theme.color }]}>Sedang Berlangsung</Text>
        {
          activeCategory === 'movies'
            ? <FlatList
              contentContainerStyle={styles.mainList}
              numColumns={3}
              data={nowPlayingMovies}
              renderItem={({ item }) => (
                <View style={styles.filmWrap}>
                  <Image source={{ uri: 'http://image.tmdb.org/t/p/w342/' + item.poster_path }} style={styles.filmImage} />
                  <Text style={[styles.filmNameText, { color: theme.color }]}>{item.title}</Text>
                </View>
              )}
            />
            : <FlatList
              contentContainerStyle={styles.mainList}
              numColumns={3}
              data={onTheAirTvShows}
              renderItem={({ item }) => (
                <View style={styles.filmWrap}>
                  <Image source={{ uri: 'http://image.tmdb.org/t/p/w342/' + item.poster_path }} style={styles.filmImage} />
                  <Text style={[styles.filmNameText, { color: theme.color }]}>{item.title}</Text>
                </View>
              )}
            />
        }
      </View>
    </ApolloProvider>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    paddingHorizontal: 8,
  },
  mainScroll: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  categoriesWrap: {
    position: 'absolute',
    zIndex: 3,
    top: 70,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  categoryButton: {
    width: 120,
    padding: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
  },
  categoryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headingText: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainList: {
    paddingBottom: 40,
  },
  filmWrap: {
    width: '33%',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  filmImage: {
    height: 200,
  },
  filmNameText: {
    fontSize: 15,
    textAlign: 'center',
  },
  liveText: {
    position: 'absolute',
    top: 12,
    left: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#ff0000',
    borderRadius: 10,
  },
})