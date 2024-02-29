-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2024 at 03:24 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `instilite`
--

-- --------------------------------------------------------

--
-- Table structure for table `eventsdetails`
--

CREATE TABLE `eventsdetails` (
  `event_id` varchar(20) NOT NULL,
  `event_name` varchar(40) NOT NULL,
  `event_venue` varchar(40) DEFAULT NULL,
  `event_desc` varchar(100) DEFAULT NULL,
  `event_posted_date` varchar(25) NOT NULL DEFAULT current_timestamp(),
  `user_id` varchar(30) DEFAULT NULL,
  `event_date` varchar(25) DEFAULT NULL,
  `event_start` varchar(25) DEFAULT NULL,
  `event_end` varchar(25) DEFAULT NULL,
  `event_visibility` enum('Personal','Public') NOT NULL DEFAULT 'Personal'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `eventsdetails`
--

INSERT INTO `eventsdetails` (`event_id`, `event_name`, `event_venue`, `event_desc`, `event_posted_date`, `user_id`, `event_date`, `event_start`, `event_end`, `event_visibility`) VALUES
('', 'freshe design challenge', 'Ramanujam', 'we teach figma ', '2024-01-25', 'pdc_id', '2024-02-22', '10:00:00', '12:00:00', 'Personal');

-- --------------------------------------------------------

--
-- Table structure for table `teamsdetails`
--

CREATE TABLE `teamsdetails` (
  `team_id` varchar(40) NOT NULL,
  `team_name` varchar(40) NOT NULL,
  `team_desc` varchar(800) DEFAULT NULL,
  `team_link` varchar(200) DEFAULT NULL,
  `team_apps` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`team_apps`)),
  `team_heads` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`team_heads`)),
  `team_members` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`team_members`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teamsdetails`
--

INSERT INTO `teamsdetails` (`team_id`, `team_name`, `team_desc`, `team_link`, `team_apps`, `team_heads`, `team_members`) VALUES
('pdc_id', 'pdc', 'pdc boring', '{\"link1\":\"pdc updated\"}', '{\"apps\":\"dc apps\"}', '{\"heads\":\"bharath\"}', '{\"members\":\"rahul\"}');

-- --------------------------------------------------------

--
-- Table structure for table `usercreds`
--

CREATE TABLE `usercreds` (
  `user_id` varchar(40) NOT NULL,
  `user_name` varchar(40) NOT NULL,
  `user_phone` bigint(20) DEFAULT NULL,
  `user_password` varchar(20) NOT NULL,
  `user_role` varchar(10) DEFAULT '"student"',
  `user_access_token` varchar(10) DEFAULT '"denied"',
  `linkedin_id` varchar(200) DEFAULT NULL,
  `profile_desc` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usercreds`
--

INSERT INTO `usercreds` (`user_id`, `user_name`, `user_phone`, `user_password`, `user_role`, `user_access_token`, `linkedin_id`, `profile_desc`) VALUES
('111', 'shwetha', 9008098987, 'password123', 'student', 'denied', 'https://ww.google.com', 'hello hi '),
('123', 'rahul', 1234567, 'qwertyuiop', 'student', 'denied', NULL, NULL),
('pdc_id', 'pdc', 9988787876, 'pdcpdc', 'team', 'denied', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `eventsdetails`
--
ALTER TABLE `eventsdetails`
  ADD PRIMARY KEY (`event_name`),
  ADD KEY `user_id_FK` (`user_id`);

--
-- Indexes for table `teamsdetails`
--
ALTER TABLE `teamsdetails`
  ADD KEY `team_id_FK` (`team_id`),
  ADD KEY `team_name_FK` (`team_name`);

--
-- Indexes for table `usercreds`
--
ALTER TABLE `usercreds`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_name` (`user_name`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `eventsdetails`
--
ALTER TABLE `eventsdetails`
  ADD CONSTRAINT `user_id_FK` FOREIGN KEY (`user_id`) REFERENCES `usercreds` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teamsdetails`
--
ALTER TABLE `teamsdetails`
  ADD CONSTRAINT `team_id_FK` FOREIGN KEY (`team_id`) REFERENCES `usercreds` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `team_name_FK` FOREIGN KEY (`team_name`) REFERENCES `usercreds` (`user_name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
