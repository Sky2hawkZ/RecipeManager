PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user` (
	`userId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userName` text,
	`userPreferences` text,
	`isOnboarded` integer
);
--> statement-breakpoint
INSERT INTO `__new_user`("userId", "userName", "userPreferences", "isOnboarded") SELECT "userId", "userName", "userPreferences", "isOnboarded" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
PRAGMA foreign_keys=ON;