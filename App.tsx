import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getapiData();
  }

  async getapiData() {
    try {
      let resp = await axios.get('https://reactnative.dev/movies.json');
      this.setState({ data: resp.data.movies, loading: false });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { data, loading } = this.state;
    return (
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            {data.map((item, index) => (
              <View key={item.id} style={[styles.movieContainer, { backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#e0e0e0' }]}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.movieYear}>Release Year: {item.releaseYear}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieContainer: {
    padding: 50,
    marginBottom: 25,
    borderRadius: 50,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  movieYear: {
    fontSize: 16,
    color: '#888',
  },
});

export default App;
