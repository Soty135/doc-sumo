const admin = require('firebase-admin');

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

async function saveSummary({ fileName, format, focus, summaryText }) {
  const docRef = await db.collection('summaries').add({
    fileName: fileName || 'Untitled',
    format: format || 'Executive Bullet Points',
    focus: focus || 'General Summary',
    summaryText,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  return docRef.id;
}

async function getRecentSummaries(limit = 10) {
  const snapshot = await db
    .collection('summaries')
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      summaryText: data.summaryText,
      fileName: data.fileName,
      format: data.format,
      focus: data.focus,
      createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
    };
  });
}

module.exports = { saveSummary, getRecentSummaries };
