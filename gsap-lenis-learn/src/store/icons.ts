const svgFiles = import.meta.glob("@site/public/icons/skill-icons/*.svg", { eager: true, as: "url" });

/**
 * @description: 原地打乱数组的顺序，实现每次随机
 */
function shuffleArray<T>(array: T[]): T[] {
  // 注意这里用 let m = array.length 而不是 const
  for (let m = array.length; m > 0; m--) {
    // 生成 [0, m) 范围内的随机索引
    const randomIndex = Math.floor(Math.random() * m);
    // ES6 解构赋值交换元素
    [array[m - 1], array[randomIndex]] = [array[randomIndex], array[m - 1]];
  }
  return array;
}

export const skillIcons = shuffleArray(
  Object.keys(svgFiles).map((path) => {
    // const fileName = path.split("/").pop();
    // return fileName.replace(".svg", "");

    return path.split("/").pop() as string;
  })
);
