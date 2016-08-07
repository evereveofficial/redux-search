export default class DataSource {
  constructor(searchFunc, config) {
    this.search = searchFunc;
    this.searchConfig = config;
  }
}
