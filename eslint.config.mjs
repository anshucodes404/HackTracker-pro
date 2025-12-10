import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		ignores: [
			"node_modules/**",
			".next/**",
			"out/**",
			"build/**",
			"next-env.d.ts",
		],
	},
	{
		rules: {
			"@typescript-eslint/no-unused-vars": "off", // Disable unused vars
			"react-hooks/rules-of-hooks": "off", // Disable hook naming rules
			"react-hooks/exhaustive-deps": "off", // Disable missing dependency warnings
			"@next/next/no-img-element": "off", // Disable img element warning
		},
	},
];

export default eslintConfig;
