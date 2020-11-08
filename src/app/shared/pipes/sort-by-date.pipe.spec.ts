import { SortByDatePipe } from '../pipes/sort-by-date.pipe';

describe('SortByDatePipe', () => {
  it('create an instance', () => {
    const pipe = new SortByDatePipe(); 
    expect(pipe).toBeTruthy();
  });
});
