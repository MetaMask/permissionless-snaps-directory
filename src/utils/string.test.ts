import { trimText, trimAddress, trimTextByHeadTail } from './string';
import { VALID_ACCOUNT_1 } from './test-utils';

describe('trimText', () => {
  it('trim text with default length `100` when parameter length is not provided', async () => {
    const content =
      'Lorem ipsum, train, feed, love and evolve your very own mischievous little pet. Modernipsum dolor sit amet scuola romana neo-fauvism idealism carolingian, rococo de stijl mail art avant-garde conceptual art relational art. Lorem ipsum, train, feed, love and evolve your very own mischievous little pet. Modernipsum dolor sit amet scuola romana neo-fauvism idealism carolingian, rococo de stijl mail art avant-garde conceptual art relational art.';

    expect(trimText(content)).toBe(`${content.slice(0, 100)}...`);
  });

  it('trim text with with the provided length', async () => {
    const content =
      'Lorem ipsum, train, feed, love and evolve your very own mischievous little pet. Modernipsum dolor sit amet scuola romana neo-fauvism idealism carolingian, rococo de stijl mail art avant-garde conceptual art relational art. Lorem ipsum, train, feed, love and evolve your very own mischievous little pet. Modernipsum dolor sit amet scuola romana neo-fauvism idealism carolingian, rococo de stijl mail art avant-garde conceptual art relational art.';

    expect(trimText(content, 50)).toBe(`${content.slice(0, 50)}...`);
  });

  it('does not trim text when provided text is empty', async () => {
    const content = '';

    expect(trimText(content, 50)).toStrictEqual(content);
  });

  it('does not trim text when text length shorter than given length', async () => {
    const content = 'Lorem ipsum';

    expect(trimText(content, 50)).toStrictEqual(content);
  });

  it('trim leading space and tailing space', async () => {
    const content = ' Lorem ipsum ';

    expect(trimText(content, 50)).toBe('Lorem ipsum');
  });

  it('trim German text', async () => {
    const content =
      'Man erzählt von dem ich mich an die Gurgel faßt wie ein Meuchelmörder, dann mein Herz näher angeht. Man erzählt von dem ich mich an die Gurgel faßt wie ein Meuchelmörder, dann mein Herz näher angeht. Man erzählt von dem ich mich an die Gurgel faßt wie ein Meuchelmörder, dann mein Herz näher angeht. Man erzählt von dem ich mich an die Gurgel faßt wie ein Meuchelmörder, dann mein Herz näher angeht. Man erzählt von dem ich mich an die Gurgel faßt wie ein Meuchelmörder, dann mein Herz näher angeht.';

    expect(trimText(content)).toBe(`${[...content].slice(0, 100).join('')}...`);
  });
});

describe('trimTextByHeadTail', () => {
  it('trim text when text length exceed the sum of parameters `heading` and `tailing`', async () => {
    const content = 'aaaaa';

    expect(trimTextByHeadTail(content, 2, 2)).toBe('aa...aa');
  });

  it('does not trim text when text length is not exceed the sum of parameters `heading` and `tailing`', async () => {
    const content = 'aa';

    expect(trimTextByHeadTail(content, 2, 2)).toBe('aa');
  });

  it('does not trim text when provided text is empty', async () => {
    const content = '';

    expect(trimTextByHeadTail(content, 5, 5)).toStrictEqual(content);
  });

  it('trim leading space and tailing space', async () => {
    const content = ' aa ';

    expect(trimTextByHeadTail(content, 2, 2)).toBe('aa');
  });

  it('trim German text', async () => {
    const content = 'äääää';

    expect(trimTextByHeadTail(content, 2, 2)).toBe(`ää...ää`);
  });
});

describe('trimAddress', () => {
  it('trim address', async () => {
    const address = VALID_ACCOUNT_1;

    expect(trimAddress(address)).toBe('0x6B24a...57Cc7');
  });
});
