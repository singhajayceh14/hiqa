-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 19, 2023 at 05:50 AM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hiqa`
--

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `image` text NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `title`, `image`, `status`, `updatedAt`, `createdAt`) VALUES
(1, 'Test Banner', '1689501869726-Untitled1.jpg', 1, '2023-07-16 15:34:29', '2023-07-16 10:41:54'),
(2, 'sad', '1689504487986-banner1.jpg', 1, '2023-07-16 16:18:08', '2023-07-16 11:20:31');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `slug` text,
  `short_description` text,
  `long_description` text,
  `image` text,
  `duraion_course` varchar(255) DEFAULT NULL,
  `total_seat` varchar(255) DEFAULT NULL,
  `site_visits` text,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `name`, `slug`, `short_description`, `long_description`, `image`, `duraion_course`, `total_seat`, `site_visits`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'NDT INSPECTOR', 'ndt-inspector', '<p>Minimum Internship Salary: INR 15,000.00 to INR 30,000.00 Per Month<br>Food &amp; Accommodation during training period &amp; Internship period only<br></p>', '', '1689495165155-rXwxJojeTR.jpg', '60 Days', '120', 'Limited to National Only', 1, '2023-07-12 12:29:35', '2023-07-16 13:42:45'),
(2, 'ADVANCED NDT INSPECTOR', 'advanced-ndt-inspector', '<p>Minimum Internship Salary: INR 18,000.00 to INR 40,000.00 Per MonFood &amp; Accommodation during the training period &amp; Internship period only</p>', '', '1689495963485-download.jpg', '60 Days', '120', 'Limited to National Only', 1, '2023-07-12 12:29:35', '2023-07-16 13:56:03'),
(3, 'THIRD PARTY INSPECTOR', 'third-party-inspector', '<p>Minimum Internship Salary: INR 20,000.00 to INR 50,000.00 Per MonthFood &amp; Accommodation during training period &amp; Internship period only.</p>', '', '1689496110671-csm_TPI_3_d2edea42f4.jpg', '60 Days', '80', 'Limited to National Only', 1, '2023-07-12 12:29:35', '2023-07-16 13:58:30'),
(4, 'CIVIL QUALITY ASSURANCE INSPECTOR', 'civil-quality-assurance-inspector', '<p>Minimum Internship Salary: INR 18,000.00 to INR 60,000.00 Per MonFood &amp; Accommodation during training period &amp; Internship period only.</p>', '', '1689496779602-550288_fd98c30a4d3c431a8697ae247d62141c~mv2.png', '60 Days', '120', 'Limited to National Only', 1, '2023-07-12 12:29:35', '2023-07-16 14:09:39'),
(5, 'STORAGE TANKS QUALITY ASSURANCE INSPECTOR', 'storage-tanks-quality-assurance-inspector', '<p>Minimum Internship Salary: INR 35,000.00 to INR 85,000.00 Per Mon Food &amp; Accommodation during training period &amp; Internship period only.</p>', '', '1689497079036-frp-hcl-storage-tanks-500x500.png', '90 Days', '120', 'National & International', 1, '2023-07-12 12:29:35', '2023-07-16 14:16:43'),
(6, 'NDT INSPECTOR', 'ndt-inspector', '<p>Minimum Internship Salary: INR 15,000.00 to INR 30,000.00 Per Month<br>Food &amp; Accommodation during training period &amp; Internship period only<br></p>', '', '1689495165155-rXwxJojeTR.jpg', '60 Days', '120', 'Limited to National Only', 1, '2023-07-12 12:29:35', '2023-07-16 13:42:45');

-- --------------------------------------------------------

--
-- Table structure for table `front_pages`
--

CREATE TABLE `front_pages` (
  `id` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `title` text NOT NULL,
  `description` text,
  `image` text,
  `status` tinyint(2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `front_pages`
--

INSERT INTO `front_pages` (`id`, `type`, `title`, `description`, `image`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'home', 'OUR IMPACT ON SOCIETY', '<p>Generating 60+ Students every month and 720+ Students every Year with best training and in<br>hand experience for Free of Cost in a single state.<br><br>6 to 12 Months Schedule where a students learns and earns and get explored to various<br>National &amp; International Industrial Opportunities.<br><br>Supporting National and Inter-State Industrial<br>Development by providing expertized manpower<br><br>Developing Opportunities for Training &amp; Employment for well deserved students in State<br></p>', '1689491604139-about.jpg', 1, '2023-07-11 13:14:35', '2023-07-16 12:46:16'),
(2, 'home', 'WHAT WE AER PROVIDING', '<ul><li style=\"text-align: justify;\"><strong>FREE TRAINING &amp; CERTIFICATION</strong><br>&nbsp; &nbsp; &nbsp; &nbsp; We are providing free training and&nbsp;certifications for the students. Including&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<ul><li style=\"text-align: justify;\">&nbsp; &nbsp; &nbsp; &nbsp; Theoretical, Practical, and On-Site Training<br><br><strong>FREE ACCOMMODATION &amp; FOOD</strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </li><li style=\"text-align: justify;\">&nbsp; &nbsp; &nbsp; &nbsp; A paid internship program shall be provided to each student, <ul><li style=\"text-align: justify;\">&nbsp; &nbsp; &nbsp; &nbsp; where the student&nbsp;can work and get experience as well as<br>&nbsp; &nbsp; &nbsp; &nbsp; earn for a defined period and a chance for International Visit</li></ul></li></ul></li><li style=\"text-align: justify;\"><br><strong>GUARANTEED PAID INTERNSHIP</strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<ul><li style=\"text-align: justify;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Free Accommodation &amp; Food is provided to the students during<ul><li style=\"text-align: justify;\">&nbsp; &nbsp; &nbsp; &nbsp; their training period&nbsp;at the training center as well as</li><li style=\"text-align: justify;\">&nbsp; &nbsp; &nbsp; &nbsp;during&nbsp;the Paid Internship Period<ul><li style=\"text-align: justify;\"><br></li></ul></li></ul></li></ul></li></ul>', '1689492501323-course-1.jpg', 1, '2023-07-16 12:58:21', '2023-07-16 13:10:08');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `title` text,
  `sub_title` text,
  `address` text,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `email` text,
  `phone` varchar(255) DEFAULT NULL,
  `facebook_url` text,
  `twitter_url` text,
  `instagram_url` text,
  `youtube_url` text,
  `linkedin_url` text,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `title`, `sub_title`, `address`, `latitude`, `longitude`, `email`, `phone`, `facebook_url`, `twitter_url`, `instagram_url`, `youtube_url`, `linkedin_url`, `createdAt`, `updatedAt`) VALUES
(1, 'asdasdasdasdasd', 'asdasdasdasd', 'RTF -04,Royal, tower market, Shipra Suncity, Indirapuram, Ghaziabad, Uttar Pradesh 201012, India', '28.6377532', '77.3780633', 'info@hiqa.in', '96098981231', 'https://www.facebook.com/', 'https://twitter.com/i/flow/login?redirect_after_login=%2F', 'https://www.instagram.com/', 'https://www.skype.com/en/', 'https://www.linkedin.com/home?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=in', '2023-07-13 16:56:01', '2023-07-13 20:40:42');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(25) DEFAULT NULL,
  `mobile_number` varchar(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `email_verified` tinyint(1) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `email_verified_at` datetime DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  `status` tinyint(4) DEFAULT '0',
  `image` varchar(255) NOT NULL DEFAULT '',
  `last_login_at` datetime DEFAULT NULL,
  `last_login_ip` varchar(255) DEFAULT NULL,
  `notification_status` tinyint(4) DEFAULT NULL,
  `admin_approved` int(11) DEFAULT NULL,
  `device_id` varchar(255) DEFAULT NULL,
  `device_token` varchar(255) DEFAULT NULL,
  `country_code` varchar(255) DEFAULT NULL,
  `token` text,
  `fcm_token` text,
  `login_expire` tinyint(4) DEFAULT NULL,
  `device_type` varchar(255) DEFAULT NULL,
  `social_type` text,
  `social_id` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `mobile_number`, `email`, `email_verified`, `role_id`, `email_verified_at`, `password`, `remember_token`, `status`, `image`, `last_login_at`, `last_login_ip`, `notification_status`, `admin_approved`, `device_id`, `device_token`, `country_code`, `token`, `fcm_token`, `login_expire`, `device_type`, `social_type`, `social_id`, `created_at`, `updated_at`) VALUES
(1, 'Admin', '9609898985', 'info@hiqa.in', 1, 0, '2023-07-02 12:42:09', '$2b$10$Kcz6qGYeJfvxeZ1EZAs1cepj1M9CUftPT95zcaWwsa8L8Xj.2MNZ2', NULL, 1, '1689052834808-HIQA LOGO.jpg', NULL, NULL, NULL, NULL, NULL, 'asdasdasdas', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY4OTQ4MzQ3NywiZXhwIjoxNzIxMDE5NDc3fQ.LhAnZkPWhDb6oGQZ4LF-nx11hCkOJKUQtrLlGYk4avk', NULL, NULL, 'IOS', NULL, NULL, '2023-04-09 01:39:10', '2023-07-16 10:27:57'),
(2, 'Ashish', '321654987', 'ashish@yopmail.com', 1, 1, '2023-07-11 12:58:55', NULL, NULL, 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-07-11 12:58:55', '2023-07-11 12:58:55'),
(3, 'Manoj', '321654654', 'Manoj@yopmail.com', 1, 1, '2023-07-11 12:58:55', NULL, NULL, 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'Ravi', '123456789', 'ravi@gmail.com', NULL, 1, NULL, NULL, NULL, 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-07-11 15:09:12', '2023-07-11 15:09:12'),
(5, 'Test', '123456789', 'test@yopmail.com', NULL, 1, NULL, '$2b$10$KSapbMvmt7jd2ko/E/hRz.VEm7YzmWEpP6fywcrHIsUe6fkRhDSzu', NULL, 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-07-11 15:22:09', '2023-07-11 15:30:01'),
(6, 'test 1 Test', '123456789', 'test1@yopmail.com', NULL, 1, NULL, '$2b$10$NKjTefFCt8C7lsUPOAhBM.xw3K6l8V2Sgw4HKkztOiFvpv/WUD976', NULL, 2, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-07-11 15:31:44', '2023-07-12 12:19:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `front_pages`
--
ALTER TABLE `front_pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `front_pages`
--
ALTER TABLE `front_pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
