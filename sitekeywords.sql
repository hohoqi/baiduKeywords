/*
Navicat MySQL Data Transfer

Source Server         : Reil
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : sitekeywords

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2015-08-24 15:26:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for yh_report
-- ----------------------------
DROP TABLE IF EXISTS `yh_report`;
CREATE TABLE `yh_report` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `s_id` int(11) DEFAULT NULL,
  `key_name` varchar(200) DEFAULT NULL,
  `rank` varchar(100) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for yh_site
-- ----------------------------
DROP TABLE IF EXISTS `yh_site`;
CREATE TABLE `yh_site` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `url` varchar(500) DEFAULT NULL,
  `star` int(1) DEFAULT '0',
  `keywords` text,
  `tips` text,
  `bd_include` int(11) DEFAULT NULL,
  `trans` int(11) DEFAULT NULL,
  `pr` int(2) DEFAULT NULL,
  `weight` int(2) DEFAULT NULL,
  `rank` text,
  `is_pr` int(1) DEFAULT '1',
  `time` int(11) DEFAULT NULL,
  `up_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
