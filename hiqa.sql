-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 10, 2023 at 12:56 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `title`, `image`, `status`, `updatedAt`, `createdAt`) VALUES
(1, 'Test Banner', '1689501869726-Untitled1.jpg', 1, '2023-07-16 15:34:29', '2023-07-16 10:41:54'),
(2, 'sad', '1689504487986-banner1.jpg', 1, '2023-07-16 16:18:08', '2023-07-16 11:20:31');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` text DEFAULT NULL,
  `slug` text DEFAULT NULL,
  `short_description` text DEFAULT NULL,
  `long_description` longtext DEFAULT NULL,
  `image` text NOT NULL,
  `status` tinyint(2) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `slug`, `short_description`, `long_description`, `image`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Cras accumsan nulla nec lacus ultricies placerat.', 'cras-accumsan-nulla-nec-lacus-ultricies-placerat', 'Curabitur sagittis libero tincidunt tempor finibus. Mauris at dignissim ligula, nec tristique orci.', '<p>The world of search engine optimization is complex and ever-changing, but you can easily understand the basics, and even a small amount of SEO knowledge can make a big difference. Free SEO education is also widely available on the web, including in guides like this! (Woohoo!) This guide is designed to describe all major aspects of SEO, from finding the terms and phrases (keywords) that can generate qualified traffic to your website, to making your site friendly to search engines, to building links and marketing the unique value of your site.Etiam pharetra erat sed fermentum feugiat velit mauris egestas quam ut erat justo.</p>\r\n<br><br><br>\r\n<p>Fusce eleifend donec sapien sed phase lusa pellentesque lacus.Vivamus lorem arcu semper duiac. Cras ornare arcu avamus nda leo Etiam ind arcu. Morbi justo mauris tempus pharetra interdum at congue semper purus. Lorem ipsum dolor sit.The world of search engine optimization is complex and ever-changing, but you can easily understand the basics.</p><br><br>\r\n<p>Lorem ipsum is simply free text used by copytyping refreshing. Neque porro est qui dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Aelltes port lacus quis enim var sed efficitur turpis gilla sed sit amet finibus eros. Lorem Ipsum is simply dummy text of the printing.</p>\r\n<br><br>\r\n<br><br>', 'inner_b1.jpg', 1, '2023-07-21 00:52:26', '2023-07-21 00:52:26'),
(2, 'Cras accumsan nulla nec lacus ultricies placerat.', 'cras-accumsan-nulla-nec-lacus-ultricies-placerat', 'Curabitur sagittis libero tincidunt tempor finibus. Mauris at dignissim ligula, nec tristique orci.', '<p>The world of search engine optimization is complex and ever-changing, but you can easily understand the basics, and even a small amount of SEO knowledge can make a big difference. Free SEO education is also widely available on the web, including in guides like this! (Woohoo!) This guide is designed to describe all major aspects of SEO, from finding the terms and phrases (keywords) that can generate qualified traffic to your website, to making your site friendly to search engines, to building links and marketing the unique value of your site.Etiam pharetra erat sed fermentum feugiat velit mauris egestas quam ut erat justo.</p>\r\n<br><br><br>\r\n<p>Fusce eleifend donec sapien sed phase lusa pellentesque lacus.Vivamus lorem arcu semper duiac. Cras ornare arcu avamus nda leo Etiam ind arcu. Morbi justo mauris tempus pharetra interdum at congue semper purus. Lorem ipsum dolor sit.The world of search engine optimization is complex and ever-changing, but you can easily understand the basics.</p><br><br>\r\n<p>Lorem ipsum is simply free text used by copytyping refreshing. Neque porro est qui dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Aelltes port lacus quis enim var sed efficitur turpis gilla sed sit amet finibus eros. Lorem Ipsum is simply dummy text of the printing.</p>\r\n<br><br>\r\n<br><br>', 'inner_b2.jpg', 1, '2023-07-21 00:53:35', '2023-07-21 00:53:35'),
(3, 'Cras accumsan nulla nec lacus ultricies placerat.', 'cras-accumsan-nulla-nec-lacus-ultricies-placerat', 'Curabitur sagittis libero tincidunt tempor finibus. Mauris at dignissim ligula, nec tristique orci.', '<p>The world of search engine optimization is complex and ever-changing, but you can easily understand the basics, and even a small amount of SEO knowledge can make a big difference. Free SEO education is also widely available on the web, including in guides like this! (Woohoo!) This guide is designed to describe all major aspects of SEO, from finding the terms and phrases (keywords) that can generate qualified traffic to your website, to making your site friendly to search engines, to building links and marketing the unique value of your site.Etiam pharetra erat sed fermentum feugiat velit mauris egestas quam ut erat justo.</p>\r\n<br><br><br>\r\n<p>Fusce eleifend donec sapien sed phase lusa pellentesque lacus.Vivamus lorem arcu semper duiac. Cras ornare arcu avamus nda leo Etiam ind arcu. Morbi justo mauris tempus pharetra interdum at congue semper purus. Lorem ipsum dolor sit.The world of search engine optimization is complex and ever-changing, but you can easily understand the basics.</p><br><br>\r\n<p>Lorem ipsum is simply free text used by copytyping refreshing. Neque porro est qui dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Aelltes port lacus quis enim var sed efficitur turpis gilla sed sit amet finibus eros. Lorem Ipsum is simply dummy text of the printing.</p>\r\n<br><br>\r\n<br><br>', 'inner_b3.jpg', 1, '2023-07-21 00:52:26', '2023-07-21 00:52:26'),
(4, 'Cras accumsan nulla nec lacus ultricies placerat.', 'cras-accumsan-nulla-nec-lacus-ultricies-placerat', 'Curabitur sagittis libero tincidunt tempor finibus. Mauris at dignissim ligula, nec tristique orci.', '<p>The world of search engine optimization is complex and ever-changing, but you can easily understand the basics, and even a small amount of SEO knowledge can make a big difference. Free SEO education is also widely available on the web, including in guides like this! (Woohoo!) This guide is designed to describe all major aspects of SEO, from finding the terms and phrases (keywords) that can generate qualified traffic to your website, to making your site friendly to search engines, to building links and marketing the unique value of your site.Etiam pharetra erat sed fermentum feugiat velit mauris egestas quam ut erat justo.</p>\r\n<br><br><br>\r\n<p>Fusce eleifend donec sapien sed phase lusa pellentesque lacus.Vivamus lorem arcu semper duiac. Cras ornare arcu avamus nda leo Etiam ind arcu. Morbi justo mauris tempus pharetra interdum at congue semper purus. Lorem ipsum dolor sit.The world of search engine optimization is complex and ever-changing, but you can easily understand the basics.</p><br><br>\r\n<p>Lorem ipsum is simply free text used by copytyping refreshing. Neque porro est qui dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Aelltes port lacus quis enim var sed efficitur turpis gilla sed sit amet finibus eros. Lorem Ipsum is simply dummy text of the printing.</p>\r\n<br><br>\r\n<br><br>', 'inner_b2.jpg', 1, '2023-07-21 00:53:35', '2023-07-21 00:53:35');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `slug` text DEFAULT NULL,
  `short_description` text DEFAULT NULL,
  `long_description` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `duraion_course` varchar(255) DEFAULT NULL,
  `total_seat` varchar(255) DEFAULT NULL,
  `site_visits` text DEFAULT NULL,
  `general` text DEFAULT NULL,
  `ews` text DEFAULT NULL,
  `special_consideration` text DEFAULT NULL,
  `other` text DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `name`, `slug`, `short_description`, `long_description`, `image`, `duraion_course`, `total_seat`, `site_visits`, `general`, `ews`, `special_consideration`, `other`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'NDT INSPECTOR', 'ndt-inspector', '<p>Minimum Internship Salary: INR 15,000.00 to INR 30,000.00 Per Month<br>Food &amp; Accommodation during training period &amp; Internship period only<br></p>', '', '1689789643696-couress-img-1.png', '60 Days', '120', 'Limited to National Only', '40%', '25%', '25%', '10%', 1, '2023-07-12 12:29:35', '2023-07-19 23:30:43'),
(2, 'ADVANCED NDT INSPECTOR', 'advanced-ndt-inspector', '<p>Minimum Internship Salary: INR 18,000.00 to INR 40,000.00 Per Month<br>Food &amp; Accommodation during the training period &amp; Internship period only<br></p>', '', '1689789660262-couress-img-2.png', '60 Days', '120', 'Limited to National Only', '40%', '25%', '25%', '10%', 1, '2023-07-12 12:29:35', '2023-07-19 23:38:00'),
(3, 'THIRD PARTY INSPECTOR', 'third-party-inspector', '<p>Minimum Internship Salary: INR 20,000.00 to INR 50,000.00 Per Month<br>Food &amp; Accommodation during the training period &amp; Internship period only<br></p>', '', '1689789670947-couress-img-3.png', '60 Days', '80', 'Limited to National Only', '40%', '25%', '25%', '10%', 1, '2023-07-12 12:29:35', '2023-07-19 23:39:54'),
(4, 'CIVIL QUALITY ASSURANCE INSPECTOR', 'civil-quality-assurance-inspector', '<p>Minimum Internship Salary: INR 18,000.00 to INR 60,000.00 Per Month<br>Food &amp; Accommodation during the training period &amp; Internship period only<br></p>', '', '1689789682095-couress-img-4.png', '60 Days', '120', 'Limited to National Only', '40%', '25%', '25%', '10%', 1, '2023-07-12 12:29:35', '2023-07-19 23:40:41'),
(5, 'STORAGE TANKS QUALITY ASSURANCE INSPECTOR', 'storage-tanks-quality-assurance-inspector', '<p>Minimum Internship Salary: INR 35,000.00 to INR 85,000.00 Per Month<br>Food &amp; Accommodation during the training period &amp; Internship period only<br></p>', '', '1689789696229-couress-img-5.png', '90 Days', '120', 'National & International', '40%', '25%', '25%', '10%', 1, '2023-07-12 12:29:35', '2023-07-19 23:41:26'),
(6, 'PRESSURE VESSELS QUALITY ASSURANCE INSPECTOR', 'pressure-vessels-quality-assurance-inspector', '<p>Minimum Internship Salary: INR 35,000.00 to INR 85,000.00 Per Month<br>Food &amp; Accommodation during the training period &amp; Internship period only<br></p>', '', '1689789900266-couress-img-6.png', '60 Days', '120', 'National & International', '40%', '25%', '25%', '10%', 1, '2023-07-12 12:29:35', '2023-07-19 23:42:38'),
(7, 'BOILERS QUALITY ASSURANCE INSPECTOR', 'boilers-quality-assurance-inspector', '<p>Minimum Internship Salary: INR 35,000.00 to INR 85,000.00 Per Month<br>Food &amp; Accommodation during training period &amp; Internship period only<br></p>', '', '1689790689082-couress-img-7.png', '90 Days', '120', 'National & International', '40%', '25%', '25%', '10%', 1, '2023-07-12 12:29:35', '2023-07-19 23:48:09'),
(8, 'PIPELINE QUALITY ASSURANCE INSPECTOR ', 'pipeline-quality-assurance-inspector', '<p>Minimum Internship Salary: INR 25,000.00 to INR 80,000.00 Per Month<br>Food &amp; Accommodation during the training period &amp; Internship period only<br></p>', '', '1689790662606-couress-img-8.png', '60 Days', '84', 'National & International', '40%', '25%', '25%', '10%', 1, '2023-07-12 12:29:35', '2023-07-19 23:47:42');

-- --------------------------------------------------------

--
-- Table structure for table `course_eligibility_details`
--

CREATE TABLE `course_eligibility_details` (
  `id` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `qualificationId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `course_eligibility_details`
--

INSERT INTO `course_eligibility_details` (`id`, `courseId`, `qualificationId`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, '2023-07-24 23:37:15', '2023-07-24 23:37:15'),
(2, 1, 2, '2023-07-24 23:37:15', '2023-07-24 23:37:15'),
(3, 2, 1, '2023-08-05 14:49:37', '2023-08-05 14:49:37'),
(4, 2, 2, '2023-08-05 14:49:37', '2023-08-05 14:49:37'),
(5, 2, 3, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(6, 2, 4, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(7, 2, 8, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(8, 3, 1, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(9, 3, 2, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(10, 3, 3, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(11, 3, 4, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(12, 3, 5, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(13, 3, 6, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(14, 3, 7, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(15, 3, 8, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(16, 4, 1, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(17, 4, 2, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(18, 4, 3, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(19, 4, 4, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(20, 4, 5, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(21, 4, 6, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(22, 4, 7, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(23, 4, 8, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(24, 5, 1, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(25, 5, 2, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(26, 5, 3, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(27, 5, 4, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(28, 5, 5, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(29, 5, 6, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(30, 5, 7, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(31, 5, 8, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(32, 6, 1, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(33, 6, 2, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(34, 6, 3, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(35, 6, 4, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(36, 6, 5, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(37, 6, 6, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(38, 6, 7, '2023-08-05 14:55:10', '2023-08-05 14:55:10'),
(39, 6, 8, '2023-08-05 14:55:10', '2023-08-05 14:55:10');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `short_description` longtext DEFAULT NULL,
  `long_description` longtext DEFAULT NULL,
  `slug` text NOT NULL,
  `image` text DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `event_start_time` text DEFAULT NULL,
  `event_end_time` text DEFAULT NULL,
  `event_address` text DEFAULT NULL,
  `event_facebook_url` text DEFAULT NULL,
  `event_instagram_url` text DEFAULT NULL,
  `event_twitter_url` text DEFAULT NULL,
  `status` tinyint(2) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `short_description`, `long_description`, `slug`, `image`, `event_date`, `event_start_time`, `event_end_time`, `event_address`, `event_facebook_url`, `event_instagram_url`, `event_twitter_url`, `status`, `createdAt`, `updatedAt`) VALUES
(1, '33rd Annual Conference & Exhibition on Non-Destructive Evaluation (NDE 2023)', 'The Annual Conference of Indian Society for Non-Destructive Testing (ISNT), the Official Technical Society for NDT/NDE in India, NDE 2023, is organised every year', '<p>The world of search engine optimization is complex and ever-changing, but you can easily understand the basics, and even a small amount of SEO knowledge can make a big difference. Free SEO education is also widely available on the web, including in guides like this! (Woohoo!) This guide is designed to describe all major aspects of SEO, from finding the terms and phrases (keywords) that can generate qualified traffic to your website, to making your site friendly to search engines, to building links and marketing the unique value of your site.Etiam pharetra erat sed fermentum feugiat velit mauris egestas quam ut erat justo.</p>\r\n<br><br><br>\r\n<p>Fusce eleifend donec sapien sed phase lusa pellentesque lacus.Vivamus lorem arcu semper duiac. Cras ornare arcu avamus nda leo Etiam ind arcu. Morbi justo mauris tempus pharetra interdum at congue semper purus. Lorem ipsum dolor sit.The world of search engine optimization is complex and ever-changing, but you can easily understand the basics.</p><br><br>\r\n<p>Lorem ipsum is simply free text used by copytyping refreshing. Neque porro est qui dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Aelltes port lacus quis enim var sed efficitur turpis gilla sed sit amet finibus eros. Lorem Ipsum is simply dummy text of the printing.</p>\r\n<br><br>\r\n<br><br>', '33rd-annual-conference-and-exhibition-on-non-destructive-evaluation-nde-2023', 'evn-img-1.jpg', '2023-07-23', '4:00 pm', '6:00 pm', 'Pune, India', 'https://www.facebook.com/', 'https://www.facebook.com/', 'https://www.facebook.com/', 1, '2023-07-20 23:49:57', '2023-07-20 23:49:57'),
(2, '33rd Annual Conference & Exhibition on Non-Destructive Evaluation (NDE 2023)', 'The Annual Conference of Indian Society for Non-Destructive Testing (ISNT), the Official Technical Society for NDT/NDE in India, NDE 2023, is organised every year', '<p>The world of search engine optimization is complex and ever-changing, but you can easily understand the basics, and even a small amount of SEO knowledge can make a big difference. Free SEO education is also widely available on the web, including in guides like this! (Woohoo!) This guide is designed to describe all major aspects of SEO, from finding the terms and phrases (keywords) that can generate qualified traffic to your website, to making your site friendly to search engines, to building links and marketing the unique value of your site.Etiam pharetra erat sed fermentum feugiat velit mauris egestas quam ut erat justo.</p>\r\n<br><br><br>\r\n<p>Fusce eleifend donec sapien sed phase lusa pellentesque lacus.Vivamus lorem arcu semper duiac. Cras ornare arcu avamus nda leo Etiam ind arcu. Morbi justo mauris tempus pharetra interdum at congue semper purus. Lorem ipsum dolor sit.The world of search engine optimization is complex and ever-changing, but you can easily understand the basics.</p><br><br>\r\n<p>Lorem ipsum is simply free text used by copytyping refreshing. Neque porro est qui dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Aelltes port lacus quis enim var sed efficitur turpis gilla sed sit amet finibus eros. Lorem Ipsum is simply dummy text of the printing.</p>\r\n<br><br>\r\n<br><br>', '33rd-annual-conference-and-exhibition-on-non-destructive-evaluation-nde-2023', 'evn-img-2.jpg', '2023-07-23', '4:00 pm', '6:00 pm', 'Pune, India', 'https://www.facebook.com/', 'https://www.facebook.com/', 'https://www.facebook.com/', 1, '2023-07-20 23:49:57', '2023-07-20 23:49:57'),
(3, '33rd Annual Conference & Exhibition on Non-Destructive Evaluation (NDE 2023)', 'The Annual Conference of Indian Society for Non-Destructive Testing (ISNT), the Official Technical Society for NDT/NDE in India, NDE 2023, is organised every year', '<p>The world of search engine optimization is complex and ever-changing, but you can easily understand the basics, and even a small amount of SEO knowledge can make a big difference. Free SEO education is also widely available on the web, including in guides like this! (Woohoo!) This guide is designed to describe all major aspects of SEO, from finding the terms and phrases (keywords) that can generate qualified traffic to your website, to making your site friendly to search engines, to building links and marketing the unique value of your site.Etiam pharetra erat sed fermentum feugiat velit mauris egestas quam ut erat justo.</p>\r\n<br><br><br>\r\n<p>Fusce eleifend donec sapien sed phase lusa pellentesque lacus.Vivamus lorem arcu semper duiac. Cras ornare arcu avamus nda leo Etiam ind arcu. Morbi justo mauris tempus pharetra interdum at congue semper purus. Lorem ipsum dolor sit.The world of search engine optimization is complex and ever-changing, but you can easily understand the basics.</p><br><br>\r\n<p>Lorem ipsum is simply free text used by copytyping refreshing. Neque porro est qui dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Aelltes port lacus quis enim var sed efficitur turpis gilla sed sit amet finibus eros. Lorem Ipsum is simply dummy text of the printing.</p>\r\n<br><br>\r\n<br><br>', '33rd-annual-conference-and-exhibition-on-non-destructive-evaluation-nde-2023', 'evn-img-3.jpg', '2023-07-23', '4:00 pm', '6:00 pm', 'Pune, India', 'https://www.facebook.com/', 'https://www.facebook.com/', 'https://www.facebook.com/', 1, '2023-07-20 23:49:57', '2023-07-20 23:49:57'),
(4, '33rd Annual Conference & Exhibition on Non-Destructive Evaluation (NDE 2023)', 'The Annual Conference of Indian Society for Non-Destructive Testing (ISNT), the Official Technical Society for NDT/NDE in India, NDE 2023, is organised every year', '<p>The world of search engine optimization is complex and ever-changing, but you can easily understand the basics, and even a small amount of SEO knowledge can make a big difference. Free SEO education is also widely available on the web, including in guides like this! (Woohoo!) This guide is designed to describe all major aspects of SEO, from finding the terms and phrases (keywords) that can generate qualified traffic to your website, to making your site friendly to search engines, to building links and marketing the unique value of your site.Etiam pharetra erat sed fermentum feugiat velit mauris egestas quam ut erat justo.</p>\r\n<br><br><br>\r\n<p>Fusce eleifend donec sapien sed phase lusa pellentesque lacus.Vivamus lorem arcu semper duiac. Cras ornare arcu avamus nda leo Etiam ind arcu. Morbi justo mauris tempus pharetra interdum at congue semper purus. Lorem ipsum dolor sit.The world of search engine optimization is complex and ever-changing, but you can easily understand the basics.</p><br><br>\r\n<p>Lorem ipsum is simply free text used by copytyping refreshing. Neque porro est qui dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Aelltes port lacus quis enim var sed efficitur turpis gilla sed sit amet finibus eros. Lorem Ipsum is simply dummy text of the printing.</p>\r\n<br><br>\r\n<br><br>', '33rd-annual-conference-and-exhibition-on-non-destructive-evaluation-nde-2023', 'evn-img-4.jpg', '2023-07-23', '4:00 pm', '6:00 pm', 'Pune, India', 'https://www.facebook.com/', 'https://www.facebook.com/', 'https://www.facebook.com/', 1, '2023-07-20 23:49:57', '2023-07-20 23:49:57'),
(5, '33rd Annual Conference & Exhibition on Non-Destructive Evaluation (NDE 2023)', 'The Annual Conference of Indian Society for Non-Destructive Testing (ISNT), the Official Technical Society for NDT/NDE in India, NDE 2023, is organised every year', '<p>The world of search engine optimization is complex and ever-changing, but you can easily understand the basics, and even a small amount of SEO knowledge can make a big difference. Free SEO education is also widely available on the web, including in guides like this! (Woohoo!) This guide is designed to describe all major aspects of SEO, from finding the terms and phrases (keywords) that can generate qualified traffic to your website, to making your site friendly to search engines, to building links and marketing the unique value of your site.Etiam pharetra erat sed fermentum feugiat velit mauris egestas quam ut erat justo.</p>\r\n<br><br><br>\r\n<p>Fusce eleifend donec sapien sed phase lusa pellentesque lacus.Vivamus lorem arcu semper duiac. Cras ornare arcu avamus nda leo Etiam ind arcu. Morbi justo mauris tempus pharetra interdum at congue semper purus. Lorem ipsum dolor sit.The world of search engine optimization is complex and ever-changing, but you can easily understand the basics.</p><br><br>\r\n<p>Lorem ipsum is simply free text used by copytyping refreshing. Neque porro est qui dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Aelltes port lacus quis enim var sed efficitur turpis gilla sed sit amet finibus eros. Lorem Ipsum is simply dummy text of the printing.</p>\r\n<br><br>\r\n<br><br>', '33rd-annual-conference-and-exhibition-on-non-destructive-evaluation-nde-2023', 'evn-img-5.jpg', '2023-07-23', '4:00 pm', '6:00 pm', 'Pune, India', 'https://www.facebook.com/', 'https://www.facebook.com/', 'https://www.facebook.com/', 1, '2023-07-20 23:49:57', '2023-07-20 23:49:57'),
(6, '33rd Annual Conference & Exhibition on Non-Destructive Evaluation (NDE 2023)', 'The Annual Conference of Indian Society for Non-Destructive Testing (ISNT), the Official Technical Society for NDT/NDE in India, NDE 2023, is organised every year', '<p>The world of search engine optimization is complex and ever-changing, but you can easily understand the basics, and even a small amount of SEO knowledge can make a big difference. Free SEO education is also widely available on the web, including in guides like this! (Woohoo!) This guide is designed to describe all major aspects of SEO, from finding the terms and phrases (keywords) that can generate qualified traffic to your website, to making your site friendly to search engines, to building links and marketing the unique value of your site.Etiam pharetra erat sed fermentum feugiat velit mauris egestas quam ut erat justo.</p>\r\n<br><br><br>\r\n<p>Fusce eleifend donec sapien sed phase lusa pellentesque lacus.Vivamus lorem arcu semper duiac. Cras ornare arcu avamus nda leo Etiam ind arcu. Morbi justo mauris tempus pharetra interdum at congue semper purus. Lorem ipsum dolor sit.The world of search engine optimization is complex and ever-changing, but you can easily understand the basics.</p><br><br>\r\n<p>Lorem ipsum is simply free text used by copytyping refreshing. Neque porro est qui dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Aelltes port lacus quis enim var sed efficitur turpis gilla sed sit amet finibus eros. Lorem Ipsum is simply dummy text of the printing.</p>\r\n<br><br>\r\n<br><br>', '33rd-annual-conference-and-exhibition-on-non-destructive-evaluation-nde-2023', 'evn-img-6.jpg', '2023-07-23', '4:00 pm', '6:00 pm', 'Pune, India', 'https://www.facebook.com/', 'https://www.facebook.com/', 'https://www.facebook.com/', 1, '2023-07-20 23:49:57', '2023-07-20 23:49:57');

-- --------------------------------------------------------

--
-- Table structure for table `front_pages`
--

CREATE TABLE `front_pages` (
  `id` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `title` text NOT NULL,
  `description` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `status` tinyint(2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `front_pages`
--

INSERT INTO `front_pages` (`id`, `type`, `title`, `description`, `image`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'home', 'OUR IMPACT ON SOCIETY', '<p>Generating 60+ Students every month and 720+ Students every Year with best training and in<br>hand experience for Free of Cost in a single state.<br><br>6 to 12 Months Schedule where a students learns and earns and get explored to various<br>National &amp; International Industrial Opportunities.<br><br>Supporting National and Inter-State Industrial<br>Development by providing expertized manpower<br><br>Developing Opportunities for Training &amp; Employment for well deserved students in State<br></p>', '1689491604139-about.jpg', 1, '2023-07-11 13:14:35', '2023-07-16 12:46:16'),
(2, 'home', 'WHAT WE AER PROVIDING', '<ul><li style=\"text-align: justify;\"><strong>FREE TRAINING &amp; CERTIFICATION</strong><br>&nbsp; &nbsp; &nbsp; &nbsp; We are providing free training and&nbsp;certifications for the students. Including&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<ul><li style=\"text-align: justify;\">&nbsp; &nbsp; &nbsp; &nbsp; Theoretical, Practical, and On-Site Training<br><br><strong>FREE ACCOMMODATION &amp; FOOD</strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </li><li style=\"text-align: justify;\">&nbsp; &nbsp; &nbsp; &nbsp; A paid internship program shall be provided to each student, <ul><li style=\"text-align: justify;\">&nbsp; &nbsp; &nbsp; &nbsp; where the student&nbsp;can work and get experience as well as<br>&nbsp; &nbsp; &nbsp; &nbsp; earn for a defined period and a chance for International Visit</li></ul></li></ul></li><li style=\"text-align: justify;\"><br><strong>GUARANTEED PAID INTERNSHIP</strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<ul><li style=\"text-align: justify;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Free Accommodation &amp; Food is provided to the students during<ul><li style=\"text-align: justify;\">&nbsp; &nbsp; &nbsp; &nbsp; their training period&nbsp;at the training center as well as</li><li style=\"text-align: justify;\">&nbsp; &nbsp; &nbsp; &nbsp;during&nbsp;the Paid Internship Period<ul><li style=\"text-align: justify;\"><br></li></ul></li></ul></li></ul></li></ul>', '1689492501323-course-1.jpg', 1, '2023-07-16 12:58:21', '2023-07-16 13:10:08');

-- --------------------------------------------------------

--
-- Table structure for table `qualifications`
--

CREATE TABLE `qualifications` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `slug` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `qualifications`
--

INSERT INTO `qualifications` (`id`, `name`, `slug`, `createdAt`, `updatedAt`) VALUES
(1, '12th', '12th', '2023-07-24 23:51:27', '2023-07-24 23:51:27'),
(2, 'ITI', 'iti', '2023-07-24 23:51:27', '2023-07-24 23:51:27'),
(3, 'DIP', 'dip', '2023-07-24 23:52:53', '2023-07-24 23:52:53'),
(4, 'B.sc.', 'bsc', '2023-07-24 23:52:53', '2023-07-24 23:52:53'),
(5, 'BE', 'be', '2023-07-24 23:52:53', '2023-07-24 23:52:53'),
(6, 'ME', 'me', '2023-07-24 23:52:53', '2023-07-24 23:52:53');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `title` text DEFAULT NULL,
  `sub_title` text DEFAULT NULL,
  `address` text DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `email` text DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `facebook_url` text DEFAULT NULL,
  `twitter_url` text DEFAULT NULL,
  `instagram_url` text DEFAULT NULL,
  `skype_url` text DEFAULT NULL,
  `linkedin_url` text DEFAULT NULL,
  `youtube_url` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `title`, `sub_title`, `address`, `latitude`, `longitude`, `email`, `phone`, `facebook_url`, `twitter_url`, `instagram_url`, `skype_url`, `linkedin_url`, `youtube_url`, `createdAt`, `updatedAt`) VALUES
(1, 'asdasdasdasdasd', 'asdasdasdasd', 'RTF -04,Royal, tower market, Shipra Suncity, Indirapuram, Ghaziabad, Uttar Pradesh 201012, India', '28.6377532', '77.3780633', 'info@hiqa.in', '96098981231', 'https://www.facebook.com/', 'https://twitter.com/i/flow/login?redirect_after_login=%2F', 'https://www.instagram.com/', 'https://www.skype.com/en/', 'https://www.linkedin.com/home?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=in', 'https://www.yuotube.com', '2023-07-13 16:56:01', '2023-07-13 20:40:42');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(25) DEFAULT NULL,
  `mobile_number` varchar(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `father_name` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `email_verified` tinyint(1) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `email_verified_at` datetime DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 0,
  `image` varchar(255) NOT NULL DEFAULT '',
  `last_login_at` datetime DEFAULT NULL,
  `last_login_ip` varchar(255) DEFAULT NULL,
  `notification_status` tinyint(4) DEFAULT NULL,
  `admin_approved` int(11) DEFAULT NULL,
  `device_id` varchar(255) DEFAULT NULL,
  `device_token` varchar(255) DEFAULT NULL,
  `country_code` varchar(255) DEFAULT NULL,
  `token` text DEFAULT NULL,
  `fcm_token` text DEFAULT NULL,
  `login_expire` tinyint(4) DEFAULT NULL,
  `reset_password_token` text DEFAULT NULL,
  `device_type` varchar(255) DEFAULT NULL,
  `social_type` text DEFAULT NULL,
  `social_id` text DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `zipcode` varchar(255) DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `qualification` text DEFAULT NULL,
  `qualificationId` text DEFAULT NULL,
  `qualificationDoc` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`qualificationDoc`)),
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `mobile_number`, `email`, `father_name`, `dob`, `gender`, `email_verified`, `role_id`, `email_verified_at`, `password`, `remember_token`, `status`, `image`, `last_login_at`, `last_login_ip`, `notification_status`, `admin_approved`, `device_id`, `device_token`, `country_code`, `token`, `fcm_token`, `login_expire`, `reset_password_token`, `device_type`, `social_type`, `social_id`, `address`, `city`, `state`, `country`, `zipcode`, `latitude`, `longitude`, `category`, `qualification`, `qualificationId`, `qualificationDoc`, `created_at`, `updated_at`) VALUES
(1, 'Admin', '9609898985', 'info@hiqa.in', NULL, NULL, NULL, 1, 0, '2023-07-02 12:42:09', '$2b$10$Kcz6qGYeJfvxeZ1EZAs1cepj1M9CUftPT95zcaWwsa8L8Xj.2MNZ2', NULL, 1, '1689052834808-HIQA LOGO.jpg', NULL, NULL, NULL, NULL, NULL, 'asdasdasdas', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY5MTA1NDQxMywiZXhwIjoxNzIyNTkwNDEzfQ.8sja2Hg7ST8nZN20dR5akHUcVDfOdgj9PIgfZ9IU5NU', NULL, NULL, NULL, 'IOS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-09 01:39:10', '2023-08-03 14:50:13'),
(2, 'Ashish', '321654987', 'ashish@yopmail.com', NULL, NULL, NULL, 1, 1, '2023-07-11 12:58:55', NULL, NULL, 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-07-11 12:58:55', '2023-07-11 12:58:55'),
(3, 'Manoj', '321654654', 'Manoj@yopmail.com', NULL, NULL, NULL, 1, 1, '2023-07-11 12:58:55', NULL, NULL, 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'Ravi', '123456789', 'ravi@gmail.com', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-07-11 15:09:12', '2023-07-11 15:09:12'),
(5, 'Test', '123456789', 'test@yopmail.com', NULL, NULL, NULL, NULL, 1, NULL, '$2b$10$KSapbMvmt7jd2ko/E/hRz.VEm7YzmWEpP6fywcrHIsUe6fkRhDSzu', NULL, 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-07-11 15:22:09', '2023-07-11 15:30:01'),
(6, 'test 1 Test', '123456789', 'test1@yopmail.com', NULL, NULL, NULL, NULL, 1, NULL, '$2b$10$NKjTefFCt8C7lsUPOAhBM.xw3K6l8V2Sgw4HKkztOiFvpv/WUD976', NULL, 2, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-07-11 15:31:44', '2023-07-12 12:19:55'),
(7, NULL, '987654321', 'ashsih@yopmail.cm', NULL, NULL, NULL, NULL, 1, NULL, '$2b$10$hBL8CW/qntkARsV3jKWaYuXJjQvG2HYAzZ64R/1xBo54Z48FfqlYK', NULL, 1, '1691232936446-cover image option6-01.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-08-05 16:25:36', '2023-08-05 16:25:36'),
(8, NULL, '987654321', 'ashsih123@yopmail.cm', NULL, NULL, NULL, NULL, 1, NULL, '$2b$10$7RdH462c1s8SON23dZDHJegNlqKuN1MKGENwZE/RRLHwvbnWEgTRW', NULL, 1, '1691233024822-cover image option6-01.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-08-05 16:27:04', '2023-08-05 16:27:04'),
(9, 'asdasd', '987654321', 'ashsih12345@yopmail.com', 'asdasdasd', '2023-08-17', 'Male', NULL, 1, NULL, '$2b$10$4jcex1WGxZwmHJ/PTxmXL.CCVFkF4Qu9ivuUREiqas.6Z2GWjtrHi', NULL, 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjksImlhdCI6MTY5MTY2MjcwMSwiZXhwIjoxNzIzMTk4NzAxfQ.pSvLaEh43txKjxEzBs_jUVLduwLqCTXKmC9OirdVTkg', NULL, NULL, NULL, NULL, NULL, NULL, 'QRPF+64P, Sitapura Industrial Area, Sitapura, Jaipur, Rajasthan 302022, India', 'Jaipur', 'Rajasthan', 'India', '302022', '26.7855763', '75.8228346', 'st', '12th,ITI', '1,2', '{\"12th\":{\"name\":\"asd\",\"year\":\"appraing\",\"docs\":\"1691233212517-profile picture option6-01.jpg\"},\"iti\":{\"name\":\"asdasdasd\",\"year\":\"1st\"}}', '2023-08-05 16:30:15', '2023-08-10 16:11:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_eligibility_details`
--
ALTER TABLE `course_eligibility_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `front_pages`
--
ALTER TABLE `front_pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `qualifications`
--
ALTER TABLE `qualifications`
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
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `course_eligibility_details`
--
ALTER TABLE `course_eligibility_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `front_pages`
--
ALTER TABLE `front_pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `qualifications`
--
ALTER TABLE `qualifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
