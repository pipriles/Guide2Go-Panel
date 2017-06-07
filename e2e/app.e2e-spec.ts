import { Panel2Page } from './app.po';

describe('panel2 App', () => {
  let page: Panel2Page;

  beforeEach(() => {
    page = new Panel2Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
