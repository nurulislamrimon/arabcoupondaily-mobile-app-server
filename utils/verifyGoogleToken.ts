////////////]=========================
import admin from "firebase-admin";
import serviceAccount from "../mena-coupon-firebase-adminsdk.json";

// ==============================verify firebase token
const verifyGoogleToken = async (token: string) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as unknown as string),
    });
  }
  try {
    return await admin.auth().verifyIdToken(token);
  } catch (error) {
    throw error;
  }
};

export default verifyGoogleToken;
