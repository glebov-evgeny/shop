import {
  getFirestore, collection, onSnapshot, query,
} from 'firebase/firestore';

export default async function getSuccessCode(item) {
  const db = getFirestore();
  const getData = await query(collection(db, `${item.region}_cards_${item.nominal}`));
  const response = [];
  onSnapshot(getData, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      response.push(doc.data());
    });
  });
  return response;
}
