import { FirebaseResponse } from "../interfaces/firebase.interface";

export function objectToArray<T, J>(firebaseObject: FirebaseResponse<J>): T[] {
  const tempArr: T[] = [];

  Object.entries(firebaseObject).forEach(([key, value]) => {
    let tempObj = {
      id: key,
      ...value,
    } as T;

    tempArr.push(tempObj);
  });

  return tempArr;
}

export function arrayToObject<T, J>(targetArr: J[]): T {
  let result = {} as T;

  targetArr.forEach((item: J) => {
    const id = item['id'];
    delete item['id'];

    result[id] = item;
  });

  return result;
}
