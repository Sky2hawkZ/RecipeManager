import {z} from 'zod';

/**
 * Ingredients form validation
 */

// Ingredient validation schema
export const ingredientSchema = z.object({
  ingredient: z.string().min(1, {message: 'Ingredient name is required'}),
  amount: z.string().min(1, {message: 'Amount is required'}),
  measurement: z.string().min(1, {message: 'Measurement is required'}),
  inStock: z.boolean().optional().default(false),
}).superRefine((data, ctx) => {
  // Check if any of the required fields are invalid
  if (!data.ingredient || !data.amount || !data.measurement) {
    // Add a general error message at the object level
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please complete all required ingredient fields',
      path: [], // Empty path means it's for the whole object
    });
  }
});

// Ingredients row form schema
export const ingredientRowFormSchema = z.array(ingredientSchema);

// Type for ingredient form data
export type IngredientRowFormData = z.infer<typeof ingredientRowFormSchema>;

/**
 * Validates ingredient row form data
 * @param data Ingredient row data to validate
 * @returns An object with validation result and any errors
 */
export const validateIngredientRows = (data: IngredientRowFormData) => {
  try {
    const validatedData = ingredientRowFormSchema.parse(data);
    return {
      success: true,
      data: validatedData,
      errors: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Convert Zod errors to a more user-friendly format
      const errors = error.errors.reduce((acc, err) => {
        // Get field name from the path, e.g. ["0", "ingredient"] → "0.ingredient"
        const fieldName = err.path.join('.');
        return {...acc, [fieldName]: err.message};
      }, {});
      return {
        success: false,
        data: null,
        errors,
      };
    }

    return {
      success: false,
      data: null,
      errors: {_form: 'An unexpected error occurred with ingredients'},
    };
  }
};

/**
 * Recipe form validation
 */

// Main recipe validation schema
export const recipeFormSchema = z.object({
  recipeName: z
    .string()
    .min(3, {message: 'Recipe name must be at least 3 characters'}),
  recipeImage: z.string().optional(),
  recipeDescription: z.string().optional(),
  numberOfServings: z
    .string()
    .refine(val => !isNaN(parseInt(val)), {message: 'Must be a number'})
    .refine(val => parseInt(val) > 0, {message: 'Must be greater than 0'})
    .optional(),
  prepTime: z
    .string()
    .refine(val => !isNaN(parseInt(val)), {message: 'Must be a number'})
    .refine(val => parseInt(val) >= 0, {message: 'Must be 0 or greater'})
    .optional(),
  cookTime: z
    .string()
    .refine(val => !isNaN(parseInt(val)), {message: 'Must be a number'})
    .refine(val => parseInt(val) >= 0, {message: 'Must be 0 or greater'})
    .optional(),
  calories: z
    .string()
    .refine(val => val === '' || !isNaN(parseInt(val)), {
      message: 'Must be a number if provided',
    })
    .optional(),
  favorite: z.boolean().default(false),
});

// Type for the recipe form data
export type RecipeFormData = z.infer<typeof recipeFormSchema>;

/**
 * Validates recipe form data
 * @param data Form data to validate
 * @returns An object with validation result and any errors
 */
export const validateRecipeForm = (data: RecipeFormData) => {
  try {
    const validatedData = recipeFormSchema.parse(data);
    return {
      success: true,
      data: validatedData,
      errors: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Convert Zod errors to a more user-friendly format
      const errors = error.errors.reduce((acc, err) => {
        // Get field name from the path, e.g. ["recipeName"] → "recipeName"
        const fieldName = err.path.join('.');
        return {...acc, [fieldName]: err.message};
      }, {});

      return {
        success: false,
        data: null,
        errors,
      };
    }

    return {
      success: false,
      data: null,
      errors: {_form: 'An unexpected error occurred'},
    };
  }
};
