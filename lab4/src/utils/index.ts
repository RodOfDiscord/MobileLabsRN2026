export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Б';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ', 'ЕБ', 'ЗБ', 'ЙБ'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const formatDate = (timestamp?: number) => {
  if (!timestamp) return 'Невідомо';
  // convert expo file system modification time to Date
  // FileSystem info typically returns seconds, react native needs ms
  // Let's check expo docs: "modificationTime: Number (seconds since epoch)"
  return new Date(timestamp * 1000).toLocaleString('uk-UA', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
};
