const generateKeywords = (str) => {
  // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
  // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  const strArray = str.split(" ").filter((word) => word);
  // let length = strArray.length,
  //   result = [strArray.slice()],
  //   c = new Array(length).fill(0),
  //   i = 1,
  //   k,
  //   p;

  // while (i < length) {
  //   if (c[i] < i) {
  //     k = i % 2 && c[i];
  //     p = strArray[i];
  //     strArray[i] = strArray[k];
  //     strArray[k] = p;
  //     ++c[i];
  //     i = 1;
  //     result.push(strArray.slice());
  //   } else {
  //     c[i] = 0;
  //     ++i;
  //   }
  // }
  // //result= ["Hai","Nam","HaiNam","NamHai","Hai Nam","Nam Hai"];
  // const results = [
  //   ...result[0],
  //   ...result.map((item) => item.join(" ")),
  //   ...result.map((item) => item.join("")),
  // ];
  return Array.from(new Set(strArray));
};

module.exports = { generateKeywords };
