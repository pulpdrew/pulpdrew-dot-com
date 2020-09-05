export class TagColorService {

  private static colorList = ["blue", "green", "red", "purple", "orange", "teal"];
  private static colorMap = new Map<string, string>();

  private static getBaseColor(tag: string): string {
    if (!TagColorService.colorMap.has(tag)) {
      const colorIndex = TagColorService.colorMap.size % TagColorService.colorList.length;
      TagColorService.colorMap.set(tag, TagColorService.colorList[colorIndex]);
    }
    return TagColorService.colorMap.get(tag);
  }

  static getBgColor(tag: string): string {
    return `bg-${this.getBaseColor(tag)}-100`;
  }

  static getBorderColor(tag: string): string {
    return `border-${this.getBaseColor(tag)}-400`;
  }
}
