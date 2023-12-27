import { describe, it, expect } from '@jest/globals';

import { trimText, trimAddress, trimTextByHeadTail } from './string';

describe('trimText', () => {
  it('trim English text when text length exceed `100`', async () => {
    const content =
      'Lorem ipsum, train, feed, love and evolve your very own mischievous little pet. Modernipsum dolor sit amet scuola romana neo-fauvism idealism carolingian, rococo de stijl mail art avant-garde conceptual art relational art. Lorem ipsum, train, feed, love and evolve your very own mischievous little pet. Modernipsum dolor sit amet scuola romana neo-fauvism idealism carolingian, rococo de stijl mail art avant-garde conceptual art relational art.';

    expect(trimText(content, 100)).toBe(`${content.slice(0, 100)}...`);
  });

  it('does not trim text when ltext ength shorter than `100`', async () => {
    const content = 'Lorem ipsum';
    expect(trimText(content, 100)).toStrictEqual(content);
  });

  it('trim text with leading space and tailing space', async () => {
    const content = ' Lorem ipsum ';
    expect(trimText(content, 100)).toBe('Lorem ipsum');
  });

  it('trim German text when text length exceed `100`', async () => {
    const content =
      'Man erzählt von dem ich mich an die Gurgel faßt wie ein Meuchelmörder, dann mein Herz näher angeht. Man erzählt von dem ich mich an die Gurgel faßt wie ein Meuchelmörder, dann mein Herz näher angeht. Man erzählt von dem ich mich an die Gurgel faßt wie ein Meuchelmörder, dann mein Herz näher angeht. Man erzählt von dem ich mich an die Gurgel faßt wie ein Meuchelmörder, dann mein Herz näher angeht. Man erzählt von dem ich mich an die Gurgel faßt wie ein Meuchelmörder, dann mein Herz näher angeht.';

    expect(trimText(content, 100)).toBe(
      `${[...content].slice(0, 100).join('')}...`,
    );
  });
});

describe('trimTextByHeadTail', () => {
  it('trim English text when text length exceed `4`', async () => {
    const content = 'aaaaa';

    expect(trimTextByHeadTail(content, 2, 2)).toBe('aa...aa');
  });

  it('does not trim text when text length shorter than `4`', async () => {
    const content = 'aa';
    expect(trimTextByHeadTail(content, 2, 2)).toBe('aa');
  });

  it('trim text with leading space and tailing space', async () => {
    const content = ' aa ';
    expect(trimTextByHeadTail(content, 2, 2)).toBe('aa');
  });

  it('trim German text when text length exceed `4`', async () => {
    const content = 'äääää';

    expect(trimTextByHeadTail(content, 2, 2)).toBe(`ää...ää`);
  });
});

describe('trimAddress', () => {
  it('trim address when address length exceed limit', async () => {
    const address = '0x6B24aE0ABbeb67058D07b891aF415f288eA57Cc7';

    expect(trimAddress(address)).toBe('0x6B24a...57Cc7');
  });
});
