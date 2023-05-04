# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "🏈 Seeding activities..."

activity1 = Activity.create(title: 'Dinner Train', neighborhood: 'Golf Manor', cost: 95, address: '2172 E Seymour Ave, Cincinnati, OH 45237', phone_number: '(513) 791-7245', website: 'https://cincinnatidinnertrain.com/')
activity2 = Activity.create(title: 'Music Hall Tour', neighborhood: 'OTR', cost: 15, address: '1241 Elm St, Cincinnati, OH 45202', phone_number: '(513) 744-3293', website: 'https://friendsofmusichall.org/music-hall-tours/')
activity3 = Activity.create(title: 'Behringer Crawford Museum', neighborhood: 'Covington', cost: 9, address: '1600 Montague Rd, Covington, KY 41011', phone_number: '(859) 491-4003', website: 'https://www.bcmuseum.org/')
activity4 = Activity.create(title: 'Carousel', neighborhood: 'The Banks', cost: 2, address: '8 E Mehring Way, Cincinnati, OH 45202', phone_number: '(513) 381-3756', website: 'https://www.cincinnati-oh.gov/cincyparks/visit-a-park/find-a-parkfacility/carol-anns-carousel/')
activity5 = Activity.create(title: 'Cincinnati Fire Museum', neighborhood: 'Downtown', cost: 8, address: '315 W Court St, Cincinnati, OH 45202', phone_number: '(513) 621-5553', website: 'https://www.cincyfiremuseum.com')

interest1 = Interest.create(name: 'Sporting Events')
interest2 = Interest.create(name: 'Reds')
interest3 = Interest.create(name: 'Bengals')
interest4 = Interest.create(name: 'Florence Yalls')
interest5 = Interest.create(name: 'Cyclones')
interest6 = Interest.create(name: 'FC Cincinnati')
interest7 = Interest.create(name: 'Theater')
interest8 = Interest.create(name: 'Musicals')
interest9 = Interest.create(name: 'Plays')
interest10 = Interest.create(name: 'Walking')
interest11 = Interest.create(name: 'Hiking')
interest12 = Interest.create(name: 'Running')
interest13 = Interest.create(name: 'Cycling')
interest14 = Interest.create(name: 'Kayaking')
interest15 = Interest.create(name: 'Canoeing')
interest16 = Interest.create(name: 'SUP')
interest17 = Interest.create(name: 'Golf')
interest18 = Interest.create(name: 'Tennis')
interest19 = Interest.create(name: 'Gym')
interest20 = Interest.create(name: 'Skiing')
interest21 = Interest.create(name: 'Shopping')
interest22 = Interest.create(name: 'Restaurants')
interest23 = Interest.create(name: 'Bars')
interest24 = Interest.create(name: 'Festivals')
interest25 = Interest.create(name: 'Concerts')
interest26 = Interest.create(name: 'Visual Art')
interest27 = Interest.create(name: 'Amusement Parks')
interest28 = Interest.create(name: 'Tours')


puts "✅ Done seeding!"