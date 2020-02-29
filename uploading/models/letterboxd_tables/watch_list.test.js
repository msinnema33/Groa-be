const db = require("../../../database/dbConfig.js");
const prepTestDB = require("../../../helpers/prepTestDB.js");

const { addToWatchList } = require("./watch_list.js");

beforeEach(prepTestDB);
beforeEach(async () => await db("user_letterboxd_watchlist").del());

const watch_list1 = {
  date: new Date("2012-09-20" + "Z"),
  name: "Shame",
  year: Number("2011"),
  letterboxd_uri: "https://letterboxd.com/film/shame-2011/",
  user_id: Number(2)
};
const watch_list2 = {
  date: new Date("2012-09-20" + "Z"),
  name: "Moneyball",
  year: Number(2011),
  letterboxd_uri: "https://letterboxd.com/film/moneyball/",
  user_id: Number(2)
};

describe("letterboxd watched_list model", () => {
  it("should insert the provided watch_list into the db", async () => {
    let watch_list = await addToWatchList(watch_list1);
    expect(watch_list.name).toBe("Shame");
    expect(watch_list.year).toBe(2011);

    watch_list = await addToWatchList(watch_list2);
    expect(watch_list.name).toBe("Moneyball");
    expect(watch_list.year).toBe(2011);

    let watchList = await db("user_letterboxd_watchlist");
    expect(watchList).toHaveLength(2);
  });

  // will continue to add tests and model functions if more functionality is needed.
});
