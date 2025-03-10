CREATE TABLE `user` (
	`userId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userName` text,
	`userPreferences` text,
	`isOnboarded` text
);
