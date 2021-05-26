/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable array-callback-return */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { db } from '../lib/firebase.prod.js';

export const errorCatch = (error) => {
  let errorMessage = error;

  if (error.code === 'storage/unknown') {
    errorMessage = 'Ocorreu um erro desconhecido.';
  } else if (error.code === 'storage/object-not-found') {
    errorMessage =
      'Não é possivel encontrar este arquivo em nosso banco de dados!';
  } else if (error.code === 'permission-denied') {
    errorMessage = 'Você não possui permisão para realizar essa ação!';
  } else {
    errorMessage = error.message;
  }

  console.log('error', error);
  console.log('error code', error.code);

  return errorMessage;
};

export function CreatePendingUser(
  data,
  checkSuccess,
  checkError,
) {
  const array = [];
  const date = new Date();
  const batch = db.batch();
  data.array.map((item) => {
    if (item?.id && item.id) {
      const pendingUsers = db.collection('users').doc(item.id);
      batch.update(pendingUsers, {
        type: item.type,
        creation: { start: date - 1, end: 0 },
        status: 'Ativo',
        access: item.access,
        permissions: item.access,
        image: item.icon,
      });
    } else {
      const pendingUsers = db.collection('users').doc(item.email);
      batch.set(pendingUsers, {
        email: item.email,
        type: item.type,
        creation: { start: date - 1, end: 0 },
        status: 'Aguardando Autenticação',
        access: 'admin',
        permissions: item.access,
        name: '',
        image: item.icon,
        uid: '',
      });
    }
    array.push({
      email: item.email,
      type: item.type,
      creation: date,
      status: 'Aguardando Autenticação',
      access: 'admin',
      permissions: item.access,
      name: '',
      image: item.icon,
      uid: '',
    });
  });

  batch
    .commit()
    .then(() => {
      checkSuccess(array);
    })
    .catch((error) => {
      checkError(errorCatch(error));
    });
}

export function AddUserData(
  data,
  uid,
  checkSuccess,
  checkError,
) {
  const userRef = db.collection('users').doc(uid);

  userRef
    .update({
      ...data,
    })
    .then(() => {
      checkSuccess('Document successfully updated!');
    })
    .catch((error) => {
      checkError(errorCatch(error));
      console.error('Error updating document: ', error);
    });
}

export function GetUserData(
  user,
  checkSuccess,
  checkError,
) {
  const usersRef = db.collection('users').doc(user.uid);
  const date = new Date();

  function checkPendingUser() {
    const usersEmailRef = db.collection('users').doc(user.email);
    usersEmailRef
      .get()
      .then((docSnapshots) => {
        if (docSnapshots.exists) {
          const docSnapshot = docSnapshots.data();
          db.collection('users')
            .doc(user.uid)
            .set({
              uid: user.uid,
              email: user.email,
              type: docSnapshot?.type,
              creation: { start: date - 1, end: 0 },
              status: 'Ativo',
              access: docSnapshot?.access,
              image: docSnapshot?.image,
              name: '',
            })
            .then(() => {
              checkSuccess(
                {
                  uid: user.uid,
                  email: user.email,
                  type: docSnapshot?.type,
                  creation: { start: date - 1, end: 0 },
                  status: 'Ativo',
                  access: docSnapshot?.access,
                  name: '',
                  image: docSnapshot?.image,
                },
                user,
              );
              usersEmailRef.delete().then(() => console.log('user deleted'));
            })
            .catch((err) => {
              checkError(errorCatch(err));
            });
        } else {
          usersRef
            .set({
              email: user.email,
              name: '',
              uid: user.uid,
              info: {},
            })
            .then(() => {
              checkSuccess(
                {
                  email: user.email,
                  uid: user.uid,
                  name: '',
                  info: {},
                },
                user,
                true,
              );
            })
            .catch((err) => {
              checkError(errorCatch(err));
            });
        }
      })
      .catch((err) => {
        checkError(errorCatch(err));
      });
  }

  usersRef
    .get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        checkSuccess(docSnapshot.data(), user);
      } else {
        checkPendingUser();
      }
    })
    .catch((error) => {
      checkError(errorCatch(error));
    });
}

export function SeeIfUserExists(
  email,
  checkSuccess,
  checkError,
) {
  const usersRef = db.collection('users');

  usersRef
    .where('email', '==', email)
    .get()
    .then(function (querySnapshot) {
      let response = [false, false];
      querySnapshot.forEach(function (doc) {
        const SeeIfHasBeenAdded = doc.data() && doc.data()?.permissions ? true : false;
        if (doc.id !== email) response = [doc.id, SeeIfHasBeenAdded];
      });
      checkSuccess(response);
    })
    .catch((error) => {
      checkError(errorCatch(error));
    });
}

export function GetAllUsersCompany(
  access,
  checkSuccess,
  checkError,
) {
  const usersRef = db.collection('users');

  usersRef
    .where('access', '==', access)
    .get()
    .then(function (querySnapshot) {
      const response = [];
      querySnapshot.forEach(function (doc) {
        const docx = doc.data();
        if (docx?.creation) {
          docx.end = docx.creation.end;
          docx.creation = docx.creation.start;
        }
        response.push(docx);
      });
      checkSuccess(response);
    })
    .catch((error) => {
      checkError(errorCatch(error));
    });
}
