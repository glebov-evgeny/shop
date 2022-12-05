import {
  getFirestore, collection, onSnapshot, query,
} from 'firebase/firestore';

export default async function getSuccessCode(item) {
  const db = getFirestore();
  const getData = query(collection(db, `${item.region}_cards_${item.nominal}`));
  let currentObj;
  await onSnapshot(getData, (querySnapshot) => {
    const response = [];
    querySnapshot.forEach((doc) => {
      response.push(doc.data());
    });
    // eslint-disable-next-line prefer-destructuring
    currentObj = response[0];
  });
  return currentObj;
}
