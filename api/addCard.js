import { getFirestore, setDoc, doc } from 'firebase/firestore';

export default async function addCard(currentCardInformation) {
  const db = getFirestore();
  await setDoc(
    doc(
      db,
      `cards/${currentCardInformation.region}/nom_${currentCardInformation.nominal}`,
      `${currentCardInformation.id}`,
    ),
    currentCardInformation,
  );
}
