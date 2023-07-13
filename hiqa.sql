-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 13, 2023 at 03:02 PM
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
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `name`, `slug`, `short_description`, `long_description`, `image`, `duraion_course`, `total_seat`, `site_visits`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Tset', 'test', '', '', '', 'tst', 'test', 'test', 1, '2023-07-12 12:29:35', '2023-07-12 12:29:35'),
(2, 'Test', 'test', '', '', '', 'Test', 'Test', 'Test', 1, '2023-07-12 12:30:36', '2023-07-12 12:30:36'),
(3, 'Tst', 'test', '', '', '', 'ste', 'stest', 'stest', 1, '2023-07-12 12:32:51', '2023-07-12 12:32:51'),
(4, 'asd', 'test', '<p>asd</p>', '<p>asd</p>', '', 'asd', 'asd', 'asd', 1, '2023-07-12 12:52:13', '2023-07-12 12:52:13'),
(5, 'asdasdasdasd', 'test', '<p>asdasdasd</p>', '<p>asdadasd<br><br><br>asdasd</p><p><br></p><p>sad</p><p>as</p><p>das</p><p>d</p>', '1689150318934-pexels-fox-13189272.jpg', '60', '120', 'International', 1, '2023-07-12 12:53:25', '2023-07-12 18:49:23');

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
(1, 'home', 'Our Impact On Societyssss', '<table style=\"border-collapse:collapse;width: 100%;\"><tbody>\r\n<tr>\r\n	<td style=\"width: 33.3333%;\">asd</td>\r\n	<td style=\"width: 33.3333%;\">asd</td>\r\n	<td style=\"width: 33.3333%;\">asd</td></tr>\r\n<tr>\r\n	<td style=\"width: 33.3333%;\">asd</td>\r\n	<td style=\"width: 33.3333%;\">asd</td>\r\n	<td style=\"width: 33.3333%;\">asd</td></tr></tbody></table>', NULL, 1, '2023-07-11 13:14:35', '2023-07-12 18:44:39');

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
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `title`, `sub_title`, `address`, `latitude`, `longitude`, `email`, `phone`, `facebook_url`, `twitter_url`, `instagram_url`, `skype_url`, `linkedin_url`, `createdAt`, `updatedAt`) VALUES
(1, 'asdasdasdasdasd', 'asdasdasdasd', 'RTF -04,Royal, tower market, Shipra Suncity, Indirapuram, Ghaziabad, Uttar Pradesh 201012, India', '28.6377532', '77.3780633', 'info@hiqa.in', '9609898985', 'https://www.facebook.com/', 'https://twitter.com/i/flow/login?redirect_after_login=%2F', 'https://www.instagram.com/', 'https://www.skype.com/en/', 'https://www.linkedin.com/home?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=in', '2023-07-13 16:56:01', '2023-07-13 18:28:14');

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
  `device_type` varchar(255) DEFAULT NULL,
  `social_type` text DEFAULT NULL,
  `social_id` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `mobile_number`, `email`, `email_verified`, `role_id`, `email_verified_at`, `password`, `remember_token`, `status`, `image`, `last_login_at`, `last_login_ip`, `notification_status`, `admin_approved`, `device_id`, `device_token`, `country_code`, `token`, `fcm_token`, `login_expire`, `device_type`, `social_type`, `social_id`, `created_at`, `updated_at`) VALUES
(1, 'Admin', '9609898985', 'info@hiqa.in', 1, 0, '2023-07-02 12:42:09', '$2b$10$Kcz6qGYeJfvxeZ1EZAs1cepj1M9CUftPT95zcaWwsa8L8Xj.2MNZ2', NULL, 1, '1689052834808-HIQA LOGO.jpg', NULL, NULL, NULL, NULL, NULL, 'asdasdasdas', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY4OTI1MTMwNywiZXhwIjoxNzIwNzg3MzA3fQ.BwOaDWMQPy0Ga0kkqDscB_otiPPhuYQ4RmsSrN-9l1Q', NULL, NULL, 'IOS', NULL, NULL, '2023-04-09 01:39:10', '2023-07-13 18:07:52'),
(2, 'Ashish', '321654987', 'ashish@yopmail.com', 1, 1, '2023-07-11 12:58:55', NULL, NULL, 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-07-11 12:58:55', '2023-07-11 12:58:55'),
(3, 'Manoj', '321654654', 'Manoj@yopmail.com', 1, 1, '2023-07-11 12:58:55', NULL, NULL, 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'Ravi', '123456789', 'ravi@gmail.com', NULL, 1, NULL, NULL, NULL, 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-07-11 15:09:12', '2023-07-11 15:09:12'),
(5, 'Test', '123456789', 'test@yopmail.com', NULL, 1, NULL, '$2b$10$KSapbMvmt7jd2ko/E/hRz.VEm7YzmWEpP6fywcrHIsUe6fkRhDSzu', NULL, 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-07-11 15:22:09', '2023-07-11 15:30:01'),
(6, 'test 1 Test', '123456789', 'test1@yopmail.com', NULL, 1, NULL, '$2b$10$NKjTefFCt8C7lsUPOAhBM.xw3K6l8V2Sgw4HKkztOiFvpv/WUD976', NULL, 2, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-07-11 15:31:44', '2023-07-12 12:19:55');

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `front_pages`
--
ALTER TABLE `front_pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
