import { createApi } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  doc,
  deleteDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../firebase-config";

const firebaseBaseQuery = async ({ baseUrl, url, method, body }) => {
  switch (method) {
    case "GET": {
      const snapshot = await getDocs(collection(db, url));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return { data };
    }

    case "POST": {
      const docRef = await addDoc(collection(db, url), body);
      return { data: { id: docRef.id, ...body } };
    }

    case "DELETE": {
      const docDelRef = await deleteDoc(doc(db, url, body));
      return { data: { id: docDelRef } };
    }

    case "PUT": {
      await updateDoc(doc(db, url, body.id), body);
      return { data: { ...body } };
    }

    default:
      throw new Error(`Unhandled method ${method}`);
  }
};

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: firebaseBaseQuery,
  tagTypes: ["posts"],
  endpoints: (builder) => ({
    // För att skapa en ny user. Anropas såhär createUser({ user: { firstName: firstName, lastName: lastName }})
    createPost: builder.mutation({
      query: ({ post }) => ({
        baseUrl: "",
        url: "posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["posts"],
    }),
    // För att hämta alla befintliga users
    getPosts: builder.query({
      query: () => ({
        baseUrl: "",
        url: "posts",
        method: "GET",
        body: "",
      }),
      providesTags: ["posts"],
    }),
    // För att radera en user baserat på id. Anropas såhär: deleteUser(id)
    deleteUser: builder.mutation({
      query: (id) => ({
        baseUrl: "",
        url: "posts",
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["posts"],
    }),
  }),
});

// Exportera våra Queries och Mutations här.
export const {
  useDeleteUserMutation,
  useCreatePostMutation,
  useGetPostsQuery,
} = postsApi;