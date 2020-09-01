import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { RestLink } from 'apollo-link-rest'
import gql from 'graphql-tag'
import React, { FC, useContext, useState } from 'react'
import { ApolloProvider, graphql } from 'react-apollo'
import { ActivityIndicator, FlatList, Image, Keyboard, NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputChangeEventData, View } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import ThemeContext from '../contexts/ThemeContext'

interface SearchResult {
  media_type: string,
  id: number,
  popularity?: number,
  vote_count?: number,
  video?: boolean,
  poster_path?: string,
  adult?: boolean,
  backdrop_path?: string,
  original_language?: string,
  original_title?: string,
  genre_ids?: string[],
  title?: string,
  vote_average?: number,
  overview?: string,
  release_date?: string,
  first_air_date?: string,
  name?: string,
  origin_country?: string[],
  profile_path?: string,
}

const restLink = new RestLink({ uri: 'https://api.themoviedb.org/3/' })

// setup your client
const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
})

interface Props {
  route: any
  navigation: any,
}

const Search: FC<Props> = ({ route, navigation }) => {
  const { theme } = useContext(ThemeContext)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [keywords, setKeywords] = useState<string>('')
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [isSearched, setIsSearched] = useState<boolean>(false)

  const search = () => {
    if (keywords.trim().length === 0) {
      return
    }

    setSearchResults([])
    setIsSearching(true)
    Keyboard.dismiss()

    const query = gql`
      query searchResults {
        searchResults @rest(type: "SearchResults", path: "search/multi?api_key=4a49de9b6809da00e4fddaf84e624664&language=en-US&query=${keywords.trim()}&page=1") {
          page
          total_results
          total_pages
          results
        }
      }
    `

    client.query({ query }).then(response => {
      client.resetStore()
      setSearchResults(response.data.searchResults.results)

      setIsSearching(false)
      setIsSearched(true)
    })
  }

  const onKeywordsChange = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    const value = e.nativeEvent.text
    setKeywords(value)
  }

  const goToMovie = (searchResult: SearchResult) => {
    navigation.navigate('Movie', { movie: searchResult })
  }

  const goToTvShow = (searchResult: SearchResult) => {
    navigation.navigate('TvShow', { tvShow: searchResult })
  }

  const goToPerson = (searchResult: SearchResult) => {
    navigation.navigate('Person', { person: searchResult })
  }

  const goToDetailScreen = (mediaType: string, searchResult: SearchResult) => {
    switch (mediaType) {
      case 'movie':
        goToMovie(searchResult)
        break
      case 'tv':
        goToTvShow(searchResult)
        break
      case 'person':
        goToPerson(searchResult)
        break
    }
  }

  return (
    <ApolloProvider client={client}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.inputWrap}>
          <TextInput style={[styles.textInput, { color: theme.color }]} value={keywords} onChange={onKeywordsChange} placeholder={'Kata kunci'} />
          <TouchableOpacity onPress={search} style={styles.button}>
            <Text style={[styles.buttonText]}>Cari</Text>
          </TouchableOpacity>
        </View>
        {
          !isSearched
            ? null
            : isSearching
              ? <ActivityIndicator style={styles.activityIndicator} size={32} color={theme.color} />
              : searchResults.length === 0
                ? <Text style={[styles.emptyText, { color: theme.color }]}>- Hasil pencarian kosong -</Text>
                : <FlatList
                  contentContainerStyle={styles.mainList}
                  data={searchResults}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => {
                    const imagePath = item.media_type === 'person' ? item.profile_path : item.poster_path
                    const title = item.media_type === 'person' ? (item.name ? item.name : '(Unamed)') : (item.title ? item.title : '(Untitled)')
                    const overview = item.overview ? item.overview.substr(0, 160) + ' ...' : ''

                    return (
                      <TouchableWithoutFeedback onPress={() => goToDetailScreen(item.media_type, item)} style={styles.resultWrap}>
                        <Image source={imagePath ? { uri: 'http://image.tmdb.org/t/p/w185/' + imagePath } : require('../assets/images/image-default.png')} style={styles.resultImage} />
                        <View style={styles.resultDetailsWrap}>
                          <Text style={[styles.resultTitle, { color: theme.color }]}>{title}</Text>
                          <Text style={[styles.resultDesc, { color: theme.color }]}>{overview}</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    )
                  }}
                />
        }
      </View>
    </ApolloProvider>
  )
}

export default Search

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
  inputWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textInput: {
    flexGrow: 1,
    paddingHorizontal: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 50,
    marginLeft: 10,
    backgroundColor: '#ff165a',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  activityIndicator: {
    marginTop: 30,
  },
  emptyText: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'italic',
  },
  mainList: {
    paddingBottom: 40,
  },
  resultWrap: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  resultImage: {
    width: 100,
    height: 150,
  },
  resultDetailsWrap: {
    marginLeft: 16,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  resultDesc: {
    marginTop: 2,
    fontSize: 16,
  },
})