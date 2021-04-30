-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2021 at 02:01 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `avoir`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart_info`
--

CREATE TABLE `cart_info` (
  `cart_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `product_id` int(10) NOT NULL,
  `product_price` decimal(10,2) DEFAULT NULL,
  `quantity` int(10) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `cart_date` date DEFAULT NULL,
  `product_size` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart_info`
--

INSERT INTO `cart_info` (`cart_id`, `user_id`, `product_id`, `product_price`, `quantity`, `status`, `cart_date`, `product_size`) VALUES
(4, 2, 2, '5070.00', 5, 'paid', '2021-04-30', 'm'),
(6, 2, 4, '5070.00', 3, 'paid', '2021-04-30', 'xl'),
(14, 1, 6, '1.00', 8, 'pending', '2021-04-30', 'xl'),
(15, 2, 2, '5070.00', 2, 'paid', '2021-04-30', 's'),
(17, 1, 7, '52552.00', 4, 'pending', '2021-04-30', 'm');

-- --------------------------------------------------------

--
-- Table structure for table `payment_info`
--

CREATE TABLE `payment_info` (
  `payment_id` int(10) NOT NULL,
  `transation_id` text DEFAULT NULL,
  `user_id` int(10) NOT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `payment_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment_info`
--

INSERT INTO `payment_info` (`payment_id`, `transation_id`, `user_id`, `amount`, `payment_date`) VALUES
(4, 'adsadsadsad', 2, '40560.00', '2021-04-30'),
(6, 'dasdsadsad', 2, '40560.00', '2021-04-30'),
(17, 'asdsadsa', 2, '40560.00', '2021-04-30'),
(18, 'asdsadsad', 2, '40560.00', '2021-04-30'),
(19, 'dasfdasfasfasfgasfg', 2, '10140.00', '2021-04-30');

-- --------------------------------------------------------

--
-- Table structure for table `product_info`
--

CREATE TABLE `product_info` (
  `id` int(10) NOT NULL,
  `img` text DEFAULT NULL,
  `title` varchar(57) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int(10) DEFAULT NULL,
  `status` varchar(27) DEFAULT NULL,
  `product_type` varchar(27) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_info`
--

INSERT INTO `product_info` (`id`, `img`, `title`, `description`, `price`, `quantity`, `status`, `product_type`) VALUES
(1, 'images/pic1.jpg', 'Shirt', 'This product is made of cotton bla bla bla', '5000.00', 69, 'instock', 'shirt'),
(2, 'images/pic2.jpg', 'Baby Shirt', 'This product is made of semi and aasd asd iu cotton bla bla bla', '5070.00', 69, 'instock', 'shirt'),
(3, 'images/pic3.jpg', 'Blue Shirt', 'This product is made of semi and aasd asd iu cotton bla bla bla', '5070.00', 69, 'instock', 'shirt'),
(4, 'images/pic4.jpg', 'Jeans pant', 'This product is made of semi and aasd asd iu cotton bla bla bla', '5070.00', 69, 'instock', 'pant'),
(5, 'images/pic5.jpg', 'Juta', 'This product is made of semi and aasd asd iu cotton bla bla bla', '5070.00', 69, 'instock', 'shoe'),
(7, 'images/img-1619740739533.jpg', 'Nijhu', 'Its full of blood and blafkashf kajsfhk ajshfksajfhsakjfh kajfhaksjfhsakjfhaskjfhaskjfhaskjfhaskjfhaskj fhkajsfh kajshfkajs hfksajfh kjashfkjsahf ksajhfkjsahfsakjfh kajfhkajsf hksajfh kasjfhksajfhsakjf hsakjfh aksjfh aksjf haskjfhak', '52552.00', 3, 'instock', 'human');

-- --------------------------------------------------------

--
-- Table structure for table `user_info`
--

CREATE TABLE `user_info` (
  `user_id` int(10) NOT NULL,
  `user_name` varchar(57) DEFAULT NULL,
  `phone` varchar(27) DEFAULT NULL,
  `pass` text DEFAULT NULL,
  `user_type` varchar(10) DEFAULT NULL,
  `address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_info`
--

INSERT INTO `user_info` (`user_id`, `user_name`, `phone`, `pass`, `user_type`, `address`) VALUES
(1, 'admin', '696969', '12345', 'raja', NULL),
(2, 'asd', '01615233041', 'asd', 'customer', NULL),
(6, 'asdasd', '01615233041', 'asdsadsads', 'customer', NULL),
(7, 'sinijhu2@gmail.com', 'asdasfasf', 'asdsad', 'customer', NULL),
(8, 'samiul', '017696966969', 'pagla', 'customer', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart_info`
--
ALTER TABLE `cart_info`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `payment_info`
--
ALTER TABLE `payment_info`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `product_info`
--
ALTER TABLE `product_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_name` (`user_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart_info`
--
ALTER TABLE `cart_info`
  MODIFY `cart_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `payment_info`
--
ALTER TABLE `payment_info`
  MODIFY `payment_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `product_info`
--
ALTER TABLE `product_info`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_info`
--
ALTER TABLE `user_info`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
