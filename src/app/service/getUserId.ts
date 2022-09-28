import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Auth, createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
@Injectable({
  providedIn: 'root',
})
export class getUserId {
  //   firebaseConfig = {
  //     apiKey: 'AIzaSyA9uqZgo7amzAbW7q3u1FyDvKykzNB16J0',
  //     authDomain: 'ecommerce-68a32.firebaseapp.com',
  //     databaseURL: 'https://ecommerce-68a32-default-rtdb.firebaseio.com',
  //     projectId: 'ecommerce-68a32',
  //     storageBucket: 'ecommerce-68a32.appspot.com',
  //     messagingSenderId: '118234334613',
  //     appId: '1:118234334613:web:dfe4fe8a4f6c986f98629c',
  //   };
  // Initialize Firebase
  constructor() {}

  //   async login({ email, password }) {
  //     try {
  //       const user = await signInWithEmailAndPassword(
  //         this.authr,
  //         email,
  //         password
  //       );
  //       return user;
  //     } catch (e) {
  //       return null;
  //     }
  //   }

  //   logout() {
  //     return signOut(this.auth);
  //   }
}
