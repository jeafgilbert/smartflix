import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { RestLink } from 'apollo-link-rest'
import gql from 'graphql-tag'
import React, { FC, useContext, useEffect, useState } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
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
    topRatedMovies @rest(type: "TopRatedMovies", path: "movie/top_rated?api_key=4a49de9b6809da00e4fddaf84e624664") {
      page
      total_results
      total_pages
      results
    },
    popularMovies @rest(type: "PopularMovies", path: "movie/popular?api_key=4a49de9b6809da00e4fddaf84e624664") {
      page
      total_results
      total_pages
      results
    },
    upcomingMovies @rest(type: "UpcomingMovies", path: "movie/upcoming?api_key=4a49de9b6809da00e4fddaf84e624664") {
      page
      total_results
      total_pages
      results
    },
    topRatedTvShows @rest(type: "TopRatedTvShows", path: "tv/top_rated?api_key=4a49de9b6809da00e4fddaf84e624664") {
      page
      total_results
      total_pages
      results
    },
    popularTvShows @rest(type: "PopularTvShows", path: "tv/popular?api_key=4a49de9b6809da00e4fddaf84e624664") {
      page
      total_results
      total_pages
      results
    },
    airingTodayTvShows @rest(type: "AiringTodayTvShows", path: "tv/airing_today?api_key=4a49de9b6809da00e4fddaf84e624664") {
      page
      total_results
      total_pages
      results
    }
  }
`
const getRandomItem = (items: any): any => {
  const randomIndex = Math.floor(Math.random() * items.length)

  return items[randomIndex]
}

const Home: FC = () => {
  const { theme } = useContext(ThemeContext)
  const [activeCategory, _setActiveCategory] = useState<string>('movies')

  // Movies
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
  const [randomMovieCover, setRandomMovieCover] = useState<Movie | null>(null)
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([])

  // Tv Shows
  const [randomTvShowsCover, setRandomTvShowsCover] = useState<TvShow | null>(null)
  const [topRatedTvShows, setTopRatedTvShows] = useState<TvShow[]>([])
  const [popularTvShows, setPopularTvShows] = useState<TvShow[]>([])
  const [airingTodayTvShows, setAiringTodayTvShows] = useState<TvShow[]>([])

  useEffect(() => {
    client.query({ query }).then(response => {
      // Movies
      setRandomMovieCover(getRandomItem(response.data.popularMovies.results))
      setTopRatedMovies(response.data.topRatedMovies.results)
      setPopularMovies(response.data.popularMovies.results)
      setUpcomingMovies(response.data.upcomingMovies.results)

      // TV Shows
      setRandomTvShowsCover(getRandomItem(response.data.popularTvShows.results))
      setTopRatedTvShows(response.data.topRatedTvShows.results)
      setPopularTvShows(response.data.popularTvShows.results)
      setAiringTodayTvShows(response.data.airingTodayTvShows.results)
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
        <ScrollView contentContainerStyle={styles.mainScroll}>
          <View style={styles.categoriesWrap}>
            <TouchableWithoutFeedback onPress={() => toggleCategory('movies')} style={[styles.categoryButton, { borderColor: activeCategory === 'movies' ? theme.darkTintColorActive : theme.darkTintColorInactive }]}>
              <Text style={[styles.categoryButtonText, { color: activeCategory === 'movies' ? theme.darkTintColorActive : theme.darkTintColorInactive }]}>Film</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => toggleCategory('tv-shows')} style={[styles.categoryButton, { borderColor: activeCategory === 'tv-shows' ? theme.darkTintColorActive : theme.darkTintColorInactive }]}>
              <Text style={[styles.categoryButtonText, { color: activeCategory === 'tv-shows' ? theme.darkTintColorActive : theme.darkTintColorInactive }]}>Acara TV</Text>
            </TouchableWithoutFeedback>
          </View>
          {
            activeCategory === 'movies'
              ? <>
                <View style={styles.cover}>
                  {
                    !randomMovieCover
                      ? null
                      : <Image style={styles.coverImage} source={randomMovieCover?.poster_path ? { uri: 'http://image.tmdb.org/t/p/w780/' + randomMovieCover?.poster_path } : require('../assets/images/image-default.png')} />
                  }
                  <Image style={styles.coverImageOverlay} source={require('../assets/images/cover-image-overlay.png')} />
                </View>
                <View style={styles.content}>
                  <View style={styles.contentSection}>
                    <Text style={[styles.headingText, { color: theme.color }]}>Peringkat Teratas</Text>
                    <ScrollView style={styles.contentScroll} horizontal={true}>
                      {
                        topRatedMovies.map((movie: Movie, key: number) => {
                          return (
                            <View key={key} style={styles.movieWrap}>
                              <Image source={{ uri: 'http://image.tmdb.org/t/p/w185/' + movie.poster_path }} style={styles.movieImage} />
                            </View>
                          )
                        })
                      }
                    </ScrollView>
                  </View>
                  <View style={styles.contentSection}>
                    <Text style={[styles.headingText, { color: theme.color }]}>Populer</Text>
                    <ScrollView style={styles.contentScroll} horizontal={true}>
                      {
                        popularMovies.map((movie: Movie, key: number) => {
                          return (
                            <View key={key} style={styles.movieWrap}>
                              <Image source={movie.poster_path ? { uri: 'http://image.tmdb.org/t/p/w185/' + movie.poster_path } : require('../assets/images/image-default.png')} style={styles.movieImage} />
                            </View>
                          )
                        })
                      }
                    </ScrollView>
                  </View>
                  <View style={styles.contentSection}>
                    <Text style={[styles.headingText, { color: theme.color }]}>Segera</Text>
                    <ScrollView style={styles.contentScroll} horizontal={true}>
                      {
                        upcomingMovies.map((movie: Movie, key: number) => {
                          return (
                            <View key={key} style={styles.movieWrap}>
                              <Image source={{ uri: 'http://image.tmdb.org/t/p/w185/' + movie.poster_path }} style={styles.movieImage} />
                            </View>
                          )
                        })
                      }
                    </ScrollView>
                  </View>
                </View>
              </>
              : <>
                <View style={styles.cover}>
                  {
                    !randomTvShowsCover
                      ? null
                      : <Image style={styles.coverImage} source={{ uri: 'http://image.tmdb.org/t/p/w780/' + randomTvShowsCover?.poster_path }} />
                  }
                  <Image style={styles.coverImageOverlay} source={require('../assets/images/cover-image-overlay.png')} />
                </View>
                <View style={styles.content}>
                  <View style={styles.contentSection}>
                    <Text style={[styles.headingText, { color: theme.color }]}>Peringkat Teratas</Text>
                    <ScrollView style={styles.contentScroll} horizontal={true}>
                      {
                        topRatedTvShows.map((movie: Movie, key: number) => {
                          return (
                            <View key={key} style={styles.movieWrap}>
                              <Image source={movie.poster_path ? { uri: 'http://image.tmdb.org/t/p/w185/' + movie.poster_path } : require('../assets/images/image-default.png')} style={styles.movieImage} />
                            </View>
                          )
                        })
                      }
                    </ScrollView>
                  </View>
                  <View style={styles.contentSection}>
                    <Text style={[styles.headingText, { color: theme.color }]}>Populer</Text>
                    <ScrollView style={styles.contentScroll} horizontal={true}>
                      {
                        popularTvShows.map((movie: Movie, key: number) => {
                          return (
                            <View key={key} style={styles.movieWrap}>
                              <Image source={movie.poster_path ? { uri: 'http://image.tmdb.org/t/p/w185/' + movie.poster_path } : require('../assets/images/image-default.png')} style={styles.movieImage} />
                            </View>
                          )
                        })
                      }
                    </ScrollView>
                  </View>
                  <View style={styles.contentSection}>
                    <Text style={[styles.headingText, { color: theme.color }]}>Tayang Hari Ini</Text>
                    <ScrollView style={styles.contentScroll} horizontal={true}>
                      {
                        airingTodayTvShows.map((movie: Movie, key: number) => {
                          return (
                            <View key={key} style={styles.movieWrap}>
                              <Image source={movie.poster_path ? { uri: 'http://image.tmdb.org/t/p/w185/' + movie.poster_path } : require('../assets/images/image-default.png')} style={styles.movieImage} />
                            </View>
                          )
                        })
                      }
                    </ScrollView>
                  </View>
                </View>
              </>
          }
        </ScrollView>
      </View>
    </ApolloProvider>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  cover: {
    height: 500,
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: '#111',
  },
  coverImage: {
    height: '100%',
  },
  coverImageOverlay: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  content: {
    paddingHorizontal: 12,
  },
  contentSection: {
    marginVertical: 12,
  },
  contentScroll: {
    marginHorizontal: -4,
  },
  headingText: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  movieWrap: {
    marginHorizontal: 4,
  },
  movieImage: {
    width: 100,
    height: 150,
  },
})