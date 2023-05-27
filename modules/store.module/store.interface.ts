export default interface IStore {
  photoURL: string;
  storeName: string;
  country: string[];
  storeExternalLink: string;
  description?: string;
  howToUse?: { photoURL: string; title: string; description: string }[];
}
