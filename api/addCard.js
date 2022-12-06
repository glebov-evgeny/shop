import { getFirestore, setDoc, doc } from 'firebase/firestore';

export default async function addCard(currentCardInformation) {
  const db = getFirestore();
  /* Добовляю карты по схеме коллекция: РЕГИОН_cards_НОМИНАЛ, документ: КАРТОЧКА.ID, контент: КАРТОЧКА */
  await setDoc(
    doc(db, `${currentCardInformation.region}_cards_${currentCardInformation.nominal}`, `${currentCardInformation.id}`),
    currentCardInformation,
  );
}
