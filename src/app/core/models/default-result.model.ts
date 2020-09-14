export class DefaultResult {
  // tslint:disable-next-line: variable-name
  total_count: number;
  // tslint:disable-next-line: variable-name
  incomplete_results: boolean;
  items: Array<any>;
  error: string;
  page: number;

  constructor() {
    this.total_count = 0;
    this.page = 1;
  }
}
