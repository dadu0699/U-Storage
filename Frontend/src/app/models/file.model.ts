export class File {
  public fileID: number;
  public name: string;
  public type: string;
  public shared: boolean;
  public mimetype: string;
  public thumbnail: string;
  public filesize: string;
  public userID: number;

  public base64: string | ArrayBuffer | null;

  constructor(fileID: number, name: string) {
    this.fileID = fileID;
    this.name = name;
    this.type = '';
    this.shared = false;
    this.mimetype = '';
    this.thumbnail = '';
    this.filesize = '';
    this.userID = 0;

    this.base64 = '';
  }

  public imageTypes(): string[] {
    return ['jpg', 'jpeg', 'png'];
  }

  public fileTypes(): string[] {
    return ['txt', 'pdf'];
  }

  public assignType() {
    if (this.imageTypes().includes(this.mimetype)) {
      this.type = 'image';
    } else {
      this.type = 'file';
    }
  }

  public assignSize(size: number) {
    if (size / 1073741824 >= 1) {
      this.filesize = `${(Math.round(size / 1073741824 * 100) / 100).toFixed(2)}GB`
    } else if (size / 1048576 >= 1) {
      this.filesize = `${(Math.round(size / 1048576 * 100) / 100).toFixed(2)}MB`
    } else if (size / 1024 >= 1) {
      this.filesize = `${(Math.round(size / 1024 * 100) / 100).toFixed(2)}KB`
    } else {
      this.filesize = `${(Math.round(size * 100) / 100).toFixed(2)}B`
    }
  }
}
