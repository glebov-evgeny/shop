import {
  getFirestore, collection, onSnapshot, query, where,
} from 'firebase/firestore';

export default async function getSuccessCode(item) {
  const db = getFirestore();
  const getData = await query(
    collection(db, `${item.region}_cards_${item.nominal}`),
    where('isActivated', '==', false),
  );
  const response = [];
  onSnapshot(getData, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      response.push(doc.data());
    });
  });
  return response;
}
