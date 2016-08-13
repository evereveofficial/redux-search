export default class DataSource {
  constructor(searchFunc, config) {
    this.search = searchFunc;
    this.initialSearchQuery = config;
  }
}
