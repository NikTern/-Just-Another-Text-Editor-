import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// // Done: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => {
//   const jateDb = await openDB('jate', 1);
//   const tx = jateDb.transaction('jate', 'readwrite');
//   const store = tx.objectStore('jate');
//   store.add({ content });
//   await tx.done;
// };

// // Done: Add logic for a method that gets all the content from the database
// export const getDb = async () => {
//   const jateDb = await openDB('jate', 1);
//   const tx = jateDb.transaction('jate', 'readonly');
//   const store = tx.objectStore('jate');
//   const request = store.getAll();
//   const result = await request;
//   console.log('result.value', result);
//   return result;
// };

// Implement the logic to add content to the database
export const putDb = async (content) => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    await store.clear(); // Clear the store before adding new content
    await store.add({ content: content });
    console.log('Content added to the database');
  } catch (error) {
    console.error('Error adding content to the database:', error);
  }
};

// Implement the logic to get all content from the database
export const getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const allContent = await store.getAll();
    return allContent.length > 0 ? allContent[0].content : null;
  } catch (error) {
    console.error('Error getting content from the database:', error);
    return null;
  }
};

initdb();
