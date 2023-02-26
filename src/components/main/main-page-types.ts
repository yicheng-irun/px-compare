export interface ImageItem {
  name: string;
  /**
   * 本地文件路径
   */
  path: string;
  /**
   * 本地文件转成src后的路径
   */
  srcPath: string;
  size: number;
  type: string;
}

export default {}