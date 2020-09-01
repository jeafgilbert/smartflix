import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { RestLink } from 'apollo-link-rest'
import gql from 'graphql-tag'
import React, { FC, useContext, useEffect, useState } from 'react'
import { ApolloProvider } from 'react-apollo'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
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
    }
  }
`

const Saved: FC = () => {
  const { theme } = useContext(ThemeContext)
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([])

  useEffect(() => {
    client.query({ query }).then(response => {
      setNowPlayingMovies(response.data.nowPlayingMovies.results)
    })
  }, [])

  return (
    <ApolloProvider client={client}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.headingText, { color: theme.color }]}>Tersimpan</Text>
        {
          <FlatList
            contentContainerStyle={styles.mainList}
            numColumns={3}
            data={nowPlayingMovies}
            renderItem={({ item }) => (
              <View style={styles.filmWrap}>
                <Image source={item.poster_path ? { uri: 'http://image.tmdb.org/t/p/w342/' + item.poster_path } : require('../assets/images/image-default.png')} style={styles.filmImage} />
              </View>
            )}
          />
        }
      </View>
    </ApolloProvider>
  )
}

export default Saved

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 8,
  },
  mainScroll: {
    flexGrow: 1,
    paddingBottom: 40,
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
})