/**
 * @see https://qiita.com/tronicboy/items/69e4ddb03c10f53ff18c
 */
export function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', (event) =>
      resolve(event.target?.result as ArrayBuffer)
    );
    reader.addEventListener('error', (error) => reject(error));
    reader.readAsArrayBuffer(file);
  });
}
