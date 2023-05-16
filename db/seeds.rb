# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


puts "🏈 Seeding activities..."

activity1 = Activity.create(
    title: 'Dinner Train', 
    neighborhood: 'Golf Manor', 
    cost: 95, 
    address: '2172 E Seymour Ave, Cincinnati, OH 45237', 
    phone_number: '(513) 791-7245', 
    website: 'https://cincinnatidinnertrain.com/', 
    category: ['Events', 'Date Night'])
activity2 = Activity.create(
    title: 'Music Hall Tour', 
    neighborhood: 'OTR', 
    cost: 15, 
    address: '1241 Elm St, Cincinnati, OH 45202', 
    phone_number: '(513) 744-3293', 
    website: 'https://friendsofmusichall.org/music-hall-tours/',
    category: ['Tours', 'History'])
activity3 = Activity.create(
    title: 'Behringer Crawford Museum', 
    neighborhood: 'Covington, KY', 
    cost: 9, 
    address: '1600 Montague Rd, Covington, KY 41011', 
    phone_number: '(859) 491-4003', 
    website: 'https://www.bcmuseum.org/',
    category: ['Museum', 'History'])
activity4 = Activity.create(
    title: 'Carousel', 
    neighborhood: 'The Banks', 
    cost: 2, 
    address: '8 E Mehring Way, Cincinnati, OH 45202', 
    phone_number: '(513) 381-3756', 
    website: 'https://www.cincinnati-oh.gov/cincyparks/visit-a-park/find-a-parkfacility/carol-anns-carousel/',
    category: ['Play'])
activity5 = Activity.create(
    title: 'Cincinnati Fire Museum', 
    neighborhood: 'Downtown', 
    cost: 8, 
    address: '315 W Court St, Cincinnati, OH 45202', 
    phone_number: '(513) 621-5553', 
    website: 'https://www.cincyfiremuseum.com',
    category: ['Museum', 'Quirky'])
activity4 = Activity.create(
    title: 'Taft Art Museum', 
    neighborhood: 'Downtown', 
    cost: 12, 
    address: '316 Pike St, Cincinnati, OH 45202', 
    phone_number: '(513) 241-0343', 
    website: 'https://www.taftmuseum.org/',
    category: ['Museum', 'Art'])
activity4 = Activity.create(
    title: 'Pendleton Art Center', 
    neighborhood: 'Pendleton', 
    cost: 0, 
    address: '1310 Pendleton St, Cincinnati, OH 45202', 
    phone_number: '(513) 421-4339', 
    website: 'https://pendletonartcenter.com/',
    category: ['Art'])
activity4 = Activity.create(
    title: 'Riverboat Cruise', 
    neighborhood: 'Newport, KY', 
    cost: 34, 
    address: '101 Riverboat Row, Newport, KY 41071', 
    phone_number: '(800) 261-8586', 
    website: 'https://bbriverboats.com/',
    category: ['Events', 'Date Night, On the Water'])
activity4 = Activity.create(
    title: 'Haunted Tour', 
    neighborhood: 'OTR', 
    cost: 25, 
    address: '1225 Elm St, Cincinnati, OH 45202', 
    phone_number: '(844) 757-5657', 
    website: 'https://cincinnatighosts.com/',
    category: ['Tour', 'Quirky', 'Date Night'])
activity4 = Activity.create(
    title: 'Paddlefest', 
    neighborhood: 'The Banks', 
    cost: 45, 
    address: '435 E Mehring Way, Cincinnati OH 45202', 
    phone_number: '', 
    website: 'https://www.ohioriverpaddlefest.org/',
    category: ['Events', 'On the Water', 'Outside'])
activity4 = Activity.create(
    title: 'American Sign Museum', 
    neighborhood: 'Camp Washington', 
    cost: 15,
    address: '1330 Monmouth Ave, Cincinnati, OH 45225', 
    phone_number: '(513) 541-6366', 
    website: 'https://www.americansignmuseum.org/',
    category: ['Museum', 'Art', 'Quirky'])
activity4 = Activity.create(
    title: 'Cincinnati Art Museum', 
    neighborhood: 'Mt. Adams', 
    cost: 0, 
    address: '953 Eden Park Dr, Cincinnati, OH 45202', 
    phone_number: '(513) 721-2787', 
    website: 'https://www.cincinnatiartmuseum.org/',
    category: ['Art', 'Museum'])
activity4 = Activity.create(
    title: 'Cincinnati Museum Center', 
    neighborhood: 'Downtown', 
    cost: 22, 
    address: '1301 Western Ave, Cincinnati, OH 45203', 
    phone_number: '(513) 287-7000', 
    website: 'https://www.cincymuseum.org/',
    category: ['Museum', 'History'])
activity4 = Activity.create(
    title: 'Harriet Beecher Stowe House', 
    neighborhood: 'Walnut Hills', 
    cost: 6, 
    address: '2950 Gilbert Ave, Cincinnati, OH 45206', 
    phone_number: '(513) 751-0651', 
    website: 'http://stowehousecincy.org/index.html',
    category: ['History', 'Tour'])
activity4 = Activity.create(
    title: 'Lucky Cat Museum', 
    neighborhood: 'Walnut Hills', 
    cost: 2, 
    address: '2511 Essex Place #150, Cincinnati, OH 45206', 
    phone_number: '(513) 633-3923', 
    website: 'http://www.luckycatmewseum.com/',
    category: ['Museum', 'Quirky'])
activity4 = Activity.create(
    title: 'National Underground Railroad Freedom Center', 
    neighborhood: 'The Banks', 
    cost: 16.50, 
    address: '50 E Freedom Way, Cincinnati, OH 45202', 
    phone_number: '(513) 333-7500', 
    website: 'https://freedomcenter.org/',
    category: ['Museum', 'History'])
activity4 = Activity.create(
    title: 'Pyramid Hill Sculpture Park & Museum', 
    neighborhood: 'Cleves', 
    cost: 10, 
    address: '1763 Hamilton Cleves Rd, Hamilton, OH 45013', 
    phone_number: '(513) 868-8336', 
    website: 'https://www.pyramidhill.org/',
    category: ['Art', 'Outside'])
activity4 = Activity.create(
    title: 'Vent Haven Museum', 
    neighborhood: 'Fort Mitchell, KY', 
    cost: 15, 
    address: '33 W Maple Ave, Fort Mitchell, KY 41011', 
    phone_number: '(859) 341-0461', 
    website: 'https://www.venthaven.org/',
    category: ['Museum', 'Quirky'])
activity4 = Activity.create(
    title: 'Cincinnati Observatory', 
    neighborhood: 'Hyde Park', 
    cost: 20, 
    address: '3489 Observatory Pl, Cincinnati, OH 45208', 
    phone_number: '(513) 321-5186', 
    website: 'https://www.cincinnatiobservatory.org/home/',
    category: ['Events', 'Date Night', 'Outside'])
activity4 = Activity.create(
    title: 'William Howard Taft National Historic Site', 
    neighborhood: 'Walnut Hills', 
    cost: 0, 
    address: '2038 Auburn Ave, Cincinnati, OH 45219', 
    phone_number: '(513) 684-3262', 
    website: 'https://www.nps.gov/wiho/index.htm',
    category: ['History', 'Tour', 'Museum'])

interest1 = Interest.create(name: 'Art exhibits', category: 'Culture')
interest2 = Interest.create(name: 'Concerts', category: 'Culture')
interest3 = Interest.create(name: 'Museums', category: 'Culture')
interest4 = Interest.create(name: 'Musicals', category: 'Culture')
interest5 = Interest.create(name: 'Plays', category: 'Culture')
interest6 = Interest.create(name: 'Tours', category: 'Culture')
interest7 = Interest.create(name: 'Food festivals', category: 'Festivals')
interest8 = Interest.create(name: 'Seasonal events', category: 'Festivals')
interest9 = Interest.create(name: 'Special events', category: 'Festivals')
interest10 = Interest.create(name: 'Biking', category: 'Fitness')
interest11 = Interest.create(name: 'Gym', category: 'Fitness')
interest12 = Interest.create(name: 'Hiking', category: 'Fitness')
interest13 = Interest.create(name: 'Running', category: 'Fitness')
interest14 = Interest.create(name: 'Walking', category: 'Fitness')
interest15 = Interest.create(name: 'Bars', category: 'Going Out')
interest16 = Interest.create(name: 'Restaurants', category: 'Going Out')
interest17 = Interest.create(name: 'Art', category: 'Hobbies')
interest18 = Interest.create(name: 'Baking', category: 'Hobbies')
interest19 = Interest.create(name: 'Cooking', category: 'Hobbies')
interest20 = Interest.create(name: 'Dance', category: 'Hobbies')
interest21 = Interest.create(name: 'Gardening', category: 'Hobbies')
interest22 = Interest.create(name: 'Reading', category: 'Hobbies')
interest23 = Interest.create(name: 'Thrifting', category: 'Hobbies')
interest24 = Interest.create(name: 'Video games', category: 'Hobbies')
interest25 = Interest.create(name: 'Baseball', category: 'Playing Sports')
interest26 = Interest.create(name: 'Basketball', category: 'Playing Sports')
interest27 = Interest.create(name: 'Football', category: 'Playing Sports')
interest28 = Interest.create(name: 'Golf', category: 'Playing Sports')
interest29 = Interest.create(name: 'Pickleball', category: 'Playing Sports')
interest30 = Interest.create(name: 'Skiing', category: 'Playing Sports')
interest31 = Interest.create(name: 'Soccer', category: 'Playing Sports')
interest32 = Interest.create(name: 'Tennis', category: 'Playing Sports')
interest33 = Interest.create(name: 'Ultimate Frisbee', category: 'Playing Sports')
interest34 = Interest.create(name: 'Bengals', category: 'Sporting Events')
interest35 = Interest.create(name: 'Cyclones', category: 'Sporting Events')
interest36 = Interest.create(name: 'FC Cincinnati', category: 'Sporting Events')
interest37 = Interest.create(name: 'Florence Yalls', category: 'Sporting Events')
interest38 = Interest.create(name: 'Reds', category: 'Sporting Events')
interest39 = Interest.create(name: 'Canoeing', category: 'Water Sports')
interest40 = Interest.create(name: 'Kayking', category: 'Water Sports')
interest41 = Interest.create(name: 'SUP', category: 'Water Sports')
interest42 = Interest.create(name: 'Swimming', category: 'Water Sports')

puts "✅ Done seeding!"