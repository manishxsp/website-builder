--
-- PostgreSQL database dump
--

\restrict 34ic7uuZzS0gPc6heFAfnlO4ZyA8bXzdoj7NHEzzmFGehCgqWIAqvR51z2e0bTl

-- Dumped from database version 14.20 (Ubuntu 14.20-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.20 (Ubuntu 14.20-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: Site; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Site" (id, name, description, subdomain, "customDomain", logo, favicon, "brandColor", "fontFamily", "heroTitle", "heroSubtitle", "heroImage", "heroCTA", "heroCTALink", "aboutTitle", "aboutContent", "aboutImage", "servicesTitle", "productsTitle", "showProducts", "galleryTitle", "galleryImages", "testimonialsTitle", "showBusinessHours", "contactTitle", "contactEmail", "contactPhone", "contactAddress", "showLocations", "parkingInfo", "paymentMethods", categories, "facebookUrl", "instagramUrl", "twitterUrl", "linkedinUrl", "youtubeUrl", "whatsappUrl", "metaTitle", "metaDescription", "businessType", "industryCategory", "primaryKeywords", "secondaryKeywords", "localModifiers", "aggregateRating", "totalReviews", "googleAnalyticsId", "googleTagManagerId", "facebookPixelId", "googleSiteVerification", "bingWebmasterVerification", "showHero", "showBanners", "showAbout", "showServices", "showGallery", "showTestimonials", "showContact", "showFAQ", "createdAt", "updatedAt") FROM stdin;
cmkvj9qec001396xjrqvzjvr3	Skoda India Official	Experience European Luxury and Safety with Skoda India	skoda-india	\N	\N	\N	#4BA82E	Inter	Driven by Explorers	Discover the perfect blend of performance, safety, and simply clever solutions.	https://images.unsplash.com/photo-1606148644562-09d332715454?w=1200	Book a Test Drive	#contact	The Skoda Heritage	With over 125 years of history, Skoda stands for precision engineering and human-centric innovation. In India, we are committed to providing cars that are 'Built to Last' with 5-star safety ratings and unparalleled driving dynamics.	https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800	Our Services	Featured Products	t	Gallery	\N	What Our Clients Say	t	Connect With Us	customercare@skoda-india.co.in	+91 1800 209 4646	Skoda Auto Volkswagen India Pvt Ltd, Mumbai-Pune Highway, Pune, Maharashtra	t	Customer parking available on-site	{"Bank Transfer","Credit Card","Financing Available","Net Banking",UPI}	{"Automobile Dealership","Car Service Center","Auto Parts Store","Used Car Dealer"}	https://facebook.com/skodaindia	https://instagram.com/skodaindia	https://twitter.com/skodaindia	\N	\N	https://wa.me/9118002094646	Skoda India - Simply Clever | Sedans & SUVs	Explore the latest Skoda models in India including Kushaq, Slavia and Kodiaq. Experience European build quality and safety.	AutoDealer	European Automobile Manufacturer	{"Skoda cars India","Skoda Kushaq price","Skoda Slavia","European cars India"}	{"Skoda dealer near me","Skoda service center","TSI engine","5-star safety car"}	{India,Mumbai,Pune,Delhi}	5	2	\N	\N	\N	\N	\N	f	t	t	t	t	t	t	t	2026-01-26 19:01:15.108	2026-01-26 19:01:15.116
cmkvj9qe6000j96xjp9ikyshk	Premium Motors Austin	Certified pre-owned luxury vehicles with unbeatable prices and financing	premium-motors	\N	\N	\N	#1e40af	Inter	Find Your Dream Car Today	Certified pre-owned luxury vehicles with flexible financing and warranty	https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200	Browse Inventory	\N	Why Choose Premium Motors	With over 20 years serving Austin, Premium Motors has become the trusted choice for luxury pre-owned vehicles. Every car undergoes a rigorous 150-point inspection and comes with our comprehensive warranty.	https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800	Our Services	Featured Products	t	Gallery	\N	What Our Clients Say	f	Get In Touch	sales@premiummotors.com	+1 (512) 555-AUTO	456 Highway 183, Austin, TX 78701	f	\N	\N	\N	https://facebook.com/premiummotors	https://instagram.com/premiummotors	\N	\N	\N	\N	Premium Motors Austin - Certified Pre-Owned Luxury Cars | Best Prices in Texas	Shop certified pre-owned Tesla, BMW, Mercedes, and more. Flexible financing, trade-ins accepted. Serving Austin, TX for over 20 years.	AutoDealer	Luxury Pre-Owned Vehicles	{"used cars Austin","certified pre-owned Austin","luxury cars Texas","Tesla dealer Austin"}	{"BMW dealer Austin","Mercedes Austin","car financing bad credit","trade-in value Austin"}	{Austin,Texas,"Central Texas",ATX}	5	3	G-XXXXXXXXXX	\N	\N	example-verification-code	\N	t	f	t	t	f	t	t	t	2026-01-26 19:01:15.102	2026-01-26 19:01:15.106
cmkvj9qca000096xjn20aiklt	Sweet Haven Bakery	Artisan bakery specializing in custom wedding cakes, fresh pastries, and gluten-free options	sweet-haven	\N	\N	\N	#f59e0b	Playfair Display	Freshly Baked Every Morning	Custom cakes, artisan breads, and pastries made with love	https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=1200	Order Online	\N	Our Story	Founded in 2015, Sweet Haven Bakery has been San Francisco's premier destination for custom cakes and artisan baked goods. Our master bakers use only the finest organic ingredients to create memorable treats for every occasion.	https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800	What We Offer	Featured Products	t	Gallery	\N	What Our Clients Say	f	Get In Touch	orders@sweethaven.com	+1 (415) 555-CAKE	123 Baker Street, San Francisco, CA 94102	f	\N	\N	\N	https://facebook.com/sweethaven	https://instagram.com/sweethaven	\N	\N	\N	\N	Sweet Haven Bakery - Custom Wedding Cakes & Fresh Pastries | San Francisco	Award-winning bakery in San Francisco. Custom wedding cakes, fresh bread, gluten-free options. Order online for delivery or pickup.	Bakery	Artisan Bakery & Cafe	{"bakery near me","custom wedding cakes San Francisco","fresh bread bakery","artisan pastries"}	{"gluten-free bakery","vegan cupcakes","birthday cake delivery","sourdough bread"}	{"San Francisco","Bay Area","Downtown SF"}	5	3	\N	\N	\N	\N	\N	t	f	t	t	f	t	t	t	2026-01-26 19:01:15.034	2026-01-26 19:01:15.099
cmkvj9qem001y96xjervwx9ye	Samsung SmartPlaza	Your one-stop destination for Samsung products	samsung-plaza	\N	\N	\N	#1428A0	Inter	Welcome to Samsung SmartPlaza	Experience the latest in technology and innovation	https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200	Explore Products	#products	About Us	Samsung SmartPlaza is your trusted destination for all Samsung products. With years of experience and a commitment to customer satisfaction, we bring you the latest technology and exceptional service.	https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800	Our Services	Featured Products	t	Gallery	\N	What Our Clients Say	t	Get In Touch	info@samsungplaza.com	+91 8047493129	NH 48, Part 2, 32nd Avenue, Gurugram, Haryana, India	t	Paid parking on site	{Cash,"Credit Card","Debit Card","Master Card",Cheque,"Online Payment",Visa}	{"Electronics Retail And Repair Shop","Refrigerator Shop","Washing Machine & Dryer Shop","Air Conditioning Store","Computer Shop"}	https://facebook.com/samsungplaza	https://instagram.com/samsungplaza	https://twitter.com/samsungplaza	https://linkedin.com/company/samsungplaza	https://youtube.com/samsungplaza	https://wa.me/918047493129	Samsung SmartPlaza - Official Samsung Store | Gurugram	Shop the latest Samsung products at Samsung SmartPlaza. Electronics, appliances, and more with expert service.	LocalBusiness	Electronics Retail Store	{"Samsung store near me","Samsung mobile phones","Samsung refrigerator","Samsung SmartPlaza"}	{"Galaxy S25 Ultra","Samsung service center","Samsung appliances","Galaxy Z Fold"}	{Gurugram,Haryana,"Delhi NCR",India}	5	2	\N	\N	\N	\N	\N	f	t	t	t	f	t	t	t	2026-01-26 19:01:15.119	2026-01-26 19:01:15.123
\.


--
-- Data for Name: Banner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Banner" (id, title, subtitle, image, "ctaText", "ctaLink", "order", "isActive", "siteId", "createdAt") FROM stdin;
cmkvj9qec001996xj01gwa3uo	The New Skoda Slavia	The sedan that's high on performance and elegance.	https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1200	Explore Slavia	#products	1	t	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108
cmkvj9qec001a96xjriikzi2z	Skoda Kushaq	Make way for the King of the road. 5-Star Global NCAP Safety.	https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200	Explore Kushaq	#products	2	t	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108
cmkvj9qem002496xjph2co6ca	Galaxy S25 Ultra	Pre-order now and get exclusive offers	https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1200	Pre-Order Now	#products	1	t	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
cmkvj9qem002596xjicrpfvx2	Samsung Double Door Refrigerators	Keep your food fresh with advanced cooling technology	https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=1200	Shop Now	#products	2	t	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
cmkvj9qem002696xjmagj45i6	Galaxy Z Fold6	Unfold your world with the latest foldable technology	https://images.unsplash.com/photo-1592286927505-2fd0f2d6b7f4?w=1200	Learn More	#products	3	t	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
\.


--
-- Data for Name: BusinessHour; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."BusinessHour" (id, day, "openTime", "closeTime", "isClosed", "order", "siteId", "createdAt") FROM stdin;
cmkvj9qed001g96xj01ub128c	Monday	09:30 AM	07:00 PM	f	1	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108
cmkvj9qed001h96xjced69scv	Tuesday	09:30 AM	07:00 PM	f	2	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108
cmkvj9qed001i96xj0s5vihjs	Wednesday	09:30 AM	07:00 PM	f	3	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108
cmkvj9qed001j96xj07ioqr7c	Thursday	09:30 AM	07:00 PM	f	4	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108
cmkvj9qed001k96xjgm1x2nu4	Friday	09:30 AM	07:00 PM	f	5	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108
cmkvj9qed001l96xjgmnghua8	Saturday	09:30 AM	07:00 PM	f	6	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108
cmkvj9qed001m96xj0rps539f	Sunday	10:00 AM	05:00 PM	f	7	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108
cmkvj9qen002e96xjjbfoelh7	Monday	11:00 AM	08:00 PM	f	1	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
cmkvj9qen002f96xjeptdpd65	Tuesday	11:00 AM	08:00 PM	f	2	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
cmkvj9qen002g96xjtxenqojc	Wednesday	11:00 AM	08:00 PM	f	3	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
cmkvj9qen002h96xjaxlshqq2	Thursday	11:00 AM	08:00 PM	f	4	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
cmkvj9qen002i96xj8mlt5ab8	Friday	11:00 AM	08:00 PM	f	5	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
cmkvj9qen002j96xjz5byjfin	Saturday	11:00 AM	08:00 PM	f	6	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
cmkvj9qen002k96xjandmmy40	Sunday	11:00 AM	08:00 PM	f	7	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
\.


--
-- Data for Name: FAQ; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."FAQ" (id, question, answer, "order", "isActive", "siteId", "createdAt", "updatedAt") FROM stdin;
cmkvj9qcb000f96xjmiyo06b8	How far in advance should I order a custom wedding cake?	We recommend ordering your wedding cake at least 3-4 months in advance to ensure availability. However, we can sometimes accommodate rush orders with 2-4 weeks notice depending on our schedule.	1	t	cmkvj9qca000096xjn20aiklt	2026-01-26 19:01:15.034	2026-01-26 19:01:15.034
cmkvj9qcb000g96xjxpggnu89	Do you offer gluten-free and vegan options?	Yes! We have a full line of gluten-free baked goods and vegan options. Our vegan chocolate cupcakes and gluten-free bread are customer favorites. All items are prepared in a dedicated area to prevent cross-contamination.	2	t	cmkvj9qca000096xjn20aiklt	2026-01-26 19:01:15.034	2026-01-26 19:01:15.034
cmkvj9qcb000h96xj8kmkt7gs	What are your delivery options?	We offer free delivery within 5 miles of our bakery for orders over $50. For wedding cakes and large orders, we provide setup and delivery services throughout the San Francisco Bay Area. Delivery fees vary based on distance.	3	t	cmkvj9qca000096xjn20aiklt	2026-01-26 19:01:15.034	2026-01-26 19:01:15.034
cmkvj9qcb000i96xjwyra283y	Can I schedule a cake tasting?	Absolutely! We offer complimentary cake tastings for wedding cake orders. Please call us at (415) 555-CAKE to schedule your appointment. Tastings are available Tuesday-Saturday by appointment only.	4	t	cmkvj9qca000096xjn20aiklt	2026-01-26 19:01:15.034	2026-01-26 19:01:15.034
cmkvj9qe6000y96xjyjtjqgu8	What does 'Certified Pre-Owned' mean?	Our Certified Pre-Owned vehicles undergo a comprehensive 150-point inspection covering engine, transmission, brakes, electrical systems, and more. Each CPO vehicle comes with an extended warranty, roadside assistance, and a complete vehicle history report. We only certify vehicles that meet our strict quality standards.	1	t	cmkvj9qe6000j96xjp9ikyshk	2026-01-26 19:01:15.102	2026-01-26 19:01:15.102
cmkvj9qe6000z96xjgt4a2zdd	Can I get financing with bad credit?	Yes! We work with multiple lenders who specialize in all credit situations, including bad credit, no credit, and bankruptcy. Our finance team will work hard to get you approved with competitive rates. We've helped hundreds of customers with credit challenges get into their dream car.	2	t	cmkvj9qe6000j96xjp9ikyshk	2026-01-26 19:01:15.102	2026-01-26 19:01:15.102
cmkvj9qe6001096xjf1qvu2y1	Do you accept trade-ins?	Absolutely! We accept all trade-ins regardless of make, model, or condition. Our team will provide you with a fair market value assessment. You can use your trade-in value as a down payment on your next vehicle. We make the trade-in process quick and easy.	3	t	cmkvj9qe6000j96xjp9ikyshk	2026-01-26 19:01:15.102	2026-01-26 19:01:15.102
cmkvj9qe6001196xjagwzt60l	What warranty comes with the vehicles?	All Certified Pre-Owned vehicles come with our Premium Warranty covering major components for 2 years or 24,000 miles. We also offer extended warranty options up to 7 years/100,000 miles. Additionally, all CPO vehicles include 24/7 roadside assistance.	4	t	cmkvj9qe6000j96xjp9ikyshk	2026-01-26 19:01:15.102	2026-01-26 19:01:15.102
cmkvj9qe6001296xjfgbtdy24	Can I test drive a vehicle?	Of course! We encourage test drives for all our vehicles. You can schedule a test drive online or just walk in during business hours. We're open Monday-Saturday 9am-7pm and Sunday 11am-5pm. Extended test drives can be arranged for serious buyers.	5	t	cmkvj9qe6000j96xjp9ikyshk	2026-01-26 19:01:15.102	2026-01-26 19:01:15.102
cmkvj9qed001v96xj5nmqpjed	What is the warranty period for Skoda cars?	All Skoda cars come with a standard 4-year/1,00,000 km warranty (whichever comes first). Additionally, we offer extended warranty packages for added peace of mind.	1	t	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108	2026-01-26 19:01:15.108
cmkvj9qed001w96xjpb4ke6m3	What is TSI technology?	TSI (Turbocharged Stratified Injection) is Skoda's advanced petrol engine technology that combines turbocharging with direct fuel injection. This results in better fuel efficiency, lower emissions, and superior performance.	2	t	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108	2026-01-26 19:01:15.108
cmkvj9qed001x96xjdfsj0q7i	How do I book a test drive?	You can book a test drive by calling our customer care at 1800 209 4646, visiting our website, or contacting your nearest Skoda dealership. Test drives are available at your convenience.	3	t	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108	2026-01-26 19:01:15.108
cmkvj9qen002x96xjiryjn83y	Do you offer EMI options?	Yes, we offer flexible EMI options on all products. You can choose from 3, 6, 9, or 12-month EMI plans with zero down payment on select products. We accept all major credit and debit cards.	1	t	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119	2026-01-26 19:01:15.119
cmkvj9qen002y96xjuakrpuv3	What is your return policy?	We offer a 7-day return policy on most products. The product must be in original condition with all accessories and packaging. For defective products, we provide immediate replacement or repair under warranty.	2	t	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119	2026-01-26 19:01:15.119
cmkvj9qen002z96xj5nrei1ta	Do you provide home delivery?	Yes, we provide free home delivery within Gurugram for orders above ₹10,000. For large appliances like refrigerators and washing machines, we also offer professional installation services.	3	t	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119	2026-01-26 19:01:15.119
\.


--
-- Data for Name: Lead; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Lead" (id, name, email, phone, message, status, "siteId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Location" (id, name, city, state, address, "mapLink", "order", "siteId", "createdAt") FROM stdin;
cmkvj9qen002l96xj8fzfqzpd	Samsung SmartPlaza in Haryana	Gurugram	Haryana	7JWV+G28+HQ, Gurugram, Haryana, India	https://maps.google.com/?q=7JWV+G28+HQ	1	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
cmkvj9qen002m96xj7goimkqh	Samsung SmartPlaza in Gurugram	Gurugram	Haryana	\N	\N	2	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
\.


--
-- Data for Name: NavLink; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."NavLink" (id, label, href, "order", "isExternal", "siteId", "createdAt") FROM stdin;
cmkvj9qca000196xjqv3lu50u	Home	#hero	1	f	cmkvj9qca000096xjn20aiklt	2026-01-26 19:01:15.034
cmkvj9qca000296xjo49ngq07	About	#about	2	f	cmkvj9qca000096xjn20aiklt	2026-01-26 19:01:15.034
cmkvj9qca000396xj5m31jtsy	Products	#products	3	f	cmkvj9qca000096xjn20aiklt	2026-01-26 19:01:15.034
cmkvj9qca000496xj7wwibyvq	FAQ	#faq	4	f	cmkvj9qca000096xjn20aiklt	2026-01-26 19:01:15.034
cmkvj9qca000596xj04zc28j3	Contact	#contact	5	f	cmkvj9qca000096xjn20aiklt	2026-01-26 19:01:15.034
cmkvj9qe6000k96xjzxjuzxsi	Home	#hero	1	f	cmkvj9qe6000j96xjp9ikyshk	2026-01-26 19:01:15.102
cmkvj9qe6000l96xj3wnm69yc	Inventory	#products	2	f	cmkvj9qe6000j96xjp9ikyshk	2026-01-26 19:01:15.102
cmkvj9qe6000m96xj1p0qq5n1	Financing	#services	3	f	cmkvj9qe6000j96xjp9ikyshk	2026-01-26 19:01:15.102
cmkvj9qe6000n96xjscm83lut	FAQ	#faq	4	f	cmkvj9qe6000j96xjp9ikyshk	2026-01-26 19:01:15.102
cmkvj9qe6000o96xjcij9ee9a	Contact	#contact	5	f	cmkvj9qe6000j96xjp9ikyshk	2026-01-26 19:01:15.102
cmkvj9qec001496xjpv1xogcx	Models	#products	1	f	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108
cmkvj9qec001596xj9yu4sik6	Services	#services	2	f	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108
cmkvj9qec001696xjuw4r0nyh	Locate Dealer	#locations	3	f	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108
cmkvj9qec001796xjp8an345l	FAQ	#faq	4	f	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108
cmkvj9qec001896xjbns2j14f	Book Now	#contact	5	f	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108
cmkvj9qem001z96xjy2b3hhhb	Home	#hero	1	f	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
cmkvj9qem002096xjqpn1n7ab	Products	#products	2	f	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
cmkvj9qem002196xjqrudn4io	Services	#services	3	f	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
cmkvj9qem002296xjt867574p	Locations	#locations	4	f	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
cmkvj9qem002396xj0kzrh2nl	Contact	#contact	5	f	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (id, name, description, image, price, "ctaText", "ctaLink", features, "order", "isActive", slug, keywords, "metaTitle", "metaDescription", "imageAlt", "vehicleType", make, model, year, mileage, vin, "fuelType", condition, transmission, "exteriorColor", "interiorColor", ingredients, allergens, "servingSize", "dietaryInfo", "siteId", "createdAt", "updatedAt") FROM stdin;
cmkvj9qca000996xj1m6bas82	Three-Tier Wedding Cake	Elegant buttercream wedding cake with custom decorations	https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600	Starting at $450	View Details	\N	\N	1	t	three-tier-wedding-cake	{"wedding cake","custom cake","buttercream cake"}	Three-Tier Wedding Cake - Sweet Haven Bakery	Beautiful three-tier wedding cake with custom decorations. Choose your flavors and design.	Three-tier white buttercream wedding cake with fresh roses	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	{flour,sugar,eggs,butter,vanilla}	{gluten,dairy,eggs}	Serves 50-60 guests	{}	cmkvj9qca000096xjn20aiklt	2026-01-26 19:01:15.034	2026-01-26 19:01:15.034
cmkvj9qcb000a96xju2jl2xnu	Vegan Chocolate Cupcakes	Rich chocolate cupcakes made without animal products	https://images.unsplash.com/photo-1587668178277-295251f900ce?w=600	$36/dozen	View Details	\N	\N	2	t	vegan-chocolate-cupcakes	{"vegan cupcakes","chocolate cupcakes",dairy-free}	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	{flour,cocoa,"coconut oil","almond milk"}	{gluten}	12 cupcakes	{vegan,dairy-free}	cmkvj9qca000096xjn20aiklt	2026-01-26 19:01:15.034	2026-01-26 19:01:15.034
cmkvj9qcb000b96xj4q5clreu	Sourdough Bread	Traditional sourdough with crispy crust and tangy flavor	https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600	$8	View Details	\N	\N	3	t	sourdough-bread	{sourdough,"artisan bread","fresh bread"}	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	{flour,water,salt,"sourdough starter"}	{gluten}	1 loaf	{organic}	cmkvj9qca000096xjn20aiklt	2026-01-26 19:01:15.034	2026-01-26 19:01:15.034
cmkvj9qe6000s96xjx4mpxygx	2024 Tesla Model 3	Long Range AWD with Autopilot, Premium Interior, only 5,000 miles	https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600	$42,999	View Details	\N	{Autopilot,"Premium Audio","Glass Roof","Heated Seats","Supercharger Access"}	1	t	2024-tesla-model-3-vin123456	{"Tesla Model 3","electric car","used Tesla Austin"}	2024 Tesla Model 3 Long Range - Premium Motors Austin	Certified pre-owned 2024 Tesla Model 3 with only 5,000 miles. Autopilot, premium interior, full warranty.	2024 Tesla Model 3 in Pearl White - front view	Car	Tesla	Model 3	2024	5000	5YJ3E1EA8PF123456	Electric	Used	Automatic	Pearl White	Black	\N	\N	\N	\N	cmkvj9qe6000j96xjp9ikyshk	2026-01-26 19:01:15.102	2026-01-26 19:01:15.102
cmkvj9qe6000t96xjjmbpz6bo	2023 BMW 3 Series	330i xDrive with M Sport Package, Navigation, low miles	https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600	$38,500	View Details	\N	{"M Sport Package",Navigation,Sunroof,"Heated Seats","Apple CarPlay"}	2	t	2023-bmw-3-series-330i	{"BMW 3 Series","luxury sedan","used BMW Austin"}	\N	\N	\N	Car	BMW	3 Series 330i	2023	12000	WBA8B9C50JK123456	Gasoline	Certified Pre-Owned	Automatic	Alpine White	Black Leather	\N	\N	\N	\N	cmkvj9qe6000j96xjp9ikyshk	2026-01-26 19:01:15.102	2026-01-26 19:01:15.102
cmkvj9qe6000u96xjoocrf5wq	2022 Mercedes-Benz E-Class	E 350 4MATIC with Premium Package, immaculate condition	https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600	$45,900	View Details	\N	{"Premium Package","Panoramic Roof","Burmester Sound","Heated & Cooled Seats","Driver Assistance Package"}	3	t	2022-mercedes-e-class-e350	{"Mercedes E-Class","luxury car","used Mercedes Austin"}	\N	\N	\N	Car	Mercedes-Benz	E-Class E 350	2022	18000	WDDZF4KB5NA123456	Gasoline	Certified Pre-Owned	Automatic	Obsidian Black	Saddle Brown Leather	\N	\N	\N	\N	cmkvj9qe6000j96xjp9ikyshk	2026-01-26 19:01:15.102	2026-01-26 19:01:15.102
cmkvj9qed001b96xj8j9xtnba	Skoda Kushaq	Powerful TSI engine with premium interiors and top-tier safety.	https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600	Starting at ₹11,89,000	Configure Now	/kushaq	{"1.0L / 1.5L TSI Engine","Ventilated Front Seats","Electric Sunroof","6 Airbags Standard"}	1	t	skoda-kushaq	{"Skoda Kushaq","SUV India","TSI engine","5-star safety"}	\N	\N	\N	SUV	Skoda	Kushaq	2024	\N	\N	Gasoline	New	Automatic	\N	\N	\N	\N	\N	\N	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108	2026-01-26 19:01:15.108
cmkvj9qed001c96xj2xxxvy5f	Skoda Slavia	A premium sedan designed for those who love to drive.	https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600	Starting at ₹10,69,000	Configure Now	/slavia	{"Largest-in-class Boot Space","Wireless SmartLink","Signature Crystaline LED","High Ground Clearance"}	2	t	skoda-slavia	{"Skoda Slavia","sedan India","premium car"}	\N	\N	\N	Car	Skoda	Slavia	2024	\N	\N	Gasoline	New	Automatic	\N	\N	\N	\N	\N	\N	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108	2026-01-26 19:01:15.108
cmkvj9qem002796xj9s9rbjpy	Galaxy S25 Ultra	The ultimate smartphone with AI-powered features and stunning display	https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600	Starting at ₹1,29,999	View Details	/products/galaxy-s25-ultra	{"6.8-inch Dynamic AMOLED display","200MP camera with AI enhancement","S Pen included","5000mAh battery"}	1	t	galaxy-s25-ultra	{"Galaxy S25 Ultra","Samsung flagship","AI smartphone"}	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119	2026-01-26 19:01:15.119
cmkvj9qen002896xjetxelfvq	Galaxy Z Fold6	Experience the future of smartphones with foldable technology	https://images.unsplash.com/photo-1592286927505-2fd0f2d6b7f4?w=600	Starting at ₹1,64,999	View Details	/products/galaxy-z-fold6	{"7.6-inch foldable display","Multi-tasking capabilities","Premium design","Advanced camera system"}	2	t	galaxy-z-fold6	{"Galaxy Z Fold6","foldable phone","Samsung foldable"}	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119	2026-01-26 19:01:15.119
cmkvj9qen002996xjytze9r4i	Samsung Double Door Refrigerator	Keep your food fresh with advanced cooling technology	https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600	Starting at ₹45,990	View Details	/products/refrigerator	{"Digital Inverter Technology","All-around cooling","Convertible modes","Energy efficient"}	3	t	samsung-refrigerator	{"Samsung refrigerator","double door fridge","inverter refrigerator"}	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119	2026-01-26 19:01:15.119
\.


--
-- Data for Name: Service; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Service" (id, title, description, icon, "siteId", "order", "createdAt") FROM stdin;
cmkvj9qca000696xje1dfo3gm	Custom Wedding Cakes	Bespoke designs for your special day, starting at $300	🎂	cmkvj9qca000096xjn20aiklt	1	2026-01-26 19:01:15.034
cmkvj9qca000796xjnzarhut5	Fresh Artisan Bread	Sourdough, whole wheat, and specialty loaves baked daily	🍞	cmkvj9qca000096xjn20aiklt	2	2026-01-26 19:01:15.034
cmkvj9qca000896xj6tdxmhbd	Gluten-Free Options	Delicious treats for dietary restrictions	🌾	cmkvj9qca000096xjn20aiklt	3	2026-01-26 19:01:15.034
cmkvj9qe6000p96xji9x5654t	150-Point Inspection	Every vehicle thoroughly inspected and certified	✓	cmkvj9qe6000j96xjp9ikyshk	1	2026-01-26 19:01:15.102
cmkvj9qe6000q96xjomot2ixt	Flexible Financing	Competitive rates for all credit types, even bad credit	💳	cmkvj9qe6000j96xjp9ikyshk	2	2026-01-26 19:01:15.102
cmkvj9qe6000r96xj0z7ltfmf	Trade-In Program	Get top dollar for your current vehicle	🔄	cmkvj9qe6000j96xjp9ikyshk	3	2026-01-26 19:01:15.102
cmkvj9qed001d96xj9exw371z	Periodic Maintenance	Keep your Skoda in peak condition with scheduled servicing.	🚗	cmkvj9qec001396xjrqvzjvr3	1	2026-01-26 19:01:15.108
cmkvj9qed001e96xjg2lmw4r0	Peace of Mind Package	4 years of warranty and roadside assistance.	🛡️	cmkvj9qec001396xjrqvzjvr3	2	2026-01-26 19:01:15.108
cmkvj9qed001f96xjf0hvfyeh	Body & Paint	Restore your car to showroom condition with expert care.	🎨	cmkvj9qec001396xjrqvzjvr3	3	2026-01-26 19:01:15.108
cmkvj9qen002a96xjghaur3ei	Sales	Browse and purchase the latest Samsung products	🛒	cmkvj9qem001y96xjervwx9ye	1	2026-01-26 19:01:15.119
cmkvj9qen002b96xjloh917mf	Repair & Service	Expert repair services for all Samsung devices	🔧	cmkvj9qem001y96xjervwx9ye	2	2026-01-26 19:01:15.119
cmkvj9qen002c96xjo5k5lxvr	Installation	Professional installation for appliances	⚙️	cmkvj9qem001y96xjervwx9ye	3	2026-01-26 19:01:15.119
cmkvj9qen002d96xj8r3znam2	Extended Warranty	Protect your investment with extended coverage	🛡️	cmkvj9qem001y96xjervwx9ye	4	2026-01-26 19:01:15.119
\.


--
-- Data for Name: Tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tag" (id, name, link, "order", "siteId", "createdAt") FROM stdin;
cmkvj9qed001n96xjuum5haf3	Skoda Slavia	/slavia	1	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108
cmkvj9qed001o96xji03l21mw	Skoda Kushaq	/kushaq	2	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108
cmkvj9qed001p96xj90dke40t	Skoda Kodiaq	/kodiaq	3	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108
cmkvj9qed001q96xj7f0aod4x	Simply Clever	/features	4	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108
cmkvj9qed001r96xjoeh25gw6	TSI Technology	/engine	5	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108
cmkvj9qed001s96xj9khr2jr3	Exchange Bonus	/offers	6	cmkvj9qec001396xjrqvzjvr3	2026-01-26 19:01:15.108
cmkvj9qen002n96xjudv6jf4q	Galaxy S25	/products/galaxy-s25	1	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
cmkvj9qen002o96xjvbhoj4aq	Galaxy S25 Ultra	/products/galaxy-s25-ultra	2	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
cmkvj9qen002p96xjndjx79eg	Galaxy S25+	/products/galaxy-s25-plus	3	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
cmkvj9qen002q96xjd51h69ud	Buds 3 Pro	/products/buds-3-pro	4	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
cmkvj9qen002r96xj0junzomh	Galaxy Watch7	/products/galaxy-watch7	5	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
cmkvj9qen002s96xj0165sgb2	Galaxy Z Fold6	/products/galaxy-z-fold6	6	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
cmkvj9qen002t96xj8rbsuawx	Samsung Refrigerators	/products/refrigerators	7	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
cmkvj9qen002u96xjjv4gq46p	Samsung Service Centre	/service	8	cmkvj9qem001y96xjervwx9ye	2026-01-26 19:01:15.119
\.


--
-- Data for Name: Testimonial; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Testimonial" (id, name, role, content, avatar, rating, "siteId", "order", "createdAt") FROM stdin;
cmkvj9qcb000c96xj9zlfxn79	Emily & James	Wedding Clients	Our wedding cake was absolutely stunning and tasted even better! Sweet Haven made our dream cake a reality.	\N	5	cmkvj9qca000096xjn20aiklt	1	2026-01-26 19:01:15.034
cmkvj9qcb000d96xjaiq5itov	Sarah Martinez	Regular Customer	Best gluten-free options in the city! Finally a bakery that doesn't compromise on taste.	\N	5	cmkvj9qca000096xjn20aiklt	2	2026-01-26 19:01:15.034
cmkvj9qcb000e96xjuf6cjy4n	David Chen	Corporate Client	We order from Sweet Haven for all our office events. Always fresh, always delicious!	\N	5	cmkvj9qca000096xjn20aiklt	3	2026-01-26 19:01:15.034
cmkvj9qe6000v96xjydyohay2	Michael Rodriguez	Tesla Model 3 Owner	Best car buying experience ever! No pressure, transparent pricing, and they helped me get amazing financing despite my credit score.	\N	5	cmkvj9qe6000j96xjp9ikyshk	1	2026-01-26 19:01:15.102
cmkvj9qe6000w96xjrk5dfq0o	Jennifer Thompson	BMW 3 Series Owner	The team at Premium Motors went above and beyond. My BMW was in perfect condition and the trade-in process was seamless.	\N	5	cmkvj9qe6000j96xjp9ikyshk	2	2026-01-26 19:01:15.102
cmkvj9qe6000x96xj2dodstl0	Robert Kim	Mercedes E-Class Owner	Highly recommend! They found exactly what I was looking for and the financing terms were better than any other dealer.	\N	5	cmkvj9qe6000j96xjp9ikyshk	3	2026-01-26 19:01:15.102
cmkvj9qed001t96xjm6yr5y62	Amitabh Singh	Slavia Owner	The driving dynamics are unmatched in this segment. Truly a driver's car.	\N	5	cmkvj9qec001396xjrqvzjvr3	1	2026-01-26 19:01:15.108
cmkvj9qed001u96xjnh1v41br	Sandeep Varma	Kushaq Owner	Safe, sturdy, and elegant. Skoda service has also improved significantly.	\N	5	cmkvj9qec001396xjrqvzjvr3	2	2026-01-26 19:01:15.108
cmkvj9qen002v96xje6dqm9q8	Rajesh Kumar	Verified Customer	Excellent service and genuine Samsung products. The staff is very knowledgeable and helpful.	\N	5	cmkvj9qem001y96xjervwx9ye	1	2026-01-26 19:01:15.119
cmkvj9qen002w96xjyes4d0tg	Priya Sharma	Verified Customer	Bought my Galaxy S25 Ultra from here. Great experience and competitive pricing!	\N	5	cmkvj9qem001y96xjervwx9ye	2	2026-01-26 19:01:15.119
\.


--
-- PostgreSQL database dump complete
--

\unrestrict 34ic7uuZzS0gPc6heFAfnlO4ZyA8bXzdoj7NHEzzmFGehCgqWIAqvR51z2e0bTl

