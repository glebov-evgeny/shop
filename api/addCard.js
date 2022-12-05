import { getFirestore, setDoc, doc } from 'firebase/firestore';

export default async function addCard(currentCardInformation) {
  const db = getFirestore();
  await setDoc(
    doc(db, `${currentCardInformation.region}_cards_${currentCardInformation.nominal}`, `${currentCardInformation.id}`),
    currentCardInformation,
  );
}
