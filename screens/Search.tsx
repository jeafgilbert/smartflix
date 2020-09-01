import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { RestLink } from 'apollo-link-rest'
import gql from 'graphql-tag'
import React, { FC, useContext, useEffect, useState } from 'react'
import { ApolloProvider } from 'react-apollo'
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, NativeSyntheticEvent, TextInputChangeEventData, View } from 'react-native'
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler'
import ThemeContext from '../contexts/ThemeContext'

interface SearchResult {
  media_type: string,
  id: number,
  title?: string,
  name?: number,
  overview?: string,
  poster_path?: string,
  backdrop_path?: string,
  profile_path?: string,
}

const restLink = new RestLink({ uri: 'https://api.themoviedb.org/3/' })

// setup your client
const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
})

const Search: FC = () => {
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
      setSearchResults(response.data.searchResults.results)

      setIsSearching(false)
      setIsSearched(true)
    })
  }

  const onKeywordsChange = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    const value = e.nativeEvent.text
    setKeywords(value)
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
              ? <ActivityIndicator color={theme.color} />
              : searchResults.length === 0
                ? <Text style={[styles.emptyText, { color: theme.color }]}>- Hasil pencarian kosong -</Text>
                : <FlatList
                  contentContainerStyle={styles.mainList}
                  data={searchResults}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => {
                    const imagePath = item.media_type === 'person' ? item.profile_path : item.poster_path
                    const title = item.media_type === 'person' ? item.name : item.title
                    const overview = item.overview ? item.overview.substr(0, 160) + ' ...' : ''

                    return (
                      <View style={styles.resultWrap}>
                        <Image source={imagePath ? { uri: 'http://image.tmdb.org/t/p/w185/' + imagePath } : require('../assets/images/image-default.png')} style={styles.resultImage} />
                        <View style={styles.resultDetailsWrap}>
                          <Text style={[styles.resultTitle, { color: theme.color }]}>{title}</Text>
                          <Text style={[styles.resultDesc, { color: theme.color }]}>{overview}</Text>
                        </View>
                      </View>
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
    marginLeft: 12,
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