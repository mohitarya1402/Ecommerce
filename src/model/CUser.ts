export class CUser {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpiratioinDate: Date
  ) {}
  get token() {
    if (
      !this._tokenExpiratioinDate ||
      new Date() > this._tokenExpiratioinDate
    ) {
      return null;
    } else {
      return this._token;
    }
  }
}
