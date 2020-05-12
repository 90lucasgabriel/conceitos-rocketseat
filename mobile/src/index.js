import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      console.log('response', response.data);
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `Projeto ${Date.now()}`,
      owner: 'Lucas',
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({item: project}) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={handleAddProject}>
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159C1',
  },

  project: {
    color: '#FFFFFF',
    fontSize: 30,
  },

  button: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
