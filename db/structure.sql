/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50646
 Source Host           : 127.0.0.1:3306
 Source Schema         : forge_development

 Target Server Type    : MySQL
 Target Server Version : 50646
 File Encoding         : 65001

 Date: 08/03/2020 12:03:51
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;


-- ----------------------------
-- Table structure for api_keys
-- ----------------------------
DROP TABLE IF EXISTS `api_keys`;
CREATE TABLE `api_keys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `access_token` varchar(255) DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_api_keys_on_user_id` (`user_id`),
  KEY `index_api_keys_on_access_token` (`access_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for applied_contests
-- ----------------------------
DROP TABLE IF EXISTS `applied_contests`;
CREATE TABLE `applied_contests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contest_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_applied_contests_on_contest_id` (`contest_id`),
  KEY `index_applied_contests_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for applied_messages
-- ----------------------------
DROP TABLE IF EXISTS `applied_messages`;
CREATE TABLE `applied_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `applied_id` int(11) DEFAULT NULL,
  `applied_type` varchar(255) DEFAULT NULL,
  `viewed` int(11) DEFAULT '0',
  `status` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `applied_user_id` int(11) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for applied_projects
-- ----------------------------
DROP TABLE IF EXISTS `applied_projects`;
CREATE TABLE `applied_projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role` int(11) DEFAULT '0',
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for apply_actions
-- ----------------------------
DROP TABLE IF EXISTS `apply_actions`;
CREATE TABLE `apply_actions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `container_id` int(11) DEFAULT NULL,
  `container_type` varchar(255) DEFAULT NULL,
  `dealer_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `status` tinyint(4) DEFAULT '0',
  `apply_reason` text,
  `noticed` tinyint(1) DEFAULT '0',
  `ip_addr` varchar(255) DEFAULT NULL,
  `reject_description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_apply_actions_on_user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for apply_add_departments
-- ----------------------------
DROP TABLE IF EXISTS `apply_add_departments`;
CREATE TABLE `apply_add_departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `school_id` int(11) DEFAULT NULL,
  `remarks` text,
  `user_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_apply_add_departments_on_department_id` (`department_id`),
  KEY `index_apply_add_departments_on_school_id` (`school_id`),
  KEY `index_apply_add_departments_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for apply_project_masters
-- ----------------------------
DROP TABLE IF EXISTS `apply_project_masters`;
CREATE TABLE `apply_project_masters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `apply_type` varchar(255) DEFAULT NULL,
  `apply_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for apply_resources
-- ----------------------------
DROP TABLE IF EXISTS `apply_resources`;
CREATE TABLE `apply_resources` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `attachment_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `container_id` int(11) DEFAULT NULL,
  `container_type` varchar(255) DEFAULT NULL,
  `content` text,
  `apply_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for apply_user_authentications
-- ----------------------------
DROP TABLE IF EXISTS `apply_user_authentications`;
CREATE TABLE `apply_user_authentications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `auth_type` int(11) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `dealer` int(11) DEFAULT NULL,
  `deal_time` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_apply_user_authentications_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ar_internal_metadata
-- ----------------------------
DROP TABLE IF EXISTS `ar_internal_metadata`;
CREATE TABLE `ar_internal_metadata` (
  `key` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for attachment_group_settings
-- ----------------------------
DROP TABLE IF EXISTS `attachment_group_settings`;
CREATE TABLE `attachment_group_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `attachment_id` int(11) DEFAULT NULL,
  `course_group_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `publish_time` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_attachment_group_settings_on_attachment_id` (`attachment_id`),
  KEY `index_attachment_group_settings_on_course_group_id` (`course_group_id`),
  KEY `index_attachment_group_settings_on_course_id` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for attachment_histories
-- ----------------------------
DROP TABLE IF EXISTS `attachment_histories`;
CREATE TABLE `attachment_histories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `container_id` int(11) DEFAULT NULL,
  `container_type` varchar(255) DEFAULT NULL,
  `filename` varchar(255) DEFAULT '',
  `disk_filename` varchar(255) DEFAULT '',
  `filesize` int(11) DEFAULT '0',
  `content_type` varchar(255) DEFAULT '',
  `digest` varchar(60) DEFAULT '',
  `downloads` int(11) DEFAULT '0',
  `author_id` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `description` text,
  `disk_directory` varchar(255) DEFAULT NULL,
  `attachtype` int(11) DEFAULT NULL,
  `is_public` int(11) DEFAULT NULL,
  `copy_from` int(11) DEFAULT NULL,
  `quotes` int(11) DEFAULT NULL,
  `version` int(11) DEFAULT NULL,
  `attachment_id` int(11) DEFAULT NULL,
  `is_publish` int(11) DEFAULT '1',
  `publish_time` date DEFAULT NULL,
  `cloud_url` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for attachments
-- ----------------------------
DROP TABLE IF EXISTS `attachments`;
CREATE TABLE `attachments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `container_id` int(11) DEFAULT NULL,
  `container_type` varchar(30) DEFAULT NULL,
  `filename` varchar(255) NOT NULL DEFAULT '',
  `disk_filename` varchar(255) NOT NULL DEFAULT '',
  `filesize` int(11) NOT NULL DEFAULT '0',
  `content_type` varchar(255) DEFAULT '',
  `digest` varchar(60) NOT NULL DEFAULT '',
  `downloads` int(11) NOT NULL DEFAULT '0',
  `author_id` int(11) NOT NULL DEFAULT '0',
  `created_on` datetime DEFAULT NULL,
  `description` text,
  `disk_directory` varchar(255) DEFAULT NULL,
  `attachtype` int(11) DEFAULT '1',
  `is_public` int(11) DEFAULT '1',
  `copy_from` int(11) DEFAULT NULL,
  `quotes` int(11) DEFAULT '0',
  `is_publish` int(11) DEFAULT '1',
  `publish_time` datetime DEFAULT NULL,
  `resource_bank_id` int(11) DEFAULT NULL,
  `unified_setting` tinyint(1) DEFAULT '1',
  `cloud_url` varchar(255) DEFAULT '',
  `course_second_category_id` int(11) DEFAULT '0',
  `delay_publish` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_attachments_on_author_id` (`author_id`),
  KEY `index_attachments_on_created_on` (`created_on`),
  KEY `index_attachments_on_container_id_and_container_type` (`container_id`,`container_type`),
  KEY `index_attachments_on_course_second_category_id` (`course_second_category_id`),
  KEY `index_attachments_on_quotes` (`quotes`),
  KEY `index_attachments_on_is_public` (`is_public`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for attachmentstypes
-- ----------------------------
DROP TABLE IF EXISTS `attachmentstypes`;
CREATE TABLE `attachmentstypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeId` int(11) NOT NULL,
  `typeName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for auth_sources
-- ----------------------------
DROP TABLE IF EXISTS `auth_sources`;
CREATE TABLE `auth_sources` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(30) NOT NULL DEFAULT '',
  `name` varchar(60) NOT NULL DEFAULT '',
  `host` varchar(60) DEFAULT NULL,
  `port` int(11) DEFAULT NULL,
  `account` varchar(255) DEFAULT NULL,
  `account_password` varchar(255) DEFAULT '',
  `base_dn` varchar(255) DEFAULT NULL,
  `attr_login` varchar(30) DEFAULT NULL,
  `attr_firstname` varchar(30) DEFAULT NULL,
  `attr_lastname` varchar(30) DEFAULT NULL,
  `attr_mail` varchar(30) DEFAULT NULL,
  `onthefly_register` tinyint(1) NOT NULL DEFAULT '0',
  `tls` tinyint(1) NOT NULL DEFAULT '0',
  `filter` varchar(255) DEFAULT NULL,
  `timeout` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_auth_sources_on_id_and_type` (`id`,`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for authentications
-- ----------------------------
DROP TABLE IF EXISTS `authentications`;
CREATE TABLE `authentications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level` tinyint(4) DEFAULT NULL,
  `permissions` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for authentications_users
-- ----------------------------
DROP TABLE IF EXISTS `authentications_users`;
CREATE TABLE `authentications_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `authentication_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for bidding_users
-- ----------------------------
DROP TABLE IF EXISTS `bidding_users`;
CREATE TABLE `bidding_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_package_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_bidding_users_on_project_package_id` (`project_package_id`),
  KEY `index_bidding_users_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for biding_projects
-- ----------------------------
DROP TABLE IF EXISTS `biding_projects`;
CREATE TABLE `biding_projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `bid_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `reward` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for bids
-- ----------------------------
DROP TABLE IF EXISTS `bids`;
CREATE TABLE `bids` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `budget` varchar(255) NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `description` text,
  `created_on` datetime NOT NULL,
  `updated_on` datetime NOT NULL,
  `commit` int(11) DEFAULT NULL,
  `reward_type` int(11) DEFAULT NULL,
  `homework_type` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_evaluation` int(11) DEFAULT NULL,
  `proportion` int(11) DEFAULT '60',
  `comment_status` int(11) DEFAULT '0',
  `evaluation_num` int(11) DEFAULT '3',
  `open_anonymous_evaluation` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for code_review_assignments
-- ----------------------------
DROP TABLE IF EXISTS `code_review_assignments`;
CREATE TABLE `code_review_assignments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `issue_id` int(11) DEFAULT NULL,
  `change_id` int(11) DEFAULT NULL,
  `attachment_id` int(11) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `rev` varchar(255) DEFAULT NULL,
  `rev_to` varchar(255) DEFAULT NULL,
  `action_type` varchar(255) DEFAULT NULL,
  `changeset_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for code_review_project_settings
-- ----------------------------
DROP TABLE IF EXISTS `code_review_project_settings`;
CREATE TABLE `code_review_project_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `tracker_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `hide_code_review_tab` tinyint(1) DEFAULT '0',
  `auto_relation` int(11) DEFAULT '1',
  `assignment_tracker_id` int(11) DEFAULT NULL,
  `auto_assign` text,
  `lock_version` int(11) NOT NULL DEFAULT '0',
  `tracker_in_review_dialog` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for code_review_user_settings
-- ----------------------------
DROP TABLE IF EXISTS `code_review_user_settings`;
CREATE TABLE `code_review_user_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `mail_notification` int(11) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for code_reviews
-- ----------------------------
DROP TABLE IF EXISTS `code_reviews`;
CREATE TABLE `code_reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `change_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `line` int(11) DEFAULT NULL,
  `updated_by_id` int(11) DEFAULT NULL,
  `lock_version` int(11) NOT NULL DEFAULT '0',
  `status_changed_from` int(11) DEFAULT NULL,
  `status_changed_to` int(11) DEFAULT NULL,
  `issue_id` int(11) DEFAULT NULL,
  `action_type` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `rev` varchar(255) DEFAULT NULL,
  `rev_to` varchar(255) DEFAULT NULL,
  `attachment_id` int(11) DEFAULT NULL,
  `file_count` int(11) NOT NULL DEFAULT '0',
  `diff_all` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for code_tests
-- ----------------------------
DROP TABLE IF EXISTS `code_tests`;
CREATE TABLE `code_tests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `homework_id` int(11) DEFAULT NULL,
  `wait_time` int(11) DEFAULT '0',
  `language` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `time_used` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `student_work_id` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commented_type` varchar(30) NOT NULL DEFAULT '',
  `commented_id` int(11) NOT NULL DEFAULT '0',
  `author_id` int(11) NOT NULL DEFAULT '0',
  `comments` text,
  `created_on` datetime NOT NULL,
  `updated_on` datetime NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `comments_count` int(11) DEFAULT '0',
  `reply_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_comments_on_commented_id_and_commented_type` (`commented_id`,`commented_type`),
  KEY `index_comments_on_author_id` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for commit_issues
-- ----------------------------
DROP TABLE IF EXISTS `commit_issues`;
CREATE TABLE `commit_issues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commit_id` varchar(255) DEFAULT NULL,
  `issue_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for commits
-- ----------------------------
DROP TABLE IF EXISTS `commits`;
CREATE TABLE `commits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `repository_id` int(11) DEFAULT NULL,
  `version` varchar(255) DEFAULT NULL,
  `committer` varchar(255) DEFAULT NULL,
  `comments` text,
  `committed_on` datetime DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for compose_projects
-- ----------------------------
DROP TABLE IF EXISTS `compose_projects`;
CREATE TABLE `compose_projects` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `compose_id` int(11) DEFAULT NULL,
  `position` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_compose_projects_on_user_id_and_project_id_and_compose_id` (`user_id`,`project_id`,`compose_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for compose_users
-- ----------------------------
DROP TABLE IF EXISTS `compose_users`;
CREATE TABLE `compose_users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `compose_id` int(11) DEFAULT NULL,
  `is_manager` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_compose_users_on_user_id_and_compose_id` (`user_id`,`compose_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for composes
-- ----------------------------
DROP TABLE IF EXISTS `composes`;
CREATE TABLE `composes` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `show_mode` int(11) DEFAULT '0',
  `compose_mode` tinyint(1) DEFAULT '0',
  `compose_users_count` int(11) DEFAULT '0',
  `compose_projects_count` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_composes_on_user_id_and_show_mode_and_compose_mode` (`user_id`,`show_mode`,`compose_mode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for coo_imgs
-- ----------------------------
DROP TABLE IF EXISTS `coo_imgs`;
CREATE TABLE `coo_imgs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `src_states` varchar(255) DEFAULT NULL,
  `url_states` varchar(255) DEFAULT NULL,
  `img_type` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `position` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for coop_imgs
-- ----------------------------
DROP TABLE IF EXISTS `coop_imgs`;
CREATE TABLE `coop_imgs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `src_states` varchar(255) DEFAULT NULL,
  `url_states` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `img_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for cooperations
-- ----------------------------
DROP TABLE IF EXISTS `cooperations`;
CREATE TABLE `cooperations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `qq` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for data_exceptions
-- ----------------------------
DROP TABLE IF EXISTS `data_exceptions`;
CREATE TABLE `data_exceptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(255) DEFAULT NULL,
  `container_id` int(11) DEFAULT NULL,
  `container_type` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for department_members
-- ----------------------------
DROP TABLE IF EXISTS `department_members`;
CREATE TABLE `department_members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_department_members_on_department_id` (`department_id`),
  KEY `index_department_members_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for departments
-- ----------------------------
DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `school_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_auth` tinyint(1) DEFAULT '0',
  `identifier` varchar(255) DEFAULT NULL,
  `host_count` int(11) DEFAULT '5',
  `is_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_departments_on_school_id` (`school_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for diff_record_contents
-- ----------------------------
DROP TABLE IF EXISTS `diff_record_contents`;
CREATE TABLE `diff_record_contents` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `diff_record_id` bigint(20) DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`id`),
  KEY `index_diff_record_contents_on_diff_record_id` (`diff_record_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for diff_records
-- ----------------------------
DROP TABLE IF EXISTS `diff_records`;
CREATE TABLE `diff_records` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `container_type` varchar(255) DEFAULT NULL,
  `container_id` bigint(20) DEFAULT NULL,
  `column_name` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_diff_records_on_user_id` (`user_id`),
  KEY `index_diff_records_on_container_type_and_container_id` (`container_type`,`container_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for documents
-- ----------------------------
DROP TABLE IF EXISTS `documents`;
CREATE TABLE `documents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL DEFAULT '0',
  `category_id` int(11) NOT NULL DEFAULT '0',
  `title` varchar(60) NOT NULL DEFAULT '',
  `description` text,
  `created_on` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT '0',
  `is_public` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `documents_project_id` (`project_id`),
  KEY `index_documents_on_category_id` (`category_id`),
  KEY `index_documents_on_created_on` (`created_on`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for dts
-- ----------------------------
DROP TABLE IF EXISTS `dts`;
CREATE TABLE `dts` (
  `Num` int(11) NOT NULL DEFAULT '0',
  `Defect` varchar(50) DEFAULT NULL,
  `Category` varchar(50) DEFAULT NULL,
  `File` varchar(255) DEFAULT NULL,
  `Method` varchar(255) DEFAULT NULL,
  `Module` varchar(20) DEFAULT NULL,
  `Variable` varchar(50) DEFAULT NULL,
  `StartLine` int(11) DEFAULT NULL,
  `IPLine` int(11) DEFAULT NULL,
  `IPLineCode` varchar(200) DEFAULT NULL,
  `Judge` varchar(15) DEFAULT NULL,
  `Review` tinyint(4) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `PreConditions` longtext,
  `TraceInfo` longtext,
  `Code` longtext,
  `project_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `id` int(11) NOT NULL,
  PRIMARY KEY (`Num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for editor_of_documents
-- ----------------------------
DROP TABLE IF EXISTS `editor_of_documents`;
CREATE TABLE `editor_of_documents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `editor_id` int(11) DEFAULT NULL,
  `org_document_comment_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for edu_settings
-- ----------------------------
DROP TABLE IF EXISTS `edu_settings`;
CREATE TABLE `edu_settings` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_edu_settings_on_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for enabled_modules
-- ----------------------------
DROP TABLE IF EXISTS `enabled_modules`;
CREATE TABLE `enabled_modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `enabled_modules_project_id` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for enumerations
-- ----------------------------
DROP TABLE IF EXISTS `enumerations`;
CREATE TABLE `enumerations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '',
  `position` int(11) DEFAULT '1',
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `type` varchar(255) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `project_id` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `position_name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_enumerations_on_project_id` (`project_id`),
  KEY `index_enumerations_on_id_and_type` (`id`,`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for error_checks
-- ----------------------------
DROP TABLE IF EXISTS `error_checks`;
CREATE TABLE `error_checks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `game_indentifier` varchar(255) DEFAULT NULL,
  `login` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for evaluate_records
-- ----------------------------
DROP TABLE IF EXISTS `evaluate_records`;
CREATE TABLE `evaluate_records` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `shixun_id` int(11) DEFAULT NULL,
  `game_id` int(11) DEFAULT NULL,
  `consume_time` float DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `file_update` float DEFAULT NULL,
  `git_pull` float DEFAULT NULL,
  `create_pod` float DEFAULT NULL,
  `pod_execute` float DEFAULT NULL,
  `student_work` float DEFAULT NULL,
  `test_cases` float DEFAULT NULL,
  `retry` float DEFAULT NULL,
  `game_build` float DEFAULT NULL,
  `return_back` float DEFAULT NULL,
  `brige` float DEFAULT NULL,
  `create_status` datetime DEFAULT NULL,
  `front_js` float DEFAULT NULL,
  `identifier` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_evaluate_records_on_identifier` (`identifier`),
  KEY `index_evaluate_records_on_game_id` (`game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for first_pages
-- ----------------------------
DROP TABLE IF EXISTS `first_pages`;
CREATE TABLE `first_pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `web_title` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `page_type` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `sort_type` int(11) DEFAULT NULL,
  `image_width` int(11) DEFAULT '107',
  `image_height` int(11) DEFAULT '63',
  `show_course` int(11) DEFAULT '1',
  `show_contest` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for gitlab_urls
-- ----------------------------
DROP TABLE IF EXISTS `gitlab_urls`;
CREATE TABLE `gitlab_urls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `myshixun_id` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `myshixun_identifier` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for groups_users
-- ----------------------------
DROP TABLE IF EXISTS `groups_users`;
CREATE TABLE `groups_users` (
  `group_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  UNIQUE KEY `groups_users_ids` (`group_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for homepages
-- ----------------------------
DROP TABLE IF EXISTS `homepages`;
CREATE TABLE `homepages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `article_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_homepages_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for invite_lists
-- ----------------------------
DROP TABLE IF EXISTS `invite_lists`;
CREATE TABLE `invite_lists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `mail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for issue_relations
-- ----------------------------
DROP TABLE IF EXISTS `issue_relations`;
CREATE TABLE `issue_relations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `issue_from_id` int(11) NOT NULL,
  `issue_to_id` int(11) NOT NULL,
  `relation_type` varchar(255) NOT NULL DEFAULT '',
  `delay` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_issue_relations_on_issue_from_id_and_issue_to_id` (`issue_from_id`,`issue_to_id`),
  KEY `index_issue_relations_on_issue_from_id` (`issue_from_id`),
  KEY `index_issue_relations_on_issue_to_id` (`issue_to_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for issue_statuses
-- ----------------------------
DROP TABLE IF EXISTS `issue_statuses`;
CREATE TABLE `issue_statuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '',
  `is_closed` tinyint(1) NOT NULL DEFAULT '0',
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `position` int(11) DEFAULT '1',
  `default_done_ratio` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_issue_statuses_on_position` (`position`),
  KEY `index_issue_statuses_on_is_closed` (`is_closed`),
  KEY `index_issue_statuses_on_is_default` (`is_default`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for issue_tags
-- ----------------------------
DROP TABLE IF EXISTS `issue_tags`;
CREATE TABLE `issue_tags` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `issues_count` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `gid` int(11) DEFAULT NULL,
  `gitea_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_issue_tags_on_user_id_and_name_and_project_id` (`user_id`,`name`,`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for issue_tags_relates
-- ----------------------------
DROP TABLE IF EXISTS `issue_tags_relates`;
CREATE TABLE `issue_tags_relates` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `issue_id` int(11) DEFAULT NULL,
  `issue_tag_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_issue_tags_relates_on_issue_id_and_issue_tag_id` (`issue_id`,`issue_tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for issue_times
-- ----------------------------
DROP TABLE IF EXISTS `issue_times`;
CREATE TABLE `issue_times` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `issue_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `cost_time` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_issue_times_on_issue_id_and_user_id` (`issue_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for issues
-- ----------------------------
DROP TABLE IF EXISTS `issues`;
CREATE TABLE `issues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tracker_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL DEFAULT '',
  `description` text,
  `due_date` date DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `status_id` int(11) NOT NULL,
  `assigned_to_id` int(11) DEFAULT NULL,
  `priority_id` int(11) NOT NULL,
  `fixed_version_id` int(11) DEFAULT NULL,
  `author_id` int(11) NOT NULL,
  `lock_version` int(11) NOT NULL DEFAULT '0',
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `done_ratio` int(11) NOT NULL DEFAULT '0',
  `estimated_hours` float DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `root_id` int(11) DEFAULT NULL,
  `lft` int(11) DEFAULT NULL,
  `rgt` int(11) DEFAULT NULL,
  `is_private` tinyint(1) NOT NULL DEFAULT '0',
  `closed_on` datetime DEFAULT NULL,
  `project_issues_index` int(11) DEFAULT NULL,
  `issue_type` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `issue_tags_value` varchar(255) DEFAULT NULL,
  `is_lock` tinyint(1) DEFAULT '0',
  `issue_classify` varchar(255) DEFAULT NULL,
  `ref_name` varchar(255) DEFAULT NULL,
  `branch_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `issues_project_id` (`project_id`),
  KEY `index_issues_on_status_id` (`status_id`),
  KEY `index_issues_on_category_id` (`category_id`),
  KEY `index_issues_on_assigned_to_id` (`assigned_to_id`),
  KEY `index_issues_on_fixed_version_id` (`fixed_version_id`),
  KEY `index_issues_on_tracker_id` (`tracker_id`),
  KEY `index_issues_on_priority_id` (`priority_id`),
  KEY `index_issues_on_author_id` (`author_id`),
  KEY `index_issues_on_created_on` (`created_on`),
  KEY `index_issues_on_root_id_and_lft_and_rgt` (`root_id`,`lft`,`rgt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for journal_details
-- ----------------------------
DROP TABLE IF EXISTS `journal_details`;
CREATE TABLE `journal_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `journal_id` int(11) NOT NULL DEFAULT '0',
  `property` varchar(30) NOT NULL DEFAULT '',
  `prop_key` varchar(30) NOT NULL DEFAULT '',
  `old_value` text,
  `value` text,
  PRIMARY KEY (`id`),
  KEY `journal_details_journal_id` (`journal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for journal_replies
-- ----------------------------
DROP TABLE IF EXISTS `journal_replies`;
CREATE TABLE `journal_replies` (
  `journal_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `reply_id` int(11) DEFAULT NULL,
  KEY `index_journal_replies_on_user_id` (`user_id`),
  KEY `index_journal_replies_on_journal_id` (`journal_id`),
  KEY `index_journal_replies_on_reply_id` (`reply_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for journals
-- ----------------------------
DROP TABLE IF EXISTS `journals`;
CREATE TABLE `journals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `journalized_id` int(11) NOT NULL DEFAULT '0',
  `journalized_type` varchar(30) NOT NULL DEFAULT '',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `notes` text,
  `created_on` datetime NOT NULL,
  `private_notes` tinyint(1) NOT NULL DEFAULT '0',
  `parent_id` int(11) DEFAULT NULL,
  `comments_count` int(11) DEFAULT '0',
  `reply_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `journals_journalized_id` (`journalized_id`,`journalized_type`),
  KEY `index_journals_on_user_id` (`user_id`),
  KEY `index_journals_on_journalized_id` (`journalized_id`),
  KEY `index_journals_on_created_on` (`created_on`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for journals_for_messages
-- ----------------------------
DROP TABLE IF EXISTS `journals_for_messages`;
CREATE TABLE `journals_for_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jour_id` int(11) DEFAULT NULL,
  `jour_type` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `notes` text,
  `status` int(11) DEFAULT NULL,
  `reply_id` int(11) DEFAULT NULL,
  `created_on` datetime NOT NULL,
  `updated_on` datetime NOT NULL,
  `m_parent_id` varchar(255) DEFAULT NULL,
  `is_readed` tinyint(1) DEFAULT NULL,
  `m_reply_count` int(11) DEFAULT NULL,
  `m_reply_id` int(11) DEFAULT NULL,
  `is_comprehensive_evaluation` int(11) DEFAULT NULL,
  `private` int(11) DEFAULT '0',
  `root_id` int(11) DEFAULT NULL,
  `hidden` tinyint(1) DEFAULT '0',
  `praises_count` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_journals_for_messages_on_root_id` (`root_id`),
  KEY `index_journals_for_messages_on_jour_id` (`jour_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for kindeditor_assets
-- ----------------------------
DROP TABLE IF EXISTS `kindeditor_assets`;
CREATE TABLE `kindeditor_assets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `asset` varchar(255) DEFAULT NULL,
  `file_size` int(11) DEFAULT NULL,
  `file_type` varchar(255) DEFAULT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `asset_type` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `owner_type` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for mark_downs
-- ----------------------------
DROP TABLE IF EXISTS `mark_downs`;
CREATE TABLE `mark_downs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for member_roles
-- ----------------------------
DROP TABLE IF EXISTS `member_roles`;
CREATE TABLE `member_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `inherited_from` int(11) DEFAULT NULL,
  `is_current` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `index_member_roles_on_member_id` (`member_id`),
  KEY `index_member_roles_on_role_id` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for members
-- ----------------------------
DROP TABLE IF EXISTS `members`;
CREATE TABLE `members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `project_id` int(11) DEFAULT '0',
  `created_on` datetime DEFAULT NULL,
  `mail_notification` tinyint(1) NOT NULL DEFAULT '0',
  `course_id` int(11) DEFAULT '-1',
  `course_group_id` int(11) DEFAULT '0',
  `is_collect` int(11) DEFAULT '1',
  `graduation_group_id` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_members_on_user_id_and_project_id` (`user_id`,`project_id`,`course_id`),
  KEY `index_members_on_user_id` (`user_id`),
  KEY `index_members_on_project_id` (`project_id`),
  KEY `index_members_on_course_id` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for mirror_migrate_errors
-- ----------------------------
DROP TABLE IF EXISTS `mirror_migrate_errors`;
CREATE TABLE `mirror_migrate_errors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shixun_id` int(11) DEFAULT NULL,
  `game_info` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for mirror_operation_records
-- ----------------------------
DROP TABLE IF EXISTS `mirror_operation_records`;
CREATE TABLE `mirror_operation_records` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mirror_repository_id` int(11) DEFAULT NULL,
  `mirror_id` text,
  `mirror_name` text,
  `status` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `old_tag` varchar(255) DEFAULT NULL,
  `new_tag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for mirror_repositories
-- ----------------------------
DROP TABLE IF EXISTS `mirror_repositories`;
CREATE TABLE `mirror_repositories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mirrorID` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `main_type` varchar(255) DEFAULT NULL,
  `description` text,
  `status` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `type_name` text,
  `script_template` longtext,
  `resource_limit` int(11) DEFAULT '10000',
  `memory_limit` int(11) DEFAULT '1024',
  `cpu_limit` tinyint(4) DEFAULT '1',
  `time_limit` int(11) DEFAULT '120',
  `should_compile` tinyint(1) DEFAULT NULL,
  `repertoire_id` int(11) DEFAULT NULL,
  `sub_repertoire_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for mirror_repository_types
-- ----------------------------
DROP TABLE IF EXISTS `mirror_repository_types`;
CREATE TABLE `mirror_repository_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mirror_type_id` int(11) DEFAULT NULL,
  `mirror_repository_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_mirror_repository_types_on_mirror_type_id` (`mirror_type_id`),
  KEY `index_mirror_repository_types_on_mirror_repository_id` (`mirror_repository_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for mirror_scripts
-- ----------------------------
DROP TABLE IF EXISTS `mirror_scripts`;
CREATE TABLE `mirror_scripts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mirror_repository_id` int(11) DEFAULT NULL,
  `script` longtext,
  `script_type` varchar(255) DEFAULT NULL,
  `description` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for mirror_types
-- ----------------------------
DROP TABLE IF EXISTS `mirror_types`;
CREATE TABLE `mirror_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for mirror_update_records
-- ----------------------------
DROP TABLE IF EXISTS `mirror_update_records`;
CREATE TABLE `mirror_update_records` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `mirror_repository_id` int(11) DEFAULT NULL,
  `oldName` varchar(255) DEFAULT NULL,
  `newName` varchar(255) DEFAULT NULL,
  `oldType` varchar(255) DEFAULT NULL,
  `newType` varchar(255) DEFAULT NULL,
  `oldTag` text,
  `newTag` text,
  `oldDescription` text,
  `newDescription` text,
  `oldStatus` int(11) DEFAULT NULL,
  `newStatus` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_mirror_update_records_on_user_id` (`user_id`),
  KEY `index_mirror_update_records_on_mirror_repository_id` (`mirror_repository_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for module_settings
-- ----------------------------
DROP TABLE IF EXISTS `module_settings`;
CREATE TABLE `module_settings` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `module_type` varchar(255) DEFAULT NULL,
  `property` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_module_settings_on_module_type` (`module_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for no_uses
-- ----------------------------
DROP TABLE IF EXISTS `no_uses`;
CREATE TABLE `no_uses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `no_use_type` varchar(255) DEFAULT NULL,
  `no_use_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for notificationcomments
-- ----------------------------
DROP TABLE IF EXISTS `notificationcomments`;
CREATE TABLE `notificationcomments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `notificationcommented_type` varchar(255) DEFAULT NULL,
  `notificationcommented_id` int(11) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `notificationcomments` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for oauth_configs
-- ----------------------------
DROP TABLE IF EXISTS `oauth_configs`;
CREATE TABLE `oauth_configs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` varchar(255) DEFAULT NULL,
  `client_secret` varchar(255) DEFAULT NULL,
  `redirect_uri` varchar(255) DEFAULT NULL,
  `scope` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for oauths
-- ----------------------------
DROP TABLE IF EXISTS `oauths`;
CREATE TABLE `oauths` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` varchar(255) DEFAULT NULL,
  `client_secret` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `redirect_uri` varchar(255) DEFAULT NULL,
  `scope` varchar(255) DEFAULT NULL,
  `access_token` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `token_created_at` int(11) DEFAULT NULL,
  `token_expires_in` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_oauths_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for onclick_times
-- ----------------------------
DROP TABLE IF EXISTS `onclick_times`;
CREATE TABLE `onclick_times` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `onclick_time` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_onclick_times_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for open_id_authentication_associations
-- ----------------------------
DROP TABLE IF EXISTS `open_id_authentication_associations`;
CREATE TABLE `open_id_authentication_associations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `issued` int(11) DEFAULT NULL,
  `lifetime` int(11) DEFAULT NULL,
  `handle` varchar(255) DEFAULT NULL,
  `assoc_type` varchar(255) DEFAULT NULL,
  `server_url` blob,
  `secret` blob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for open_id_authentication_nonces
-- ----------------------------
DROP TABLE IF EXISTS `open_id_authentication_nonces`;
CREATE TABLE `open_id_authentication_nonces` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` int(11) NOT NULL,
  `server_url` varchar(255) DEFAULT NULL,
  `salt` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for open_source_projects
-- ----------------------------
DROP TABLE IF EXISTS `open_source_projects`;
CREATE TABLE `open_source_projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `commit_count` int(11) DEFAULT '0',
  `code_line` int(11) DEFAULT '0',
  `users_count` int(11) DEFAULT '0',
  `last_commit_time` date DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `date_collected` date DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for open_users
-- ----------------------------
DROP TABLE IF EXISTS `open_users`;
CREATE TABLE `open_users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `uid` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `extra` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_open_users_on_type_and_uid` (`type`,`uid`),
  KEY `index_open_users_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for openis
-- ----------------------------
DROP TABLE IF EXISTS `openis`;
CREATE TABLE `openis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `openi_user_id` int(11) DEFAULT NULL,
  `login` varchar(255) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `allow` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for option_numbers
-- ----------------------------
DROP TABLE IF EXISTS `option_numbers`;
CREATE TABLE `option_numbers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `memo` int(11) DEFAULT NULL,
  `messages_for_issues` int(11) DEFAULT NULL,
  `issues_status` int(11) DEFAULT NULL,
  `replay_for_message` int(11) DEFAULT NULL,
  `replay_for_memo` int(11) DEFAULT NULL,
  `follow` int(11) DEFAULT NULL,
  `tread` int(11) DEFAULT NULL,
  `praise_by_one` int(11) DEFAULT NULL,
  `praise_by_two` int(11) DEFAULT NULL,
  `praise_by_three` int(11) DEFAULT NULL,
  `tread_by_one` int(11) DEFAULT NULL,
  `tread_by_two` int(11) DEFAULT NULL,
  `tread_by_three` int(11) DEFAULT NULL,
  `changeset` int(11) DEFAULT NULL,
  `document` int(11) DEFAULT NULL,
  `attachment` int(11) DEFAULT NULL,
  `issue_done_ratio` int(11) DEFAULT NULL,
  `post_issue` int(11) DEFAULT NULL,
  `score_type` int(11) DEFAULT NULL,
  `total_score` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for org_activities
-- ----------------------------
DROP TABLE IF EXISTS `org_activities`;
CREATE TABLE `org_activities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `org_act_id` int(11) DEFAULT NULL,
  `org_act_type` varchar(255) DEFAULT NULL,
  `container_id` int(11) DEFAULT NULL,
  `container_type` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for org_courses
-- ----------------------------
DROP TABLE IF EXISTS `org_courses`;
CREATE TABLE `org_courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for org_document_comments
-- ----------------------------
DROP TABLE IF EXISTS `org_document_comments`;
CREATE TABLE `org_document_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text,
  `content` text,
  `organization_id` int(11) DEFAULT NULL,
  `creator_id` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `reply_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `locked` tinyint(1) DEFAULT '0',
  `sticky` int(11) DEFAULT '0',
  `org_subfield_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `root_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_org_document_comments_on_root_id` (`root_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for org_member_roles
-- ----------------------------
DROP TABLE IF EXISTS `org_member_roles`;
CREATE TABLE `org_member_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `org_member_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for org_members
-- ----------------------------
DROP TABLE IF EXISTS `org_members`;
CREATE TABLE `org_members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `organization_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for org_messages
-- ----------------------------
DROP TABLE IF EXISTS `org_messages`;
CREATE TABLE `org_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `organization_id` int(11) DEFAULT NULL,
  `message_type` varchar(255) DEFAULT NULL,
  `message_id` int(11) DEFAULT NULL,
  `viewed` int(11) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for org_projects
-- ----------------------------
DROP TABLE IF EXISTS `org_projects`;
CREATE TABLE `org_projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for org_subfield_messages
-- ----------------------------
DROP TABLE IF EXISTS `org_subfield_messages`;
CREATE TABLE `org_subfield_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `org_subfield_id` int(11) DEFAULT NULL,
  `message_id` int(11) DEFAULT NULL,
  `message_type` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for org_subfields
-- ----------------------------
DROP TABLE IF EXISTS `org_subfields`;
CREATE TABLE `org_subfields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `field_type` varchar(255) DEFAULT NULL,
  `hide` int(11) DEFAULT '0',
  `status` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for organizations
-- ----------------------------
DROP TABLE IF EXISTS `organizations`;
CREATE TABLE `organizations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `creator_id` int(11) DEFAULT NULL,
  `home_id` int(11) DEFAULT NULL,
  `is_public` tinyint(1) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `allow_guest_download` tinyint(1) DEFAULT '1',
  `visits` int(11) DEFAULT '0',
  `show_mode` int(11) DEFAULT '0',
  `allow_teacher` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for outputs
-- ----------------------------
DROP TABLE IF EXISTS `outputs`;
CREATE TABLE `outputs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` int(11) DEFAULT NULL,
  `game_id` int(11) DEFAULT NULL,
  `msg` text,
  `out_put` longtext,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `test_set_position` int(11) DEFAULT NULL,
  `actual_output` longtext,
  `result` tinyint(1) DEFAULT NULL,
  `is_public` tinyint(1) DEFAULT NULL,
  `query_index` int(11) DEFAULT '1',
  `compile_success` int(11) DEFAULT '1',
  `text_scor` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `game` (`game_id`,`query_index`),
  KEY `index_outputs_on_test_set_position` (`test_set_position`),
  KEY `index_outputs_on_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for phone_app_versions
-- ----------------------------
DROP TABLE IF EXISTS `phone_app_versions`;
CREATE TABLE `phone_app_versions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `version` varchar(255) DEFAULT NULL,
  `description` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for platform_samples
-- ----------------------------
DROP TABLE IF EXISTS `platform_samples`;
CREATE TABLE `platform_samples` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `samples_type` varchar(255) DEFAULT NULL,
  `contents` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for praise_tread_caches
-- ----------------------------
DROP TABLE IF EXISTS `praise_tread_caches`;
CREATE TABLE `praise_tread_caches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `object_id` int(11) NOT NULL,
  `object_type` varchar(255) DEFAULT NULL,
  `praise_num` int(11) DEFAULT NULL,
  `tread_num` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for praise_treads
-- ----------------------------
DROP TABLE IF EXISTS `praise_treads`;
CREATE TABLE `praise_treads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `praise_tread_object_id` int(11) DEFAULT NULL,
  `praise_tread_object_type` varchar(255) DEFAULT NULL,
  `praise_or_tread` int(11) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `praise_tread` (`praise_tread_object_id`,`praise_tread_object_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for principal_activities
-- ----------------------------
DROP TABLE IF EXISTS `principal_activities`;
CREATE TABLE `principal_activities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `principal_id` int(11) DEFAULT NULL,
  `principal_act_id` int(11) DEFAULT NULL,
  `principal_act_type` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for private_messages
-- ----------------------------
DROP TABLE IF EXISTS `private_messages`;
CREATE TABLE `private_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `target_id` int(11) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `content` text,
  `send_time` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_private_messages_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for professional_levels
-- ----------------------------
DROP TABLE IF EXISTS `professional_levels`;
CREATE TABLE `professional_levels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for project_infos
-- ----------------------------
DROP TABLE IF EXISTS `project_infos`;
CREATE TABLE `project_infos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for project_package_applies
-- ----------------------------
DROP TABLE IF EXISTS `project_package_applies`;
CREATE TABLE `project_package_applies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_package_id` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `refused_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_project_package_applies_on_project_package_id` (`project_package_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for project_package_categories
-- ----------------------------
DROP TABLE IF EXISTS `project_package_categories`;
CREATE TABLE `project_package_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for project_packages
-- ----------------------------
DROP TABLE IF EXISTS `project_packages`;
CREATE TABLE `project_packages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_id` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `contact_name` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(255) DEFAULT NULL,
  `min_price` decimal(10,0) DEFAULT NULL,
  `max_price` decimal(10,0) DEFAULT NULL,
  `visit_count` int(11) DEFAULT '0',
  `bidding_users_count` int(11) DEFAULT '0',
  `deadline_at` datetime DEFAULT NULL,
  `published_at` datetime DEFAULT NULL,
  `bidding_finished_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `project_package_category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_project_packages_on_published_at` (`published_at`),
  KEY `index_project_packages_on_creator_id` (`creator_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for project_scores
-- ----------------------------
DROP TABLE IF EXISTS `project_scores`;
CREATE TABLE `project_scores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` varchar(255) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `issue_num` int(11) DEFAULT '0',
  `issue_journal_num` int(11) DEFAULT '0',
  `news_num` int(11) DEFAULT '0',
  `documents_num` int(11) DEFAULT '0',
  `changeset_num` int(11) DEFAULT '0',
  `board_message_num` int(11) DEFAULT '0',
  `board_num` int(11) DEFAULT '0',
  `attach_num` int(11) DEFAULT '0',
  `commit_time` datetime DEFAULT NULL,
  `pull_request_num` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for project_statuses
-- ----------------------------
DROP TABLE IF EXISTS `project_statuses`;
CREATE TABLE `project_statuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `changesets_count` int(11) DEFAULT NULL,
  `watchers_count` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `project_type` int(11) DEFAULT NULL,
  `grade` float DEFAULT '0',
  `course_ac_para` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_project_statuses_on_grade` (`grade`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for projecting_softapplictions
-- ----------------------------
DROP TABLE IF EXISTS `projecting_softapplictions`;
CREATE TABLE `projecting_softapplictions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `softapplication_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for projects
-- ----------------------------
DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `description` text,
  `homepage` varchar(255) DEFAULT '',
  `is_public` tinyint(1) NOT NULL DEFAULT '1',
  `parent_id` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `identifier` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `lft` int(11) DEFAULT NULL,
  `rgt` int(11) DEFAULT NULL,
  `inherit_members` tinyint(1) NOT NULL DEFAULT '0',
  `project_type` int(11) DEFAULT '0',
  `hidden_repo` tinyint(1) NOT NULL DEFAULT '0',
  `attachmenttype` int(11) DEFAULT '1',
  `user_id` int(11) DEFAULT NULL,
  `dts_test` int(11) DEFAULT '0',
  `enterprise_name` varchar(255) DEFAULT NULL,
  `organization_id` int(11) DEFAULT NULL,
  `project_new_type` int(11) DEFAULT NULL,
  `gpid` int(11) DEFAULT NULL,
  `forked_from_project_id` int(11) DEFAULT NULL,
  `forked_count` int(11) DEFAULT '0',
  `publish_resource` int(11) DEFAULT '0',
  `visits` int(11) DEFAULT '0',
  `hot` int(11) DEFAULT '0',
  `invite_code` varchar(255) DEFAULT NULL,
  `qrcode` varchar(255) DEFAULT NULL,
  `qrcode_expiretime` int(11) DEFAULT '0',
  `script` text,
  `training_status` tinyint(4) DEFAULT '0',
  `rep_identifier` varchar(255) DEFAULT NULL,
  `project_category_id` int(11) DEFAULT NULL,
  `project_language_id` int(11) DEFAULT NULL,
  `license_id` int(11) DEFAULT NULL,
  `ignore_id` int(11) DEFAULT NULL,
  `praises_count` int(11) DEFAULT '0',
  `watchers_count` int(11) DEFAULT '0',
  `issues_count` int(11) DEFAULT '0',
  `pull_requests_count` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_projects_on_lft` (`lft`),
  KEY `index_projects_on_rgt` (`rgt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for projects_trackers
-- ----------------------------
DROP TABLE IF EXISTS `projects_trackers`;
CREATE TABLE `projects_trackers` (
  `project_id` int(11) NOT NULL DEFAULT '0',
  `tracker_id` int(11) NOT NULL DEFAULT '0',
  UNIQUE KEY `projects_trackers_unique` (`project_id`,`tracker_id`),
  KEY `projects_trackers_project_id` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for pull_request_assigns
-- ----------------------------
DROP TABLE IF EXISTS `pull_request_assigns`;
CREATE TABLE `pull_request_assigns` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `pull_request_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_login` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_pull_request_assigns_on_user_id_and_pull_request_id` (`pull_request_id`),
  KEY `index_pull_request_assigns_on_user_login` (`user_login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for pull_request_tags
-- ----------------------------
DROP TABLE IF EXISTS `pull_request_tags`;
CREATE TABLE `pull_request_tags` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `issue_tag_id` int(11) DEFAULT NULL,
  `pull_request_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_pull_request_tags_on_issue_tag_id_and_pull_request_id` (`issue_tag_id`,`pull_request_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for pull_requests
-- ----------------------------
DROP TABLE IF EXISTS `pull_requests`;
CREATE TABLE `pull_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pull_request_id` int(11) DEFAULT NULL,
  `gpid` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `status` int(11) DEFAULT '0',
  `project_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `milestone` int(11) DEFAULT NULL,
  `body` text,
  `head` varchar(255) DEFAULT NULL,
  `base` varchar(255) DEFAULT NULL,
  `issue_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for quality_analyses
-- ----------------------------
DROP TABLE IF EXISTS `quality_analyses`;
CREATE TABLE `quality_analyses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `author_login` varchar(255) DEFAULT NULL,
  `rep_identifier` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `sonar_version` int(11) DEFAULT '0',
  `path` varchar(255) DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `sonar_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for queries
-- ----------------------------
DROP TABLE IF EXISTS `queries`;
CREATE TABLE `queries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `filters` text,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `is_public` tinyint(1) NOT NULL DEFAULT '0',
  `column_names` text,
  `sort_criteria` text,
  `group_by` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_queries_on_project_id` (`project_id`),
  KEY `index_queries_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for relationships
-- ----------------------------
DROP TABLE IF EXISTS `relationships`;
CREATE TABLE `relationships` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `follower_id` int(11) DEFAULT NULL,
  `followed_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_relationships_on_follower_id_and_followed_id` (`follower_id`,`followed_id`),
  KEY `index_relationships_on_followed_id` (`followed_id`),
  KEY `index_relationships_on_follower_id` (`follower_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for rep_statics
-- ----------------------------
DROP TABLE IF EXISTS `rep_statics`;
CREATE TABLE `rep_statics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `commits_num` int(11) DEFAULT NULL,
  `uname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `add` int(11) DEFAULT NULL,
  `del` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `changeset` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for repertoires
-- ----------------------------
DROP TABLE IF EXISTS `repertoires`;
CREATE TABLE `repertoires` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for repositories
-- ----------------------------
DROP TABLE IF EXISTS `repositories`;
CREATE TABLE `repositories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL DEFAULT '0',
  `url` varchar(255) NOT NULL DEFAULT '',
  `login` varchar(60) DEFAULT '',
  `password` varchar(255) DEFAULT '',
  `root_url` varchar(255) DEFAULT '',
  `type` varchar(255) DEFAULT NULL,
  `path_encoding` varchar(64) DEFAULT NULL,
  `log_encoding` varchar(64) DEFAULT NULL,
  `extra_info` text,
  `identifier` varchar(255) DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT '0',
  `hidden` tinyint(1) DEFAULT '0',
  `shixun_id` int(11) DEFAULT NULL,
  `myshixun_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `mirror_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_repositories_on_project_id` (`project_id`),
  KEY `index_repositories_on_identifier` (`identifier`),
  KEY `index_repositories_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for resource_banks
-- ----------------------------
DROP TABLE IF EXISTS `resource_banks`;
CREATE TABLE `resource_banks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) DEFAULT NULL,
  `attachment_id` int(11) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `disk_filename` varchar(255) DEFAULT NULL,
  `filesize` int(11) DEFAULT NULL,
  `digest` varchar(255) DEFAULT NULL,
  `downloads` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `description` text,
  `disk_directory` varchar(255) DEFAULT NULL,
  `is_public` tinyint(1) DEFAULT NULL,
  `copy_from` int(11) DEFAULT NULL,
  `quotes` int(11) DEFAULT NULL,
  `applicable_syllabus` varchar(255) DEFAULT NULL,
  `major_level` int(11) DEFAULT NULL,
  `discipline_category_id` int(11) DEFAULT NULL,
  `first_level_discipline_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `content_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_resource_banks_on_course_id` (`course_id`),
  KEY `index_resource_banks_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '',
  `position` int(11) DEFAULT '1',
  `assignable` tinyint(1) DEFAULT '1',
  `builtin` int(11) NOT NULL DEFAULT '0',
  `permissions` text,
  `issues_visibility` varchar(30) NOT NULL DEFAULT 'default',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for run_code_messages
-- ----------------------------
DROP TABLE IF EXISTS `run_code_messages`;
CREATE TABLE `run_code_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` int(11) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `game_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_run_code_messages_on_game_id` (`game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for schema_migrations
-- ----------------------------
DROP TABLE IF EXISTS `schema_migrations`;
CREATE TABLE `schema_migrations` (
  `version` varchar(255) NOT NULL,
  UNIQUE KEY `unique_schema_migrations` (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for settings
-- ----------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `value` text,
  `updated_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_settings_on_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for shares
-- ----------------------------
DROP TABLE IF EXISTS `shares`;
CREATE TABLE `shares` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_on` date DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `share_type` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for shield_activities
-- ----------------------------
DROP TABLE IF EXISTS `shield_activities`;
CREATE TABLE `shield_activities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `container_type` varchar(255) DEFAULT NULL,
  `container_id` int(11) DEFAULT NULL,
  `shield_type` varchar(255) DEFAULT NULL,
  `shield_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for shield_wechat_messages
-- ----------------------------
DROP TABLE IF EXISTS `shield_wechat_messages`;
CREATE TABLE `shield_wechat_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `container_id` int(11) DEFAULT NULL,
  `container_type` varchar(255) DEFAULT NULL,
  `shield_id` int(11) DEFAULT NULL,
  `shield_type` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for softapplications
-- ----------------------------
DROP TABLE IF EXISTS `softapplications`;
CREATE TABLE `softapplications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `app_type_id` int(11) DEFAULT NULL,
  `app_type_name` varchar(255) DEFAULT NULL,
  `android_min_version_available` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `contest_id` int(11) DEFAULT NULL,
  `softapplication_id` int(11) DEFAULT NULL,
  `is_public` int(11) DEFAULT NULL,
  `application_developers` varchar(255) DEFAULT NULL,
  `deposit_project_url` varchar(255) DEFAULT NULL,
  `deposit_project` varchar(255) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sonar_errors
-- ----------------------------
DROP TABLE IF EXISTS `sonar_errors`;
CREATE TABLE `sonar_errors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `jenkins_job_name` varchar(255) DEFAULT NULL,
  `output` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ssos
-- ----------------------------
DROP TABLE IF EXISTS `ssos`;
CREATE TABLE `ssos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `openid` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_ssos_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for subject_members
-- ----------------------------
DROP TABLE IF EXISTS `subject_members`;
CREATE TABLE `subject_members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `position` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `index_subject_members_on_subject_id` (`subject_id`),
  KEY `index_subject_members_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for subject_records
-- ----------------------------
DROP TABLE IF EXISTS `subject_records`;
CREATE TABLE `subject_records` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `subject_id` bigint(20) DEFAULT NULL,
  `study_count` int(11) DEFAULT '0',
  `course_study_count` int(11) DEFAULT '0',
  `initiative_study` int(11) DEFAULT '0',
  `passed_count` int(11) DEFAULT '0',
  `course_used_count` int(11) DEFAULT '0',
  `school_used_count` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_subject_records_on_subject_id` (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for subjects
-- ----------------------------
DROP TABLE IF EXISTS `subjects`;
CREATE TABLE `subjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `user_id` int(11) DEFAULT NULL,
  `visits` int(11) DEFAULT '1',
  `status` int(11) DEFAULT '0',
  `course_list_id` int(11) DEFAULT NULL,
  `major_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `hidden` tinyint(1) DEFAULT '0',
  `learning_notes` text,
  `introduction` varchar(255) DEFAULT NULL,
  `stages_count` int(11) DEFAULT '0',
  `stage_shixuns_count` int(11) DEFAULT '0',
  `homepage_show` tinyint(1) DEFAULT '0',
  `repertoire_id` int(11) DEFAULT NULL,
  `score_count` int(11) DEFAULT NULL,
  `shixuns_count` int(11) DEFAULT '0',
  `publish_time` datetime DEFAULT NULL,
  `subject_level_system_id` int(11) DEFAULT NULL,
  `student_count` int(11) DEFAULT '0',
  `participant_count` int(11) DEFAULT '0',
  `team_title` varchar(255) DEFAULT '教学团队',
  `copy_subject_id` int(11) DEFAULT NULL,
  `public` int(11) DEFAULT '0',
  `show_mobile` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_subjects_on_user_id` (`user_id`),
  KEY `index_subjects_on_course_list_id` (`course_list_id`),
  KEY `index_subjects_on_major_id` (`major_id`),
  KEY `index_subjects_on_subject_level_system_id` (`subject_level_system_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for system_messages
-- ----------------------------
DROP TABLE IF EXISTS `system_messages`;
CREATE TABLE `system_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `description` text,
  `subject` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for system_update_notices
-- ----------------------------
DROP TABLE IF EXISTS `system_update_notices`;
CREATE TABLE `system_update_notices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject` varchar(255) DEFAULT NULL,
  `notes` text,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `notice_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tag_discipline_containers
-- ----------------------------
DROP TABLE IF EXISTS `tag_discipline_containers`;
CREATE TABLE `tag_discipline_containers` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tag_discipline_id` bigint(20) DEFAULT NULL,
  `container_id` int(11) DEFAULT NULL,
  `container_type` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_tag_discipline_containers_on_tag_discipline_id` (`tag_discipline_id`),
  KEY `index_on_container` (`container_type`,`container_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tag_disciplines
-- ----------------------------
DROP TABLE IF EXISTS `tag_disciplines`;
CREATE TABLE `tag_disciplines` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sub_discipline_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `subject` tinyint(1) DEFAULT '1',
  `shixun` tinyint(1) DEFAULT '1',
  `question` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `position` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_tag_disciplines_on_sub_discipline_id` (`sub_discipline_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tag_repertoires
-- ----------------------------
DROP TABLE IF EXISTS `tag_repertoires`;
CREATE TABLE `tag_repertoires` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `sub_repertoire_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for taggings
-- ----------------------------
DROP TABLE IF EXISTS `taggings`;
CREATE TABLE `taggings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_id` int(11) DEFAULT NULL,
  `taggable_id` int(11) DEFAULT NULL,
  `taggable_type` varchar(255) DEFAULT NULL,
  `tagger_id` int(11) DEFAULT NULL,
  `tagger_type` varchar(255) DEFAULT NULL,
  `context` varchar(128) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `taggings_idx` (`tag_id`,`taggable_id`,`taggable_type`,`context`,`tagger_id`,`tagger_type`),
  KEY `index_taggings_on_taggable_type` (`taggable_type`),
  KEY `index_taggings_on_taggable_id_and_taggable_type_and_context` (`taggable_id`,`taggable_type`,`context`),
  KEY `index_taggings_on_tag_id` (`tag_id`),
  KEY `index_taggings_on_taggable_id` (`taggable_id`),
  KEY `index_taggings_on_tagger_id` (`tagger_id`),
  KEY `index_taggings_on_context` (`context`),
  KEY `index_taggings_on_tagger_id_and_tagger_type` (`tagger_id`,`tagger_type`),
  KEY `taggings_idy` (`taggable_id`,`taggable_type`,`tagger_id`,`context`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `taggings_count` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for teacher_course_groups
-- ----------------------------
DROP TABLE IF EXISTS `teacher_course_groups`;
CREATE TABLE `teacher_course_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) DEFAULT NULL,
  `course_group_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `course_member_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_teacher_course_groups_on_course_group_id` (`course_group_id`),
  KEY `index_teacher_course_groups_on_user_id` (`user_id`),
  KEY `index_teacher_course_groups_on_course_id` (`course_id`),
  KEY `index_teacher_course_groups_on_course_member_id` (`course_member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for team_members
-- ----------------------------
DROP TABLE IF EXISTS `team_members`;
CREATE TABLE `team_members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `competition_team_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `competition_id` int(11) DEFAULT NULL,
  `is_teacher` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_team_members_on_competition_team_id` (`competition_team_id`),
  KEY `index_team_members_on_user_id` (`user_id`),
  KEY `index_team_members_on_competition_id` (`competition_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tidings
-- ----------------------------
DROP TABLE IF EXISTS `tidings`;
CREATE TABLE `tidings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `trigger_user_id` int(11) DEFAULT NULL,
  `container_id` int(11) DEFAULT NULL,
  `container_type` varchar(255) DEFAULT NULL,
  `parent_container_id` int(11) DEFAULT NULL,
  `parent_container_type` varchar(255) DEFAULT NULL,
  `belong_container_id` int(11) DEFAULT NULL,
  `belong_container_type` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `viewed` tinyint(1) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `tiding_type` varchar(255) DEFAULT NULL,
  `extra` varchar(255) DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_tidings_on_user_id` (`user_id`),
  KEY `index_tidings_on_container_id` (`container_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for time_entries
-- ----------------------------
DROP TABLE IF EXISTS `time_entries`;
CREATE TABLE `time_entries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `issue_id` int(11) DEFAULT NULL,
  `hours` float NOT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `activity_id` int(11) NOT NULL,
  `spent_on` date NOT NULL,
  `tyear` int(11) NOT NULL,
  `tmonth` int(11) NOT NULL,
  `tweek` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_on` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `time_entries_project_id` (`project_id`),
  KEY `time_entries_issue_id` (`issue_id`),
  KEY `index_time_entries_on_activity_id` (`activity_id`),
  KEY `index_time_entries_on_user_id` (`user_id`),
  KEY `index_time_entries_on_created_on` (`created_on`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tokens
-- ----------------------------
DROP TABLE IF EXISTS `tokens`;
CREATE TABLE `tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `action` varchar(30) NOT NULL DEFAULT '',
  `value` varchar(40) NOT NULL DEFAULT '',
  `created_on` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tokens_value` (`value`),
  KEY `index_tokens_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for trackers
-- ----------------------------
DROP TABLE IF EXISTS `trackers`;
CREATE TABLE `trackers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '',
  `is_in_chlog` tinyint(1) NOT NULL DEFAULT '0',
  `position` int(11) DEFAULT '1',
  `is_in_roadmap` tinyint(1) NOT NULL DEFAULT '1',
  `fields_bits` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for trustie_hackathons
-- ----------------------------
DROP TABLE IF EXISTS `trustie_hackathons`;
CREATE TABLE `trustie_hackathons` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `trustie_hacks_count` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for trustie_hacks
-- ----------------------------
DROP TABLE IF EXISTS `trustie_hacks`;
CREATE TABLE `trustie_hacks` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `user_id` bigint(20) DEFAULT NULL,
  `hack_users_count` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `trustie_hackathon_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_trustie_hacks_on_user_id` (`user_id`),
  KEY `index_trustie_hacks_on_trustie_hackathon_id` (`trustie_hackathon_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_actions
-- ----------------------------
DROP TABLE IF EXISTS `user_actions`;
CREATE TABLE `user_actions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `action_type` varchar(255) DEFAULT NULL,
  `action_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `ip` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_user_actions_on_ip` (`ip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_activities
-- ----------------------------
DROP TABLE IF EXISTS `user_activities`;
CREATE TABLE `user_activities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `act_type` varchar(255) DEFAULT NULL,
  `act_id` int(11) DEFAULT NULL,
  `container_type` varchar(255) DEFAULT NULL,
  `container_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_act_index` (`act_id`,`act_type`,`container_id`,`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_agents
-- ----------------------------
DROP TABLE IF EXISTS `user_agents`;
CREATE TABLE `user_agents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `agent_type` varchar(255) DEFAULT NULL,
  `key` varchar(255) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `register_status` int(11) DEFAULT '0',
  `action_status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_user_agents_on_ip` (`ip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_day_certifications
-- ----------------------------
DROP TABLE IF EXISTS `user_day_certifications`;
CREATE TABLE `user_day_certifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_user_day_certifications_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_extensions
-- ----------------------------
DROP TABLE IF EXISTS `user_extensions`;
CREATE TABLE `user_extensions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `birthday` date DEFAULT NULL,
  `brief_introduction` varchar(255) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `work_experience` int(11) DEFAULT NULL,
  `zip_code` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `technical_title` varchar(255) DEFAULT NULL,
  `identity` int(11) DEFAULT NULL,
  `student_id` varchar(255) DEFAULT NULL,
  `teacher_realname` varchar(255) DEFAULT NULL,
  `student_realname` varchar(255) DEFAULT NULL,
  `location_city` varchar(255) DEFAULT NULL,
  `school_id` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT '',
  `department_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_user_extensions_on_user_id` (`user_id`),
  KEY `index_user_extensions_on_department_id` (`department_id`),
  KEY `index_user_extensions_on_school_id_and_user_id` (`school_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_feedback_messages
-- ----------------------------
DROP TABLE IF EXISTS `user_feedback_messages`;
CREATE TABLE `user_feedback_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `journals_for_message_id` int(11) DEFAULT NULL,
  `journals_for_message_type` varchar(255) DEFAULT NULL,
  `viewed` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_user_feedback_messages_on_user_id_and_created_at` (`user_id`,`created_at`),
  KEY `index_user_feedback_messages_on_journals_for_message_id` (`journals_for_message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_grades
-- ----------------------------
DROP TABLE IF EXISTS `user_grades`;
CREATE TABLE `user_grades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `grade` float DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_user_grades_on_grade` (`grade`),
  KEY `index_user_grades_on_project_id` (`project_id`),
  KEY `index_user_grades_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_hidden_modules
-- ----------------------------
DROP TABLE IF EXISTS `user_hidden_modules`;
CREATE TABLE `user_hidden_modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `module_type` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_user_hidden_modules_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_interests
-- ----------------------------
DROP TABLE IF EXISTS `user_interests`;
CREATE TABLE `user_interests` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `repertoire_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_user_interests_on_user_id` (`user_id`),
  KEY `index_user_interests_on_repertoire_id` (`repertoire_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_levels
-- ----------------------------
DROP TABLE IF EXISTS `user_levels`;
CREATE TABLE `user_levels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for user_preferences
-- ----------------------------
DROP TABLE IF EXISTS `user_preferences`;
CREATE TABLE `user_preferences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `others` text,
  `hide_mail` tinyint(1) DEFAULT '0',
  `time_zone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_user_preferences_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_score_details
-- ----------------------------
DROP TABLE IF EXISTS `user_score_details`;
CREATE TABLE `user_score_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `current_user_id` int(11) DEFAULT NULL,
  `target_user_id` int(11) DEFAULT NULL,
  `score_type` varchar(255) DEFAULT NULL,
  `score_action` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `old_score` int(11) DEFAULT NULL,
  `new_score` int(11) DEFAULT NULL,
  `current_user_level` int(11) DEFAULT NULL,
  `target_user_level` int(11) DEFAULT NULL,
  `score_changeable_obj_id` int(11) DEFAULT NULL,
  `score_changeable_obj_type` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_scores
-- ----------------------------
DROP TABLE IF EXISTS `user_scores`;
CREATE TABLE `user_scores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `collaboration` int(11) DEFAULT NULL,
  `influence` int(11) DEFAULT NULL,
  `skill` int(11) DEFAULT NULL,
  `active` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_searches
-- ----------------------------
DROP TABLE IF EXISTS `user_searches`;
CREATE TABLE `user_searches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `search_type` int(11) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_user_searches_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_sources
-- ----------------------------
DROP TABLE IF EXISTS `user_sources`;
CREATE TABLE `user_sources` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `uuid` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_user_sources_on_type_and_uuid` (`type`,`uuid`),
  KEY `index_user_sources_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_statuses
-- ----------------------------
DROP TABLE IF EXISTS `user_statuses`;
CREATE TABLE `user_statuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `changesets_count` int(11) DEFAULT NULL,
  `watchers_count` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `grade` float DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_user_statuses_on_changesets_count` (`changesets_count`),
  KEY `index_user_statuses_on_watchers_count` (`watchers_count`),
  KEY `index_user_statuses_on_grade` (`grade`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_system_notices
-- ----------------------------
DROP TABLE IF EXISTS `user_system_notices`;
CREATE TABLE `user_system_notices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `notice_type` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_user_system_notices_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_wechats
-- ----------------------------
DROP TABLE IF EXISTS `user_wechats`;
CREATE TABLE `user_wechats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subscribe` int(11) DEFAULT NULL,
  `openid` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `headimgurl` varchar(255) DEFAULT NULL,
  `subscribe_time` varchar(255) DEFAULT NULL,
  `unionid` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `groupid` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `bindtype` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(255) NOT NULL DEFAULT '',
  `hashed_password` varchar(40) NOT NULL DEFAULT '',
  `firstname` varchar(30) NOT NULL DEFAULT '',
  `lastname` varchar(255) NOT NULL DEFAULT '',
  `mail` varchar(60) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '1',
  `last_login_on` datetime DEFAULT NULL,
  `language` varchar(5) DEFAULT '',
  `auth_source_id` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `identity_url` varchar(255) DEFAULT NULL,
  `mail_notification` varchar(255) NOT NULL DEFAULT '',
  `salt` varchar(64) DEFAULT NULL,
  `gid` int(11) DEFAULT NULL,
  `visits` int(11) DEFAULT '0',
  `excellent_teacher` int(11) DEFAULT '0',
  `excellent_student` int(11) DEFAULT '0',
  `phone` varchar(255) DEFAULT NULL,
  `authentication` tinyint(1) DEFAULT '0',
  `grade` int(11) DEFAULT '0',
  `experience` int(11) DEFAULT '0',
  `nickname` varchar(255) DEFAULT NULL,
  `show_realname` tinyint(1) DEFAULT '1',
  `professional_certification` tinyint(1) DEFAULT '0',
  `ID_number` varchar(255) DEFAULT NULL,
  `certification` int(11) DEFAULT '0',
  `homepage_teacher` tinyint(1) DEFAULT '0',
  `homepage_engineer` tinyint(1) DEFAULT '0',
  `is_test` tinyint(4) DEFAULT '0',
  `ecoder_user_id` int(11) DEFAULT '0',
  `business` tinyint(1) DEFAULT '0',
  `profile_completed` tinyint(1) DEFAULT '0',
  `laboratory_id` bigint(20) DEFAULT NULL,
  `platform` varchar(255) DEFAULT '0',
  `gitea_token` varchar(255) DEFAULT NULL,
  `gitea_uid` int(11) DEFAULT NULL,
  `is_shixun_marker` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_users_on_homepage_engineer` (`homepage_engineer`),
  KEY `index_users_on_homepage_teacher` (`homepage_teacher`),
  KEY `index_users_on_ecoder_user_id` (`ecoder_user_id`),
  KEY `index_users_on_laboratory_id` (`laboratory_id`),
  KEY `index_users_on_login` (`login`),
  KEY `index_users_on_mail` (`mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for users_authentications
-- ----------------------------
DROP TABLE IF EXISTS `users_authentications`;
CREATE TABLE `users_authentications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `authentication_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for verification_codes
-- ----------------------------
DROP TABLE IF EXISTS `verification_codes`;
CREATE TABLE `verification_codes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `code_type` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `by_phone` (`phone`),
  KEY `by_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for version_releases
-- ----------------------------
DROP TABLE IF EXISTS `version_releases`;
CREATE TABLE `version_releases` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `body` text,
  `tag_name` varchar(255) DEFAULT NULL,
  `target_commitish` varchar(255) DEFAULT NULL,
  `draft` tinyint(1) DEFAULT '0',
  `prerelease` tinyint(1) DEFAULT '0',
  `tarball_url` varchar(255) DEFAULT NULL,
  `zipball_url` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `version_gid` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `repository_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_version_releases_on_repository_id` (`repository_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for versions
-- ----------------------------
DROP TABLE IF EXISTS `versions`;
CREATE TABLE `versions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  `description` text,
  `effective_date` date DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `wiki_page_title` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'open',
  `sharing` varchar(255) NOT NULL DEFAULT 'none',
  `user_id` int(11) DEFAULT NULL,
  `issues_count` int(11) DEFAULT '0',
  `closed_issues_count` int(11) DEFAULT '0',
  `percent` float DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `versions_project_id` (`project_id`),
  KEY `index_versions_on_sharing` (`sharing`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for visitors
-- ----------------------------
DROP TABLE IF EXISTS `visitors`;
CREATE TABLE `visitors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `master_id` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_visitors_user_id` (`user_id`),
  KEY `index_visitors_master_id` (`master_id`),
  KEY `index_visitors_updated_on` (`updated_on`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for watchers
-- ----------------------------
DROP TABLE IF EXISTS `watchers`;
CREATE TABLE `watchers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `watchable_type` varchar(255) NOT NULL DEFAULT '',
  `watchable_id` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `watchers_user_id_type` (`user_id`,`watchable_type`),
  KEY `index_watchers_on_user_id` (`user_id`),
  KEY `index_watchers_on_watchable_id_and_watchable_type` (`watchable_id`,`watchable_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for weapp_settings
-- ----------------------------
DROP TABLE IF EXISTS `weapp_settings`;
CREATE TABLE `weapp_settings` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `online` tinyint(1) DEFAULT '0',
  `position` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for web_footer_companies
-- ----------------------------
DROP TABLE IF EXISTS `web_footer_companies`;
CREATE TABLE `web_footer_companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `logo_size` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for web_footer_oranizers
-- ----------------------------
DROP TABLE IF EXISTS `web_footer_oranizers`;
CREATE TABLE `web_footer_oranizers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for websshes
-- ----------------------------
DROP TABLE IF EXISTS `websshes`;
CREATE TABLE `websshes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `myshixun_id` int(11) DEFAULT NULL,
  `host` varchar(255) DEFAULT NULL,
  `port` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for wechat_logs
-- ----------------------------
DROP TABLE IF EXISTS `wechat_logs`;
CREATE TABLE `wechat_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) NOT NULL,
  `request_raw` text,
  `response_raw` text,
  `session_raw` text,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_wechat_logs_on_openid` (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for wiki_content_versions
-- ----------------------------
DROP TABLE IF EXISTS `wiki_content_versions`;
CREATE TABLE `wiki_content_versions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wiki_content_id` int(11) NOT NULL,
  `page_id` int(11) NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  `data` longblob,
  `compression` varchar(6) DEFAULT '',
  `comments` varchar(255) DEFAULT '',
  `updated_on` datetime NOT NULL,
  `version` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `wiki_content_versions_wcid` (`wiki_content_id`),
  KEY `index_wiki_content_versions_on_updated_on` (`updated_on`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for wiki_contents
-- ----------------------------
DROP TABLE IF EXISTS `wiki_contents`;
CREATE TABLE `wiki_contents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `page_id` int(11) NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  `text` longtext,
  `comments` varchar(255) DEFAULT '',
  `updated_on` datetime NOT NULL,
  `version` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `wiki_contents_page_id` (`page_id`),
  KEY `index_wiki_contents_on_author_id` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for wiki_pages
-- ----------------------------
DROP TABLE IF EXISTS `wiki_pages`;
CREATE TABLE `wiki_pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wiki_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `created_on` datetime NOT NULL,
  `protected` tinyint(1) NOT NULL DEFAULT '0',
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `wiki_pages_wiki_id_title` (`wiki_id`,`title`),
  KEY `index_wiki_pages_on_wiki_id` (`wiki_id`),
  KEY `index_wiki_pages_on_parent_id` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for wiki_redirects
-- ----------------------------
DROP TABLE IF EXISTS `wiki_redirects`;
CREATE TABLE `wiki_redirects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wiki_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `redirects_to` varchar(255) DEFAULT NULL,
  `created_on` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `wiki_redirects_wiki_id_title` (`wiki_id`,`title`),
  KEY `index_wiki_redirects_on_wiki_id` (`wiki_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for wikis
-- ----------------------------
DROP TABLE IF EXISTS `wikis`;
CREATE TABLE `wikis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `start_page` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `wikis_project_id` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for project_categories
-- ----------------------------
DROP TABLE IF EXISTS `project_categories`;
CREATE TABLE `project_categories` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `projects_count` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `ancestry` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_project_categories_on_ancestry` (`ancestry`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for zip_packs
-- ----------------------------
DROP TABLE IF EXISTS `zip_packs`;
CREATE TABLE `zip_packs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `homework_id` int(11) DEFAULT NULL,
  `file_digest` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `pack_times` int(11) DEFAULT '1',
  `pack_size` float DEFAULT '0',
  `file_digests` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `container_id` int(11) DEFAULT '0',
  `container_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_zip_packs_on_container_id_and_container_type` (`container_id`,`container_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for laboratories
-- ----------------------------
DROP TABLE IF EXISTS `laboratories`;
CREATE TABLE `laboratories` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `school_id` bigint(20) DEFAULT NULL,
  `identifier` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `sync_course` tinyint(1) DEFAULT '0',
  `sync_subject` tinyint(1) DEFAULT '0',
  `sync_shixun` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_laboratories_on_identifier` (`identifier`),
  KEY `index_laboratories_on_school_id` (`school_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for laboratory_settings
-- ----------------------------
DROP TABLE IF EXISTS `laboratory_settings`;
CREATE TABLE `laboratory_settings` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `laboratory_id` bigint(20) DEFAULT NULL,
  `config` text,
  PRIMARY KEY (`id`),
  KEY `index_laboratory_settings_on_laboratory_id` (`laboratory_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for laboratory_users
-- ----------------------------
DROP TABLE IF EXISTS `laboratory_users`;
CREATE TABLE `laboratory_users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `laboratory_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_laboratory_users_on_laboratory_id` (`laboratory_id`),
  KEY `index_laboratory_users_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of laboratories
-- ----------------------------
BEGIN;
INSERT INTO `laboratories` VALUES (1, NULL, 'www', '2019-10-16 15:16:11', '2019-10-16 15:16:11', 0, 0, 0);
COMMIT;

-- ----------------------------
-- Records of laboratory_settings
-- ----------------------------
BEGIN;
INSERT INTO `laboratory_settings` VALUES (1, 1, '{\"name\":\"EduCoder\",\"navbar\":[{\"name\":\"实践课程\",\"link\":\"/paths\",\"hidden\":false},{\"name\":\"翻转课堂\",\"link\":\"/courses\",\"hidden\":false},{\"name\":\"实现项目\",\"link\":\"/shixuns\",\"hidden\":false},{\"name\":\"在线竞赛\",\"link\":\"/competitions\",\"hidden\":false},{\"name\":\"教学案例\",\"link\":\"/moop_cases\",\"hidden\":false},{\"name\":\"交流问答\",\"link\":\"/forums\",\"hidden\":false}],\"footer\":\"\\n\\u003cp class=\\\"footer_con-p inline lineh-30  font-14\\\"\\u003e\\n  \\u003cspan class=\\\"font-18 fl\\\"\\u003e©\\u003c/span\\u003e\\u0026nbsp;2019\\u0026nbsp;EduCoder\\n  \\u003ca target=\\\"_blank\\\" href=\\\"http://beian.miit.gov.cn/\\\" class=\\\"ml15 mr15\\\" style=\\\"color: rgb(136, 136, 136);\\\"\\u003e湘ICP备17009477号\\u003c/a\\u003e\\n  \\u003ca target=\\\"_blank\\\" href=\\\"http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=43019002000962\\\" class=\\\"mr15\\\" style=\\\"color: rgb(136, 136, 136);\\\"\\u003e\\n    \\u003cimg class=\\\"vertical4\\\" src=\\\"https://ali-cdn.educoder.net/react/build/static/media/beian.d0289dc0.png\\\"\\u003e湘公网安备43019002000962号\\n  \\u003c/a\\u003e\\n  \\u003ca href=\\\"https://team.trustie.net\\\" target=\\\"_blank\\\" style=\\\"color: rgb(136, 136, 136);\\\"\\u003eTrustie\\u003c/a\\u003e\\n  \\u0026nbsp;\\u0026nbsp;\\u0026nbsp;\\u0026amp;\\u0026nbsp;\\u0026nbsp;\\u0026nbsp;IntelliDE inside.\\n  \\u003cspan class=\\\"mr15\\\"\\u003e版权所有 湖南智擎科技有限公司\\u003c/span\\u003e\\u003c/p\\u003e\\n    \"}');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
