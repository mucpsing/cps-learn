/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-04-02 12:14:23
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-04-22 22:59:50
 * @FilePath: \gsap-lenis-learn\src\components\MatrixCSS\PerspectiveTransform2.ts
 * @Description: 
 * @example:
 *  const ms = new PerspectiveTransform(testRef.current, 200, 200, false);
    ms.topLeft = { x: -100, y: 0 };
    const tr = ms.current.update();
 */

let aM: number[][] = [
  [0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
];
let bM: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
let _transformStyleName: string;
let _transformOriginDomStyleName: string;
let stylePrefix = "";

function setTransformStyleName() {
  const testStyle = document.createElement("div").style;
  stylePrefix = "webkitTransform" in testStyle ? "webkit" : "MozTransform" in testStyle ? "Moz" : "msTransform" in testStyle ? "ms" : "";
  _transformStyleName = stylePrefix ? `${stylePrefix}Transform` : "transform";
  _transformOriginDomStyleName = `-${stylePrefix.toLowerCase()}-transform-origin`;
}

export default class PerspectiveTransform {
  element: HTMLElement;
  style: CSSStyleDeclaration;
  computedStyle: CSSStyleDeclaration;
  width: number;
  height: number;
  useBackFacing: boolean;

  topLeft: { x: number; y: number };
  topRight: { x: number; y: number };
  bottomLeft: { x: number; y: number };
  bottomRight: { x: number; y: number };

  static useDPRFix = false;
  static dpr = 1;

  constructor(element: HTMLElement, width: number, height: number, useBackFacing?: boolean) {
    setTransformStyleName();

    this.element = element;
    this.style = element.style;
    this.computedStyle = window.getComputedStyle(element);
    console.log(this.computedStyle);
    this.width = width;
    this.height = height;
    this.useBackFacing = !!useBackFacing;

    this.topLeft = { x: 0, y: 0 };
    this.topRight = { x: width, y: 0 };
    this.bottomLeft = { x: 0, y: height };
    this.bottomRight = { x: width, y: height };
  }

  checkError(): number {
    if (this.hasDistancesError()) return 1;
    if (this.hasPolyonError()) return 2;
    return 0;
  }

  update(): string {
    console.log("update");
    const width = this.width;
    const height = this.height;

    let offsetX = 0;
    let offsetY = 0;
    const offset = this.computedStyle.getPropertyValue(_transformOriginDomStyleName);
    console.log({ offset });

    if (offset.includes("px")) {
      const parts = offset.split("px");
      offsetX = -parseFloat(parts[0]);
      offsetY = -parseFloat(parts[1]);
    } else if (offset.includes("%")) {
      const parts = offset.split("%");
      offsetX = (-parseFloat(parts[0]) * width) / 100;
      offsetY = (-parseFloat(parts[1]) * height) / 100;
    }

    const dst = [this.topLeft, this.topRight, this.bottomLeft, this.bottomRight];
    const arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7];

    for (let i = 0; i < 4; i++) {
      aM[i][0] = aM[i + 4][3] = i & 1 ? width + offsetX : offsetX;
      aM[i][1] = aM[i + 4][4] = i > 1 ? height + offsetY : offsetY;
      aM[i][6] = (i & 1 ? -offsetX - width : -offsetX) * (dst[i].x + offsetX);
      aM[i][7] = (i > 1 ? -offsetY - height : -offsetY) * (dst[i].x + offsetX);
      aM[i + 4][6] = (i & 1 ? -offsetX - width : -offsetX) * (dst[i].y + offsetY);
      aM[i + 4][7] = (i > 1 ? -offsetY - height : -offsetY) * (dst[i].y + offsetY);
      bM[i] = dst[i].x + offsetX;
      bM[i + 4] = dst[i].y + offsetY;
      aM[i][2] = aM[i + 4][5] = 1;
      aM[i][3] = aM[i][4] = aM[i][5] = 0;
      aM[i + 4][0] = aM[i + 4][1] = aM[i + 4][2] = 0;
    }

    const col: number[] = [];
    for (let j = 0; j < 8; j++) {
      for (let i = 0; i < 8; i++) col[i] = aM[i][j];
      for (let i = 0; i < 8; i++) {
        const row = aM[i];
        const kmax = Math.min(i, j);
        let sum = 0.0;
        for (let k = 0; k < kmax; k++) sum += row[k] * col[k];
        row[j] = col[i] -= sum;
      }

      let p = j;
      for (let i = j + 1; i < 8; i++) {
        if (Math.abs(col[i]) > Math.abs(col[p])) p = i;
      }

      if (p !== j) {
        for (let k = 0; k < 8; k++) {
          [aM[p][k], aM[j][k]] = [aM[j][k], aM[p][k]];
        }
        [arr[p], arr[j]] = [arr[j], arr[p]];
      }

      if (aM[j][j] !== 0.0) {
        for (let i = j + 1; i < 8; i++) aM[i][j] /= aM[j][j];
      }
    }

    for (let i = 0; i < 8; i++) arr[i] = bM[arr[i]];
    for (let k = 0; k < 8; k++) {
      for (let i = k + 1; i < 8; i++) arr[i] -= arr[k] * aM[i][k];
    }
    for (let k = 7; k >= 0; k--) {
      arr[k] /= aM[k][k];
      for (let i = 0; i < k; i++) arr[i] -= arr[k] * aM[i][k];
    }

    let style =
      `matrix3d(${arr[0].toFixed(9)},${arr[3].toFixed(9)},0,${arr[6].toFixed(9)},` +
      `${arr[1].toFixed(9)},${arr[4].toFixed(9)},0,${arr[7].toFixed(9)},0,0,1,0,` +
      `${arr[2].toFixed(9)},${arr[5].toFixed(9)},0,1)`;

    if (PerspectiveTransform.useDPRFix) {
      const dpr = PerspectiveTransform.dpr;
      style = `scale(${dpr},${dpr})perspective(1000px)${style}translateZ(${(1 - dpr) * 1000}px)`;
    }

    console.log("_transformStyleName: ", _transformStyleName);
    (this.style as any)[_transformStyleName] = style;
    return style;
  }

  private hasDistancesError(): boolean {
    const points = [
      [this.topLeft, this.topRight],
      [this.bottomLeft, this.bottomRight],
      [this.topLeft, this.bottomLeft],
      [this.topRight, this.bottomRight],
      [this.topLeft, this.bottomRight],
      [this.topRight, this.bottomLeft],
    ];

    for (const [p1, p2] of points) {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      if (Math.sqrt(dx * dx + dy * dy) <= 1) return true;
    }
    return false;
  }

  private getDeterminant(p0: { x: number; y: number }, p1: { x: number; y: number }, p2: { x: number; y: number }): number {
    return p0.x * p1.y + p1.x * p2.y + p2.x * p0.y - p0.y * p1.x - p1.y * p2.x - p2.y * p0.x;
  }

  private hasPolyonError(): boolean {
    const det1 = this.getDeterminant(this.topLeft, this.topRight, this.bottomRight);
    const det2 = this.getDeterminant(this.bottomRight, this.bottomLeft, this.topLeft);

    if (this.useBackFacing) {
      if (det1 * det2 <= 0) return true;
    } else {
      if (det1 <= 0 || det2 <= 0) return true;
    }

    const det3 = this.getDeterminant(this.topRight, this.bottomRight, this.bottomLeft);
    const det4 = this.getDeterminant(this.bottomLeft, this.topLeft, this.topRight);

    if (this.useBackFacing) {
      if (det3 * det4 <= 0) return true;
    } else {
      if (det3 <= 0 || det4 <= 0) return true;
    }

    return false;
  }
}
