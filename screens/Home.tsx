import React, { FC, useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import ThemeContext from '../contexts/ThemeContext'

interface Movie {
  id: number
}

const Home: FC = () => {
  const { theme } = useContext(ThemeContext)
  const [activeCategory, _setActiveCategory] = useState<string>('movies')
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])

  useEffect(() => {
    
  }, [])

  const toggleCategory = (category: string) => {
    if (category === 'movies') {
    }
    else if (category === 'tv-series') {
    }

    setActiveCategory(category)
  }

  const setActiveCategory = (category: string) => {
    _setActiveCategory(category)
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.categoriesWrap}>
          <TouchableWithoutFeedback onPress={() => toggleCategory('movies')} style={[styles.categoryButton, { borderColor: activeCategory === 'movies' ? theme.tintColorActive : theme.tintColor }]}>
            <Text style={[styles.categoryButtonText, { color: activeCategory === 'movies' ? theme.tintColorActive : theme.tintColor }]}>Film</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => toggleCategory('tv-series')} style={[styles.categoryButton, { borderColor: activeCategory === 'tv-series' ? theme.tintColorActive : theme.tintColor }]}>
            <Text style={[styles.categoryButtonText, { color: activeCategory === 'tv-series' ? theme.tintColorActive : theme.tintColor }]}>Serial TV</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.cover}></View>
        <View style={styles.content}>
          <View style={styles.contentSection}>
            <Text style={[styles.headingText, { color: theme.color }]}>Peringkat Teratas</Text>
            <ScrollView horizontal={true}>
              {
                topRatedMovies.map((movie: Movie, key: number) => {
                  return (
                    <View key={key}><Text>Test</Text></View>
                  )
                })
              }
            </ScrollView>
          </View>
          <View style={styles.contentSection}>
            <Text style={[styles.headingText, { color: theme.color }]}>Trending</Text>

          </View>
          <View style={styles.contentSection}>
            <Text style={[styles.headingText, { color: theme.color }]}>Segera</Text>

          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  categoriesWrap: {
    position: 'absolute',
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
    height: 300,
    marginBottom: 20,
  },
  content: {
    paddingHorizontal: 12,
  },
  contentSection: {
    height: 400,
  },
  headingText: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
})