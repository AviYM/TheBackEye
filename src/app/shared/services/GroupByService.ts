export class GroupByService {
  static groupBy<T>(itemList: T[], keyGetter: (item: T) => string): Map<string, T[]> {
    const map = new Map();
    itemList.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
}
