//1.
db.listings.find().limit(2)
/*
{"_id":{"$oid":"61adb30321e54e81f7eeb715"},
"id":2595,
"listing_url":"https://www.airbnb.com/rooms/2595",
"scrape_id":{"$numberLong":"20211102175544"},
"last_scraped":"2021-11-03",
"name":"Skylit Midtown Castle",
"description":"Beautiful, spacious skylit studio in the heart of Midtown, Manhattan. <br /><br />STUNNING SKYLIT STUDIO / 1 BED + SINGLE / FULL BATH / FULL KITCHEN / FIREPLACE / CENTRALLY LOCATED / WiFi + APPLE TV / SHEETS + TOWELS<br /><br /><b>The space</b><br />- Spacious (500+ft²), immaculate and nicely furnished & designed studio.<br />- Tuck yourself into the ultra comfortable bed under the skylight. Fall in love with a myriad of bright lights in the city night sky. <br />- Single-sized bed/convertible floor mattress with luxury bedding (available upon request).<br />- Gorgeous pyramid skylight with amazing diffused natural light, stunning architectural details, soaring high vaulted ceilings, exposed brick, wood burning fireplace, floor seating area with natural zafu cushions, modern style mixed with eclectic art & antique treasures, large full bath, newly renovated kitchen, air conditioning/heat, high speed WiFi Internet, and Apple TV.<br />- Centrally located in the heart of Midtown Manhattan","neighborhood_overview":"Centrally located in the heart of Manhattan just a few blocks from all subway connections in the very desirable Midtown location a few minutes walk to Times Square, the Theater District, Bryant Park and Herald Square.",
"picture_url":"https://a0.muscache.com/pictures/f0813a11-40b2-489e-8217-89a2e1637830.jpg",
"host_id":2845,
"host_url":"https://www.airbnb.com/users/show/2845",
"host_name":"Jennifer","host_since":"2008-09-09",
"host_location":"New York, New York, United States",
"host_about":"A New Yorker since 2000! My passion is creating beautiful, unique spaces where unforgettable memories are made. It's my pleasure to host people from around the world and meet new faces. Welcome travelers! \n\nI am a Sound Therapy Practitioner and Kundalini Yoga & Meditation teacher. I work with energy and sound for relaxation and healing, using Symphonic gong, singing bowls, tuning forks, drums, voice and other instruments.",
"host_response_time":"a few days or more",
"host_response_rate":"35%",
"host_acceptance_rate":"18%",
"host_is_superhost":"f",
"host_thumbnail_url":"https://a0.muscache.com/im/pictures/user/50fc57af-a6a3-4e88-8f16-efd6cac7c9bc.jpg?aki_policy=profile_small",
"host_picture_url":"https://a0.muscache.com/im/pictures/user/50fc57af-a6a3-4e88-8f16-efd6cac7c9bc.jpg?aki_policy=profile_x_medium",
*/

//2.
db.listings.distinct('host_name')
/*
NaN,
123,
475,
,
'Cil,
(Ari) HENRY LEE,
(Email hidden by Airbnb),
-TheQueensCornerLot,
2018Serenity,
235 Bainbridge,
420spa,
48Lex,
5th And 55th,
@ Art House Monique,
*/

//3.
db.listings.find({host_name:'Adelma'},{listing_url : 1, name:1, host_name : 1, _id : 0})
/*
[
  {
 listing_url: 'https://www.airbnb.com/rooms/20390046',
 name: 'PRIVATE ROOM IN SHARED APARTMENT, UN VICINITY',
 host_name: 'Adelma'
  },
  {
 listing_url: 'https://www.airbnb.com/rooms/41999901',
 name: 'GORGEOUS PRIVATE ROOM IN ELEGANT SHARED APARTMENT',
 host_name: 'Adelma'
 */

//4.
db.listings.find({host_name:{$in : ["Aamir", "Addie", "Aaron"]}},{name : 1, host_name : 1, neighbourhood_cleansed : 1, price : 1, _id : 0}).sort({host_name : 1})
/*
{ "name" : "Entire 1 Bedroom Apartment in New York City", "host_name" : "Aamir", "neighbourhood_cleansed" : "Kingsbridge", "price" : "$85.00" }
{ "name" : "Private Clinton Hill, Brooklyn Apt", "host_name" : "Aaron", "neighbourhood_cleansed" : "Clinton Hill", "price" : "$135.00" }
{ "name" : "Great studio apt in midtown west!", "host_name" : "Aaron", "neighbourhood_cleansed" : "Chelsea", "price" : "$502.00" }
{ "name" : "Quiet room w/ 2 beds +light near subway+ museums", "host_name" : "Aaron", "neighbourhood_cleansed" : "East Harlem", "price" : "$110.00" }
{ "name" : "Big quiet Sunny room in Upper East Side", "host_name" : "Aaron", "neighbourhood_cleansed" : "East Harlem", "price" : "$110.00" }
{ "name" : "Bushwick Artists Loft", "host_name" : "Aaron", "neighbourhood_cleansed" : "Williamsburg", "price" : "$50.00" }
{ "name" : "Quintessential Brooklyn...!!", "host_name" : "Aaron", "neighbourhood_cleansed" : "Boerum Hill", "price" : "$167.00" }
{ "name" : "Perfect Bowery Getaway w/Balcony", "host_name" : "Aaron", "neighbourhood_cleansed" : "Lower East Side", "price" : "$205.00" }
{ "name" : "1 BR in Spacious 4 BR duplex", "host_name" : "Aaron", "neighbourhood_cleansed" : "Bushwick", "price" : "$38.00" }
{ "name" : "Large Sunny Private Bedroom", "host_name" : "Aaron", "neighbourhood_cleansed" : "Gowanus", "price" : "$130.00" }
{ "name" : "Funky, Quiet, Safe EV Walk-Up", "host_name" : "Aaron", "neighbourhood_cleansed" : "East Village", "price" : "$140.00" }
{ "name" : "1BR w/roof: Williamsburg, Brooklyn", "host_name" : "Aaron", "neighbourhood_cleansed" : "Williamsburg", "price" : "$103.00" }
{ "name" : "4 Bedroom Downtown Brooklyn", "host_name" : "Aaron", "neighbourhood_cleansed" : "Clinton Hill", "price" : "$300.00" }
{ "name" : "Spacious & quiet NYC Harlem 1-bed apt! No stairs!", "host_name" : "Aaron", "neighbourhood_cleansed" : "Harlem", "price" : "$190.00" }
{ "name" : "Private room in East Village Apt.", "host_name" : "Aaron", "neighbourhood_cleansed" : "Lower East Side", "price" : "$90.00" }
{ "name" : "Sunny apartment in Brooklyn brownstone", "host_name" : "Aaron", "neighbourhood_cleansed" : "Clinton Hill", "price" : "$200.00" }
{ "name" : "Cozy Room Bushwick Artist Loft", "host_name" : "Aaron", "neighbourhood_cleansed" : "Williamsburg", "price" : "$40.00" }
{ "name" : "Enjoy my apartment for the summer!", "host_name" : "Aaron", "neighbourhood_cleansed" : "Washington Heights", "price" : "$65.00" }
{ "name" : "Beautiful private room in East Village, NYC", "host_name" : "Aaron", "neighbourhood_cleansed" : "East Village", "price" : "$99.00" }
{ "name" : "Comfy room seconds from 2,3,5 trains", "host_name" : "Aaron", "neighbourhood_cleansed" : "Crown Heights", "price" : "$40.00" }
*/

//5.
db.listings.find({neighbourhood_group_cleansed : "Brooklyn", bedrooms : {$gte : "2"}}, {name : 1, neighbourhood_cleansed : 1, bedrooms : 1, price : 1, _id : 0}).sort({review_scores_rating : -1}).limit(10)
/*
[
  {
 name: 'Beautiful Row House Steps From Park',
 neighbourhood_cleansed: 'Windsor Terrace',
 bedrooms: 4,
 price: '$250.00'
  },
  {
 name: 'SUPER BOWL Brooklyn Duplex Apt!!',
 neighbourhood_cleansed: 'Clinton Hill',
 bedrooms: 3,
 price: '$6,500.00'
  },
*/

//6.
var groupby = {_id: "$host_name", listingCount: {$sum: 1}}
db.listings.aggregate([{$group: groupby}])
/*
{ "_id" : "Christan", "listingCount" : 1 }
{ "_id" : "Royalton Park Avenue", "listingCount" : 9 }
{ "_id" : "Sandivell", "listingCount" : 1 }
{ "_id" : "O'Dell", "listingCount" : 1 }
{ "_id" : "Kaushik", "listingCount" : 1 }
{ "_id" : "Timo", "listingCount" : 2 }
{ "_id" : "Nahuel", "listingCount" : 3 }
{ "_id" : "C.", "listingCount" : 2 }
{ "_id" : "Deloris", "listingCount" : 1 }
{ "_id" : "Florian", "listingCount" : 3 }
{ "_id" : "Tobey", "listingCount" : 3 }
{ "_id" : "Amaryllis", "listingCount" : 1 }
{ "_id" : "Kenneth", "listingCount" : 11 }
{ "_id" : "Adrián", "listingCount" : 2 }
{ "_id" : "Yogita", "listingCount" : 1 }
{ "_id" : "Gya", "listingCount" : 1 }
{ "_id" : "Lizania", "listingCount" : 1 }
{ "_id" : "K. Zovia", "listingCount" : 1 }
{ "_id" : "Anthony And Elle", "listingCount" : 7 }
{ "_id" : "Jusham", "listingCount" : 2 }
*/

//7.
var projection = {_id: 0, listingCount: 1, host: "$_id"}
var groupby = {_id: "$host_name", listingCount: {$sum: 1}}
db.listings.aggregate([{$group: groupBby},{$project: projection}]).sort({listingCount: -1})
/*
  { listingsCount: 400, host: 'June' },
  { listingsCount: 311, host: 'Michael' },
  { listingsCount: 304, host: 'Blueground' },
  { listingsCount: 251, host: 'Karen' },
  { listingsCount: 238, host: 'David' },
  { listingsCount: 222, host: 'Jeniffer' },
  { listingsCount: 210, host: 'Alex' },
  { listingsCount: 178, host: 'Daniel' },
  { listingsCount: 175, host: 'John' },
*/

//8.
var groupby= {'beds': {'$gte': 1 }, 'bedrooms': {'$gte': 1}, 'neighbourhood_group_cleansed': 'Brooklyn'}
var projection = {_id: 0, 'name': 1, 'neighbourhood_cleansed': 1, 'bedrooms':1, 'beds': 1, 'bedroomBedRatio': {$divide: ["$bedrooms", "$beds"]}}
db.listings.aggregate([{$match: groupby}, {$project: projection}]).sort({'neighbourhood_cleansed': 1})
/*
{ name: 'Brand New small 1 Bedroom apt in Brooklyn',
  neighbourhood_cleansed: 'Bath Beach',
  bedrooms: '1',
  beds: '1',
  bedroomBedRatio: 1 }
{ name: 'Private Queen room&bathroom in NEW Luxury Building',
  neighbourhood_cleansed: 'Bath Beach',
  bedrooms: '1',
  beds: '1',
  bedroomBedRatio: 1 }
*/

//9.
var groupby = {_id: "$neighbourhood_group_cleansed", avgBedRatio: {$avg: {$divide: [{$toDouble: "$bedrooms"},{$toDouble: "$beds"}]}}}
db.listings.aggregate([{$group: groupby},{$project: {avgBedRatio: 1}}])
/*
 { _id: 'Staten Island', avgBedRatio: 0.83395660461987 },
 { _id: 'Manhattan', avgBedRatio: 0.9020413600110374 },
 { _id: 'Brooklyn', avgBedRatio: 0.925893863719455 }
 { _id: 'Queens', avgBedRatio: 0.88898632498287 },
 { _id: 'Bronx', avgBedRatio: 0.8876594739329029 }
*/

//10.
var groupby = {_id: "$neighbourhood_cleansed", avgRating: {$avg: {$toDouble: "$review_scores_rating"}}, countListings: {$sum: 1}}
db.listings.aggregate([{$match: {neighbourhood_group_cleansed: "Manhattan"}},{$group: groupby},{$match: {countListings: {$gte: 100}}}, {$project: {avgRating: 1, countListings: 1}}]).sort({avgRating: -1})
/*
{
_id: 'West Village',
avgRating: 4.700544554455446,
countListings: 520
},
{ _id: 'Nolita', avgRating: 4.694313725490196, countListings: 212 },
{
_id: 'Gramercy',
avgRating: 4.6808771929824555,
*/
