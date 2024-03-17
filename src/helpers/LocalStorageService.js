export class LocalStorageService {
  static saveJSON(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static getJSON(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  static removeJSON(key) {
    localStorage.removeItem(key);
  }
}
