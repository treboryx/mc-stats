export function toProperCase(str: string) {
  return str.replace(/([^\W_]+[^\s-]*) */g, function (txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function size(obj: object) {
  let size = 0,
    key: any;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}

export const camelCase = (val: string) => {
  if (val.includes(' ')) {
    const t = val.split(' ');
    const res = [];
    res.push(t[0]);
    for (let k = 1; t.length > k; k++) {
      res.push(toProperCase(t[k]));
    }
    return res.join('');
  } else {
    return val;
  }
};

export const convertSeconds = (seconds: number) => {
  return (
    Math.floor(seconds / 1440) +
    'D ' +
    Math.floor(((seconds / 1440) % 1) * 24) +
    'H ' +
    Math.floor(((seconds / 60) % 1) * 60) +
    'M '
  );
};
