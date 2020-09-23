module Ci::Schema
  class << self
    def statement
      sqls = <<-SQL
        CREATE TABLE IF NOT EXISTS  `repos` (
        `repo_id` int(11) NOT NULL AUTO_INCREMENT,
        `repo_uid` varchar(250) DEFAULT NULL,
        `repo_user_id` int(11) DEFAULT NULL,
        `repo_namespace` varchar(250) DEFAULT NULL,
        `repo_name` varchar(250) DEFAULT NULL,
        `repo_slug` varchar(250) DEFAULT NULL,
        `repo_scm` varchar(50) DEFAULT NULL,
        `repo_clone_url` varchar(2000) DEFAULT NULL,
        `repo_ssh_url` varchar(2000) DEFAULT NULL,
        `repo_html_url` varchar(2000) DEFAULT NULL,
        `repo_active` tinyint(1) DEFAULT NULL,
        `repo_private` tinyint(1) DEFAULT NULL,
        `repo_visibility` varchar(50) DEFAULT NULL,
        `repo_branch` varchar(250) DEFAULT NULL,
        `repo_counter` int(11) DEFAULT NULL,
        `repo_config` varchar(500) DEFAULT NULL,
        `repo_timeout` int(11) DEFAULT NULL,
        `repo_trusted` tinyint(1) DEFAULT NULL,
        `repo_protected` tinyint(1) DEFAULT NULL,
        `repo_synced` int(11) DEFAULT NULL,
        `repo_created` int(11) DEFAULT NULL,
        `repo_updated` int(11) DEFAULT NULL,
        `repo_version` int(11) DEFAULT NULL,
        `repo_signer` varchar(50) DEFAULT NULL,
        `repo_secret` varchar(50) DEFAULT NULL,
        PRIMARY KEY (`repo_id`),
        UNIQUE KEY `repo_slug` (`repo_slug`),
        UNIQUE KEY `repo_uid` (`repo_uid`)
        ) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

        CREATE TABLE IF NOT EXISTS  `builds` (
        `build_id` int(11) NOT NULL AUTO_INCREMENT,
        `build_repo_id` int(11) DEFAULT NULL,
        `build_config_id` int(11) DEFAULT NULL,
        `build_trigger` varchar(250) DEFAULT NULL,
        `build_number` int(11) DEFAULT NULL,
        `build_parent` int(11) DEFAULT NULL,
        `build_status` varchar(50) DEFAULT NULL,
        `build_error` varchar(500) DEFAULT NULL,
        `build_event` varchar(50) DEFAULT NULL,
        `build_action` varchar(50) DEFAULT NULL,
        `build_link` varchar(1000) DEFAULT NULL,
        `build_timestamp` int(11) DEFAULT NULL,
        `build_title` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        `build_message` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        `build_before` varchar(50) DEFAULT NULL,
        `build_after` varchar(50) DEFAULT NULL,
        `build_ref` varchar(500) DEFAULT NULL,
        `build_source_repo` varchar(250) DEFAULT NULL,
        `build_source` varchar(500) DEFAULT NULL,
        `build_target` varchar(500) DEFAULT NULL,
        `build_author` varchar(500) DEFAULT NULL,
        `build_author_name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        `build_author_email` varchar(500) DEFAULT NULL,
        `build_author_avatar` varchar(1000) DEFAULT NULL,
        `build_sender` varchar(500) DEFAULT NULL,
        `build_deploy` varchar(500) DEFAULT NULL,
        `build_params` varchar(2000) DEFAULT NULL,
        `build_started` int(11) DEFAULT NULL,
        `build_finished` int(11) DEFAULT NULL,
        `build_created` int(11) DEFAULT NULL,
        `build_updated` int(11) DEFAULT NULL,
        `build_version` int(11) DEFAULT NULL,
        PRIMARY KEY (`build_id`),
        UNIQUE KEY `build_repo_id` (`build_repo_id`,`build_number`)
        ) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

        CREATE TABLE IF NOT EXISTS  `cron` (
        `cron_id` int(11) NOT NULL AUTO_INCREMENT,
        `cron_repo_id` int(11) DEFAULT NULL,
        `cron_name` varchar(50) DEFAULT NULL,
        `cron_expr` varchar(50) DEFAULT NULL,
        `cron_next` int(11) DEFAULT NULL,
        `cron_prev` int(11) DEFAULT NULL,
        `cron_event` varchar(50) DEFAULT NULL,
        `cron_branch` varchar(250) DEFAULT NULL,
        `cron_target` varchar(250) DEFAULT NULL,
        `cron_disabled` tinyint(1) DEFAULT NULL,
        `cron_created` int(11) DEFAULT NULL,
        `cron_updated` int(11) DEFAULT NULL,
        `cron_version` int(11) DEFAULT NULL,
        PRIMARY KEY (`cron_id`),
        UNIQUE KEY `cron_repo_id` (`cron_repo_id`,`cron_name`),
        CONSTRAINT `cron_ibfk_1` FOREIGN KEY (`cron_repo_id`) REFERENCES `repos` (`repo_id`) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS  `latest` (
        `latest_repo_id` int(11) NOT NULL DEFAULT '0',
        `latest_build_id` int(11) DEFAULT NULL,
        `latest_type` varchar(50) NOT NULL DEFAULT '',
        `latest_name` varchar(500) NOT NULL DEFAULT '',
        `latest_created` int(11) DEFAULT NULL,
        `latest_updated` int(11) DEFAULT NULL,
        `latest_deleted` int(11) DEFAULT NULL,
        PRIMARY KEY (`latest_repo_id`,`latest_type`,`latest_name`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

        CREATE TABLE IF NOT EXISTS  `logs` (
        `log_id` int(11) NOT NULL,
        `log_data` mediumblob,
        PRIMARY KEY (`log_id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

        CREATE TABLE IF NOT EXISTS  `migrations` (
        `name` varchar(255) DEFAULT NULL,
        UNIQUE KEY `name` (`name`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

        CREATE TABLE IF NOT EXISTS  `nodes` (
        `node_id` int(11) NOT NULL AUTO_INCREMENT,
        `node_uid` varchar(500) DEFAULT NULL,
        `node_provider` varchar(50) DEFAULT NULL,
        `node_state` varchar(50) DEFAULT NULL,
        `node_name` varchar(50) DEFAULT NULL,
        `node_image` varchar(500) DEFAULT NULL,
        `node_region` varchar(100) DEFAULT NULL,
        `node_size` varchar(100) DEFAULT NULL,
        `node_os` varchar(50) DEFAULT NULL,
        `node_arch` varchar(50) DEFAULT NULL,
        `node_kernel` varchar(50) DEFAULT NULL,
        `node_variant` varchar(50) DEFAULT NULL,
        `node_address` varchar(500) DEFAULT NULL,
        `node_capacity` int(11) DEFAULT NULL,
        `node_filter` varchar(2000) DEFAULT NULL,
        `node_labels` varchar(2000) DEFAULT NULL,
        `node_error` varchar(2000) DEFAULT NULL,
        `node_ca_key` blob,
        `node_ca_cert` blob,
        `node_tls_key` blob,
        `node_tls_cert` blob,
        `node_tls_name` varchar(500) DEFAULT NULL,
        `node_paused` tinyint(1) DEFAULT NULL,
        `node_protected` tinyint(1) DEFAULT NULL,
        `node_created` int(11) DEFAULT NULL,
        `node_updated` int(11) DEFAULT NULL,
        `node_pulled` int(11) DEFAULT NULL,
        PRIMARY KEY (`node_id`),
        UNIQUE KEY `node_name` (`node_name`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

        CREATE TABLE IF NOT EXISTS  `orgsecrets` (
        `secret_id` int(11) NOT NULL AUTO_INCREMENT,
        `secret_namespace` varchar(50) DEFAULT NULL,
        `secret_name` varchar(200) DEFAULT NULL,
        `secret_type` varchar(50) DEFAULT NULL,
        `secret_data` blob,
        `secret_pull_request` tinyint(1) DEFAULT NULL,
        `secret_pull_request_push` tinyint(1) DEFAULT NULL,
        PRIMARY KEY (`secret_id`),
        UNIQUE KEY `secret_namespace` (`secret_namespace`,`secret_name`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

        CREATE TABLE IF NOT EXISTS  `perms` (
        `perm_user_id` int(11) NOT NULL DEFAULT '0',
        `perm_repo_uid` varchar(250) NOT NULL DEFAULT '',
        `perm_read` tinyint(1) DEFAULT NULL,
        `perm_write` tinyint(1) DEFAULT NULL,
        `perm_admin` tinyint(1) DEFAULT NULL,
        `perm_synced` int(11) DEFAULT NULL,
        `perm_created` int(11) DEFAULT NULL,
        `perm_updated` int(11) DEFAULT NULL,
        PRIMARY KEY (`perm_user_id`,`perm_repo_uid`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

        CREATE TABLE IF NOT EXISTS  `secrets` (
        `secret_id` int(11) NOT NULL AUTO_INCREMENT,
        `secret_repo_id` int(11) DEFAULT NULL,
        `secret_name` varchar(500) DEFAULT NULL,
        `secret_data` blob,
        `secret_pull_request` tinyint(1) DEFAULT NULL,
        `secret_pull_request_push` tinyint(1) DEFAULT NULL,
        PRIMARY KEY (`secret_id`),
        UNIQUE KEY `secret_repo_id` (`secret_repo_id`,`secret_name`),
        CONSTRAINT `secrets_ibfk_1` FOREIGN KEY (`secret_repo_id`) REFERENCES `repos` (`repo_id`) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

        CREATE TABLE IF NOT EXISTS  `stages` (
        `stage_id` int(11) NOT NULL AUTO_INCREMENT,
        `stage_repo_id` int(11) DEFAULT NULL,
        `stage_build_id` int(11) DEFAULT NULL,
        `stage_number` int(11) DEFAULT NULL,
        `stage_name` varchar(100) DEFAULT NULL,
        `stage_kind` varchar(50) DEFAULT NULL,
        `stage_type` varchar(50) DEFAULT NULL,
        `stage_status` varchar(50) DEFAULT NULL,
        `stage_error` varchar(500) DEFAULT NULL,
        `stage_errignore` tinyint(1) DEFAULT NULL,
        `stage_exit_code` int(11) DEFAULT NULL,
        `stage_limit` int(11) DEFAULT NULL,
        `stage_os` varchar(50) DEFAULT NULL,
        `stage_arch` varchar(50) DEFAULT NULL,
        `stage_variant` varchar(10) DEFAULT NULL,
        `stage_kernel` varchar(50) DEFAULT NULL,
        `stage_machine` varchar(500) DEFAULT NULL,
        `stage_started` int(11) DEFAULT NULL,
        `stage_stopped` int(11) DEFAULT NULL,
        `stage_created` int(11) DEFAULT NULL,
        `stage_updated` int(11) DEFAULT NULL,
        `stage_version` int(11) DEFAULT NULL,
        `stage_on_success` tinyint(1) DEFAULT NULL,
        `stage_on_failure` tinyint(1) DEFAULT NULL,
        `stage_depends_on` text,
        `stage_labels` text,
        PRIMARY KEY (`stage_id`),
        UNIQUE KEY `stage_build_id` (`stage_build_id`,`stage_number`)
        ) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

        CREATE TABLE IF NOT EXISTS  `stages_unfinished` (
        `stage_id` int(11) NOT NULL,
        PRIMARY KEY (`stage_id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

        CREATE TABLE IF NOT EXISTS  `steps` (
        `step_id` int(11) NOT NULL AUTO_INCREMENT,
        `step_stage_id` int(11) DEFAULT NULL,
        `step_number` int(11) DEFAULT NULL,
        `step_name` varchar(100) DEFAULT NULL,
        `step_status` varchar(50) DEFAULT NULL,
        `step_error` varchar(500) DEFAULT NULL,
        `step_errignore` tinyint(1) DEFAULT NULL,
        `step_exit_code` int(11) DEFAULT NULL,
        `step_started` int(11) DEFAULT NULL,
        `step_stopped` int(11) DEFAULT NULL,
        `step_version` int(11) DEFAULT NULL,
        PRIMARY KEY (`step_id`),
        UNIQUE KEY `step_stage_id` (`step_stage_id`,`step_number`)
        ) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

        CREATE TABLE IF NOT EXISTS  `users` (
        `user_id` int(11) NOT NULL AUTO_INCREMENT,
        `user_login` varchar(250) DEFAULT NULL,
        `user_email` varchar(500) DEFAULT NULL,
        `user_admin` tinyint(1) DEFAULT NULL,
        `user_machine` tinyint(1) DEFAULT NULL,
        `user_active` tinyint(1) DEFAULT NULL,
        `user_avatar` varchar(2000) DEFAULT NULL,
        `user_syncing` tinyint(1) DEFAULT NULL,
        `user_synced` int(11) DEFAULT NULL,
        `user_created` int(11) DEFAULT NULL,
        `user_updated` int(11) DEFAULT NULL,
        `user_last_login` int(11) DEFAULT NULL,
        `user_oauth_token` varchar(500) DEFAULT NULL,
        `user_oauth_refresh` varchar(500) DEFAULT NULL,
        `user_oauth_expiry` int(11) DEFAULT NULL,
        `user_hash` varchar(500) DEFAULT NULL,
        PRIMARY KEY (`user_id`),
        UNIQUE KEY `user_login` (`user_login`),
        UNIQUE KEY `user_hash` (`user_hash`)
        ) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;
      SQL

      sqls
    end
  end
end
