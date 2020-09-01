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

interface Person {
  popularity?: number,
  known_for_department?: string,
  name?: string,
  id: number,
  profile_path?: string,
  adult?: boolean,
  known_for?: Movie[]
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

const Home: FC = () => {
  const { theme } = useContext(ThemeContext)
  const [popularPeople, setPopularPeople] = useState<Person[]>([])

  useEffect(() => {
    client.query({ query }).then(response => {
      // Popular People
      setPopularPeople(response.data.popularPeople.results)
    })
  }, [])

  return (
    <ApolloProvider client={client}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.headingText, { color: theme.color }]}>Artis Populer</Text>
        <FlatList
          contentContainerStyle={styles.mainList}
          numColumns={4}
          data={popularPeople}
          renderItem={({ item }) => (
            <View style={styles.personWrap}>
              <Image source={{ uri: 'http://image.tmdb.org/t/p/w185/' + item.profile_path }} style={styles.personImage} />
              <Text style={[styles.personNameText, { color: theme.color }]}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </ApolloProvider>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 12,
  },
  headingText: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainList: {
    paddingBottom: 40,
    marginHorizontal: -4,
  },
  personWrap: {
    width: '25%',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  personImage: {
    height: 150,
  },
  personNameText: {
    fontSize: 15,
    textAlign: 'center',
  },
})