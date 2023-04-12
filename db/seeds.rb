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

puts "✅ Done seeding!"