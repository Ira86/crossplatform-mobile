import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useCreatePostMutation } from '../../store/api/postsApi';
import { useSelector } from 'react-redux';

export const PostForm = ({ navigation, route }) => {
  const [postText, setPostText] = useState('');
  const [mutateAsync] = useCreatePostMutation();
  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);


  const handleCreatePost = async () => {
    const createdDate = String(new Date().toLocaleDateString());

    if (!loggedInAs || !loggedInAs.id) {
      console.error('User is not logged in or does not have an ID.');
      return;
    }

    const result = await mutateAsync({
      post: {
        text: postText,
        createdBy: loggedInAs.id,
        createdDate: createdDate,
      },
    });

    console.log('Post created successfully:', result);

    navigation.navigate('PostList');
  };

  return (
    <View>
      <TextInput
        placeholder="Skriv här..."
        value={postText}
        onChangeText={(text) => setPostText(text)}
        multiline={true}
        numberOfLines={4}
      />
      <Button title="Create post" onPress={handleCreatePost} />
    </View>
  );
};

export default PostForm;