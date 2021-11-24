const withFetch = async () => {
  const res = await fetch(
    'https://api.tvmaze.com/singlesearch/shows?q=24&embed=episodes'
  );
  const json = res.json();

  return json;
};

const unmockedFetch = global.fetch;

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            show: {
              name: '24',
              id: 167,
              image: {
                medium:
                  'https://static.tvmaze.com/uploads/images/medium_portrait/0/2330.jpg',
                original:
                  'https://static.tvmaze.com/uploads/images/original_untouched/0/2330.jpg',
              },
              _embedded: {
                episodes: [
                  {
                    id: 11891,
                    url: 'https://www.tvmaze.com/episodes/11891/24-1x01-1200-am-100-am',
                    name: '12:00 A.M. - 1:00 A.M.',
                    season: 1,
                    number: 1,
                    image: {
                      medium:
                        'https://static.tvmaze.com/uploads/images/medium_landscape/179/449048.jpg',
                      original:
                        'https://static.tvmaze.com/uploads/images/original_untouched/179/449048.jpg',
                    },
                    summary:
                      '<p>In the series pilot, a Federal agent is assigned to stop an assassination plot after just learning his daughter has sneaked out after midnight. Bauer: Kiefer Sutherland. Teri: Leslie Hope.</p>',
                  },
                ],
              },
            },
          },
        ]),
    });
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

describe('withFetch', () => {
  test('works', async () => {
    const json = await withFetch();
    expect(Array.isArray(json)).toEqual(true);
    expect(json.length).toEqual(1);
  });
  test('The show has at least one episode', async () => {
    const json = await withFetch();
    expect(json[0].show._embedded.episodes.length).toBeGreaterThan(0);
  });
});
