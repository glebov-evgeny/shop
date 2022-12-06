import {
  getFirestore, collection, onSnapshot, query, where,
} from 'firebase/firestore';

export default function getSuccessCode(item) {
  const db = getFirestore();
  const getData = query(collection(db, `${item.region}_cards_${item.nominal}`), where('isActivated', '==', false));
  onSnapshot(getData, (querySnapshot) => {
    const response = [];
    querySnapshot.forEach((doc) => {
      response.push(doc.data());
    });
    return response;
  });
}
