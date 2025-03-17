CREATE TABLE `ingredient` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`recipeIngredientID` integer,
	`name` text,
	`amount` real,
	`volume` real,
	`description` text,
	`recipeId` integer,
	`inStock` integer,
	`recipe` integer,
	FOREIGN KEY (`recipe`) REFERENCES `recipe`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `recipe` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`image` text,
	`description` text,
	`numberOfServings` integer,
	`recipeIngredientsID` integer,
	`calories` integer,
	`userId` integer,
	`user` integer,
	FOREIGN KEY (`user`) REFERENCES `user`(`userId`) ON UPDATE no action ON DELETE no action
);
