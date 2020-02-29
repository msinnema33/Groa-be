const db = require("../../../database/dbConfig.js");
const prepTestDB = require("../../../helpers/prepTestDB.js");

const { addReview } = require("./reviews.js");

beforeEach(prepTestDB);
beforeEach(async () => await db("user_letterboxd_reviews").del());

const review1 = {
  date: new Date("2012-09-20" + "Z"),
  name: "Reservoir Dogs",
  year: Number("1992"),
  rating: "3.5" * 1,
  user_id: Number(2),
  letterboxd_uri: "https://letterboxd.com/tabula_rasta/film/reservoir-dogs/",
  rewatch: "",
  review:
    "No film before or since has embraced nihilism so willingly and made you enjoy it so much (hopefully, to some shame.) I'm not convinced there is any point to this movie but to be a movie, and that job it does quite well and provides a little context to Tarantino's later films.",
  tags: "",
  watched_date: ""
};

const review = {
  rating: null
};
const review2 = {
  date: new Date("2012-09-20" + "Z"),
  name: "Singin' in the Rain",
  year: Number("1952"),
  rating: review.rating === null ? null : review.rating * 1,
  user_id: Number(2),
  letterboxd_uri:
    "https://letterboxd.com/tabula_rasta/film/singin-in-the-rain/",
  rewatch: "",
  review:
    "The best of comedy, joy and wonder, distilled to perfection. It took me half an hour to wipe the smile off my face; this is a must-see classic.",
  tags: "",
  watched_date: ""
};

describe("letterboxd reviews model", () => {
  it("should insert the provided rating into the db", async () => {
    let rating = await addReview(review1);
    expect(rating.name).toBe("Reservoir Dogs");
    expect(rating.year).toBe(1992);
    expect(rating.rating).toBe(3.5);

    rating = await addReview(review2);
    expect(rating.name).toBe("Singin' in the Rain");
    expect(rating.year).toBe(1952);
    expect(rating.rating).toBe(null);

    let reviews = await db("user_letterboxd_reviews");
    expect(reviews).toHaveLength(2);
  });

  // will continue to add tests and model functions if more functionality is needed.
});
