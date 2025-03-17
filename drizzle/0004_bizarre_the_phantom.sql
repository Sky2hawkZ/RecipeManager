ALTER TABLE `ingredient` ADD `ingredient` text;--> statement-breakpoint
ALTER TABLE `ingredient` ADD `measurement` text;--> statement-breakpoint
ALTER TABLE `ingredient` DROP COLUMN `recipeIngredientID`;--> statement-breakpoint
ALTER TABLE `ingredient` DROP COLUMN `name`;--> statement-breakpoint
ALTER TABLE `ingredient` DROP COLUMN `volume`;--> statement-breakpoint
ALTER TABLE `ingredient` DROP COLUMN `description`;--> statement-breakpoint
ALTER TABLE `recipe` ADD `prepTime` integer;--> statement-breakpoint
ALTER TABLE `recipe` ADD `cookTime` integer;--> statement-breakpoint
ALTER TABLE `recipe` ADD `favorite` integer;--> statement-breakpoint
ALTER TABLE `recipe` DROP COLUMN `recipeIngredientsID`;--> statement-breakpoint
ALTER TABLE `recipe` DROP COLUMN `userId`;--> statement-breakpoint
ALTER TABLE `user` ADD `firstName` text;--> statement-breakpoint
ALTER TABLE `user` ADD `lastName` text;