
CREATE SCHEMA `db_mytix` ;

CREATE TABLE `db_mytix`.`list_event` (
  `event_id` INT NOT NULL AUTO_INCREMENT,
  `event_name` VARCHAR(45) NULL DEFAULT NULL,
  `event_type` VARCHAR(45) NULL DEFAULT NULL,
  `event_date` DATE NULL DEFAULT NULL,
  `event_time` VARCHAR(45) NULL DEFAULT NULL,
  `event_location` VARCHAR(45) NULL DEFAULT NULL,
  `event_description` VARCHAR(5000) NULL DEFAULT NULL,
  `event_image` VARCHAR(255) NULL DEFAULT NULL,
  `gold_ticket_price` INT NULL DEFAULT NULL,
  `platinum_ticket_price` INT NULL DEFAULT NULL,
  `diamond_ticket_price` INT NULL DEFAULT NULL,
  PRIMARY KEY (`event_id`));
  
use db_mytix;

INSERT INTO `db_mytix`.`list_event` (
`event_name`, 
`event_type`, 
`event_date`, 
`event_time`, 
`event_location`, `event_description`, 
`event_image`, 
`gold_ticket_price`, 
`platinum_ticket_price`, 
`diamond_ticket_price`)
VALUES 
(
'2023 ASIA FAN MEETING IN JAKARTA: KIMBUM', 
'music', 
'2023-09-03', 
'19:00 - 22:00 WIB', 
'jakarta', 
'Viu Scream Dates 
is an annual Viu festival event in Indonesia, 
bringing the Viu experience to live to our millions of Viu’ers in Indonesia. 
The initial Viu Scream Dates was done in Bangkok, Thailand, 
in 2019 and was attended by thousands of Viu’ers. 
The Viu Scream Dates 2023 will be the first Viu Scream Dates in Indonesia,
 where we will create the excitement by bringing the most favorite Korean, 
 Thailand, Mandarin, & Indonesia celebrties to life through music concerts, meet & greets, 
 photo signings, talk-shows, screenings, and fun games.', 
 'https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20230823110754.jpg', 
 75000, 
 0, 
 0
 ), 
 (
 'Indonesia Marketing Festival 2023 - JATIM',
 'webinar',
 '2023-08-29',
 '09:00 - 17:00 WIB',
 'online',
 'Dapatkan strategi jitu untuk memenangkan persaingan di Post Normal Era dengan menggabungkan konsep CI-EL : Creativity, Innovation, Entrepreneurship, Leadership & PI-PM : Productivity, Improvement, Professionalism, Management',
 'https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20230714154048_64b10a10589cd.jpg',
 100000,
 0,
 0
 ),
 (
  'STARTALK "Generating Sustainable Business Growth for Social Enterprises"',
  'webinar',
  '2023-08-29',
  '16:00 - 17:30 WIB',
  'Online',
  'Uncover proven strategies, innovative ideas, and actionable insights that will empower your social enterprise to thrive. Learn from industry experts and real-world examples, gaining the tools you need to drive positive impact and sustainable growth.',
  'https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20230823133437_64e5a87de8c18.jpg',
  120000,
  0,
  0
 ),
 (
  'INDONESIAN GROUP LESSONS',
  'webinar',
  '2023-08-29',
  '14:00 - 18:00 WIB',
  'online',
  'Our school combines rich teaching experience and understanding of the processes of working in the Internet environment. People with various professional backgrounds: philologists, managers, representatives of technical professions — were able to find worthy application of their knowledge in our school. We are very sensitive to the issues of education, and position ourselves not as a base of tutors, but as a school.',
  'https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20230823185603_64e5f3d322374.jpg',
  200000,
  0,
  0
 ),
 (
  'Webinar Boost AI',
  'webinar',
  '2023-08-30',
  '20:00 - 21:30 WIB',
  'online',
  'Banyak sekali bisnis - bisnis yang mulai tumbang dan PHK yang semakin menakutkan. Semoga hal ini tidak terjadi dengan Anda.\nNamun tetap saja Anda harus punya persiapan Apa yang sudah Anda persiapkan untuk menghadapi semua ini?',
  'https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20230828130528_64ec39281abea.jpg',
  50000,
  0,
  0
 ),
 (
  'Intro to Prompt Engineering and Leveraging ChatGPT',
  'webinar',
  '2023-09-05',
  '14:00 - 17:00 WIB',
  'online',
  'Ikuti workshop Intro to Prompt Engineering and Leveraging ChatGPT for Content Creation pada Sabtu, 9 September 2023, pukul 14.00-17.00 WIB, melalui Zoom.',
  'https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20230815164553_64db4951e22a7.jpg',
  449000,
  0,
  0
 ),
 (
  'Ice Skating @BX Rink Bintaro Jaya',
  'sports',
  '2023-12-31',
  '10:00 - 22:00 WIB',
  'jakarta',
  'Ice Skating @BX Rink Bintaro Jaya',
  'https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20211029070059.jpg',
  100000,
  0,
  0
 ),
 (
  'Neckdeep Live in Australia & Asia - JAKARTA',
  'music',
  '2023-09-16',
  '20:00 - 22:00 WIB',
  'jakarta',
  'Neckdeep Live in Australia & Asia - JAKARTA',
  'https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20230714014753.png',
  950000,
  990000,
  860000
 ),
 (
  'ALDI TAHER live in LNM Season 4',
  'music',
  '2023-08-29',
  '18:00 - 22:00 WIB',
  'lampung',
  'Lampung Night Market adalah festival kuliner tahunan yang diselenggarakan oleh Sekelik Makkow Tanding. Di tahun ke-4 nya ini, Sekelik mengundang Aldi Taher untuk memeriahkan acara.',
  'https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20230822194745_64e4ae71cb6ba.jpg',
  50000,
  0,
  0
 ),
 (
  'SESI PERKENALAN PUBLIC SPEAKING',
  'webinar',
  '2023-09-01',
  '09:45 - 11:00 WIB',
  'online',
  'Semakin TINGGI jabatan seseorang, Maka akan semakin SERING Anda akan diminta untuk berbicara di depan orang banyak Kelas sangat terbatas, karena dalam training akan BANYAK PRAKTEK Public Speaking, sehingga peserta banyak diberi kesempatan untuk latihan.',
  'https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20230831094453_64effea50ff4e.jpg',
  99000,
  0,
  0
 ),
 (
  'BAKU HANTAM CHAMPIONSHIP',
  'sports',
  '2023-09-16',
  '18:00 - 19:00 WIB',
  'jakarta',
  'Pertandingan akan berlangsung pada 16 September 2023 di Balai Sarbini, Jakarta',
  'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2023/08/17/84a64c07-cd2e-4cf9-bed2-c05bc9ff39be-1692282964151-0e9a21c8132c54e0f7ea1656f735f169.jpeg',
  4000000,
  250000,
  200000
 ),
 (
  '2023 AHN HYO SEOP ASIA TOUR THE PRESENT SHOW IN JAKARTA HERE AND NOW',
  'music',
  '2023-09-09',
  '19:00 - 22:00 WIB',
  'jakarta',
  'Acara dilaksanakan di The Kasablanka Hall pada 9 September 2023.',
  'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2023/07/04/d2384104-9ec0-44a1-aea4-8fa0359b2697-1688478805540-a3ffdd9a7ab588510c0fb52001c6d9ad.jpeg',
  2825000,
  1825000,
  1225000
 ),
 (
  'Ultra Beach Bali 2023',
  'music',
  '2023-09-20',
  '16.00 - 24.00 WITA',
  'bali',
  'Location: Locca Sea House, Jimbaran, Badung, Bali. Stay tuned to our Instagram @ultrabali for more important information',
  'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2023/06/28/b6d538aa-b2bc-417f-b6cc-77d32401327c-1687971210808-f6c0f013cfbfaa7dd275854b28aac7b9.png',
  17160000,
  1625000,
  1250000
 ),
 (
  'Dream Festival Collaboration VOL 4 - Cakra Khan',
  'music',
  '2023-09-17',
  '16:00 - 17:30 WIB',
  'malaysia',
  'The event will be held on September 17th, 2023 at Zepp Kuala Lumpur.',
  'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2023/08/28/5387fd8d-d083-4a94-a442-d641fea96872-1693192249012-1923036c004540b369d5ec1941aad553.png',
  600000,
  550000,
  300000
 ),
 (
  'Resistance Bali 2023',
  'music',
  '2023-09-24',
  '16.00 - 24.00 WITA',
  'bali',
  'Location : Locca Sea House, Jimbaran, Badung, Bali.Stay tuned to our Instagram @resistance for more important informations.',
  'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2023/06/29/1a04256b-e06a-4faf-a8c3-74aec8d54553-1688016175597-70613f3671b7b1df4167165ccc91c7c6.png',
  13000000,
  875000,
  625000
 ),
 (
  'SCRUBB LIVE IN JAKARTA',
  'music',
  '2023-09-23',
  '19:00 - 20:15 WIB',
  'jakarta',
  'The concert will be held on September 23rd, 2023 at Kuningan City Ballroom, Jakarta',
  'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2023/08/14/da6c3b29-2610-46c1-b8dc-bb36f415aaec-1692015596757-5b3dc91c706f821966465e95d80541f0.jpg',
  1180000,
  700000,
  550000
 ),
 (
  'PERTAMINA GRAND PRIX OF INDONESIA 2023',
  'sports',
  '2023-10-13',
  '13:00 - 17:00 WIB',
  'lombok',
  'Experience the thrill of the engines roar and prepare for an exhilarating high-speed adventure at MotoGP Mandalika 2023.',
  'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2023/07/23/54cd4451-f46e-4f38-8700-ae9dd6caadb3-1690115810739-ee41a3834e7c25f444ebe20d3290b0f1.png',
  650000,
  500000,
  250000
 ),
 (
  'BRI LIGA 1 2023-2024 PERSEBAYA SURABAYA VS BORNEO FC',
  'sports',
  '2023-09-03',
  '20:00 - 22:00 WIB',
  'surabaya',
  'The match will take place on Sunday, September 3rd, 2023 at Gelora Bung Tomo Stadium, Surabaya.',
  'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2023/08/26/4cb02d41-fde4-4112-9feb-0d9eb340d2f3-1693038834918-6447a2e9c9af741a056c44e356c70238.jpg',
  150000,
  100000,
  75000
 ),
 (
  'International Friendly Match U-17: Indonesia U-17 Vs Korea Selatan U-17',
  'sports',
  '2023-08-30',
  '18:00 - 22:00 WIB',
  'bekasi',
  'The match will be held on 30 August 2023 at Patriot Candrabhaga Stadium, Bekasi',
  'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2023/08/25/274282ec-920b-4940-9d7d-f18b411446a1-1692949365327-0b5981b8a0921b6fc351308e195ba6b4.jpg',
  250000,
  150000,
  75000
 ),
 (
  'THAILAND GRAND PRIX 2023',
  'sports',
  '2023-10-27',
  '20:00 - 22:00 WIB',
  'jakarta',
  'The event will be held on 27-29 October 2023 at Jakarta',
  'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2023/07/20/841ba5ee-b875-4b9f-83ff-bcdc0bcf5457-1689844790925-f15290bd17d49694a0e3219c34fc83be.jpeg',
  99000,
  0,
  0
 ),
 (
  '2023 LE SSERAFIM TOUR ‘FLAME RISES’ IN JAKARTA',
  'music',
  '2023-10-27',
  '20:00 - 22:00 WIB',
  'jakarta',
  'Saksikan langsung penampilan memukau girlband asal Korea Selatan, LE SSERAFIM lewat tur perdana mereka, “2023 LE SSERAFIM TOUR FLAME RISES IN JAKARTA”',
  'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2023/08/02/2367ee3d-5bd4-4667-a3a7-b21ba21d0c6f-1690966599553-f25ad11735cb32b08d0f47c8e56508c4.jpg',
  1927500,
  3077500,
  3480000
 ),
 (
  'NANON 1ST FANCON IN JAKARTA',
  'music',
  '2023-09-30',
  '20:00',
  'jakarta',
  'Saksikan langsung penampilan aktor Thailand, Nanon di fancon perdananya, NANON 1ST FANCON IN JAKARTA! Fancon akan berlangsung pada 30 September 2023 di Gandaria City Hall, Jakarta.',
  'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2023/09/07/a2c68280-9b9d-4f5c-9457-eb853b60f9df-1694072373763-89620907e9e1efb7aa19ac56a5225437.jpg',
  1100000,
  1800000,
  2800000
 ),
 (
  'The Great Journey Of Noah -Jakarta',
  'music',
  '2023-12-03',
  '11:00',
  'jakarta',
  'Acara akan berlangsung pada 3 Desember 2023 di Beach City International Stadium, Jakarta. Open Gate: 11.00, Start Show: 20.00',
  'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2023/09/09/5cc26b60-4c82-4692-ae16-2eed4ed1017d-1694268410889-56da57698522ddfa2ada5a4bd423e67e.jpg',
  300000,
  500000,
  1000000
 ),
 (
  'KONSER LEGEND MUSIK ERAKU 2.0',
  'music',
  '2023-10-08',
  '19:00',
  'surabaya',
  'Saksikan penampilan legendaris dari Atiek CB, Ita Purnamasari, Mayangsari, dan Ronnie Sianturi di Konser Legend Musik EraKu 2.0!,Konser akan berlangsung pada 8 Oktober 2023 di Westin Hotel, Surabaya',
  'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2023/09/05/99cf58c7-79ee-4414-a7a6-81be303246b3-1693924985208-8b24cdec546832df7c5603ba93d6b259.jpg',
  500000,
  600000,
  750000
 ),
 (
  'ATLAS NYE PARTY 2023 Alert: Martin Garrix Takes Center Stage! Get set for THE BIGGEST NYE PARTY you’ll ever have',
  'music',
  '2023-12-31',
  '20:00',
  'bali',
  'Rayakan tahun baru dengan menyaksikan penampilan Martin Garrix dalam event ATLAS NYE PARTY 2023',
  'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2023/08/14/a1763e69-2ca6-4310-a32c-d73328722c83-1692007207993-599d104a21ac8f1305ca370a9f74137f.png',
  1500000,
  2000000,
  5000000
 ),
 (
  'PETRONAS GRAND PRIX OF MALAYSIA 2023',
  'sports',
  '2023-11-10',
  '10:00',
  'malaysia',
  'Kuala Lumpur, Malaysia 10 Nov 2023',
  'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2023/02/14/1b2c5c3b-dbb1-47e6-a796-dd19d814bc5a-1676350233194-3738771c80db00e4248fc8f759f0683d.jpg',
  400000,
  525000,
  750000
 ),
 (
  'The Girl Fest Surabaya',
  'music',
  '2023-09-22',
  '09:00',
  'surabaya',
  'Datang ke The Girl Fest untuk merayakan dan menginspirasi diri sendiri lewat talkshow dan pertunjukkan musik!, Acara akan berlangsung pada 22-24 September 2023 di Tunjungan Plaza Convention Centre, Surabaya.',
  'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2023/09/06/a048f15d-3e92-467a-a66d-28e7c37cda56-1693980548224-7604654a5db36a095a490b10668ae731.png',
  20000,
  30000,
  50000
 ),
 (
  'A Family Symphony Concert',
  'music',
  '2023-10-19',
  '19:30',
  'jakarta',
  'Tonton langsung A Family Symphony Concert yang dimeriahkan oleh Addie MS, Memes, Kevin Aprilio, dan Tristan Juliano!, Konser akan berlangsung pada 19 Oktober 2023 di Ciputra Artpreneur Theatre, Jakarta.',
  'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2023/09/04/98ef07c7-a944-4d9d-a6ec-7ed0d4364a87-1693793477125-7998b479191d77f89e4bc31b77740bb9.jpeg',
  1575000,
  2100000,
  2650000
 ),
 (
  'MARKETEERS HANGOUT 2023',
  'webinar',
  '2023-09-18',
  '10:00',
  'jakarta',
  'Datang langsung ke Marketeers Hangout untuk dapat inspirasi soal topik-topik pemasaran dari ahlinya. Acara akan berangsung pada 18 September 2023 di Ciputra Artpreneur, Jakarta.',
  'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2023/08/25/7780f84a-810c-466f-bd43-2aa72427e488-1692949993059-9bdb1ce9a44fb9e81f5ae64cf1bb93d1.jpg',
  800000,
  1000000,
  1500000
 ),
 (
  'GRATYO - 5 Strategi Bangun Brand yang Kuat & Karyawan Bagus di Bisnis By GRATYO',
  'webinar',
  '2023-09-21',
  '08:00',
  'online',
  'Belajar langsung cara membuat brand dan karyawan yang kuat dengan GRATYO LIVE BUSINESS COACHING!, Acara daring ini akan berlangsung pada 21 September 2023',
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1443&q=80',
  0,
  0,
  195000
 );
 
 select * from list_event;


 CREATE TABLE `db_mytix`.`account` (
  `account_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `referral_code` varchar(45) DEFAULT NULL,
  `account_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`account_id`)
);

INSERT INTO `db_mytix`.`account` (`first_name`,`last_name`,`username`,`email`,`password`,`referral_code`,`account_type`)
VALUES 
('Jaka','Tarub','jakatarub42','jakatarub@pendekar.com','Goloksakt1!','mytixjaktar666','User'),
('Damar','Wilogo','damarpenyusup','damar@tenis.com','Tenisdulu123#','mytixdamsup','User'),
('Anida','Bajumi','anidasabrina666','anidasabrina@wewe.com','Ayamgoreng1!','mytixansab','Event Organizer'),
('Anggara','Tri Putra','anggaratriputra','anggaratriputra@gmail.com','Anggara123','mytixanggaratriputra','Event Organizer'),
('Fauza','Rizky','rizkys','fauzasmg@gmail.com','RR11zky','mytixrzkys','Event Organizer'),
('Jaka','Widada','jakawidada','jakaui@mail.com','Asd123asd123','mytixjakawidada','User'),
('Nanang','Supratnang','nangzky','nanang77@mail.com','N4ngnun6','mytixnangzky','User'),
('Brez','Mariono','breskie','bresk1e@mail.com','!k4nH1u','mytixbreskie','User'),
('Markona','Mardun','markona','markonam@mail.com','Hydr0c0c0','mytixmarkona','User'),
('Diamond','Bebi','babiku','diamondbabi@mail.com','H1jrah!','mytixbabiku','User');