export class DefaultResult {
  // tslint:disable-next-line: variable-name
  total_count: number;
  // tslint:disable-next-line: variable-name
  incomplete_results: boolean;
  items: Array<any>;
  error: string;
  page: number;
  title: string;
  single: string;

  constructor(title: string, single: string) {
    this.total_count = 0;
    this.page = 1;
    this.title = title;
    this.single = single;
  }
}
