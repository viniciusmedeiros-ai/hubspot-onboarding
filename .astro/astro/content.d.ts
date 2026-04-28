declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"aulas": {
"content-marketing-leads.md": {
	id: "content-marketing-leads.md";
  slug: "content-marketing-leads";
  body: string;
  collection: "aulas";
  data: InferEntrySchema<"aulas">
} & { render(): Render[".md"] };
"customer-success-workspace.md": {
	id: "customer-success-workspace.md";
  slug: "customer-success-workspace";
  body: string;
  collection: "aulas";
  data: InferEntrySchema<"aulas">
} & { render(): Render[".md"] };
"getting-started-crm.md": {
	id: "getting-started-crm.md";
  slug: "getting-started-crm";
  body: string;
  collection: "aulas";
  data: InferEntrySchema<"aulas">
} & { render(): Render[".md"] };
"lead-development-nurturing.md": {
	id: "lead-development-nurturing.md";
  slug: "lead-development-nurturing";
  body: string;
  collection: "aulas";
  data: InferEntrySchema<"aulas">
} & { render(): Render[".md"] };
"pipeline-management-automation.md": {
	id: "pipeline-management-automation.md";
  slug: "pipeline-management-automation";
  body: string;
  collection: "aulas";
  data: InferEntrySchema<"aulas">
} & { render(): Render[".md"] };
"reporting-sales-performance.md": {
	id: "reporting-sales-performance.md";
  slug: "reporting-sales-performance";
  body: string;
  collection: "aulas";
  data: InferEntrySchema<"aulas">
} & { render(): Render[".md"] };
"reports-analytics-marketers.md": {
	id: "reports-analytics-marketers.md";
  slug: "reports-analytics-marketers";
  body: string;
  collection: "aulas";
  data: InferEntrySchema<"aulas">
} & { render(): Render[".md"] };
"sales-productivity-tools.md": {
	id: "sales-productivity-tools.md";
  slug: "sales-productivity-tools";
  body: string;
  collection: "aulas";
  data: InferEntrySchema<"aulas">
} & { render(): Render[".md"] };
"sales-to-service-handoff.md": {
	id: "sales-to-service-handoff.md";
  slug: "sales-to-service-handoff";
  body: string;
  collection: "aulas";
  data: InferEntrySchema<"aulas">
} & { render(): Render[".md"] };
"segmentation-emails.md": {
	id: "segmentation-emails.md";
  slug: "segmentation-emails";
  body: string;
  collection: "aulas";
  data: InferEntrySchema<"aulas">
} & { render(): Render[".md"] };
"selling-pitches-demos.md": {
	id: "selling-pitches-demos.md";
  slug: "selling-pitches-demos";
  body: string;
  collection: "aulas";
  data: InferEntrySchema<"aulas">
} & { render(): Render[".md"] };
"selling-with-team.md": {
	id: "selling-with-team.md";
  slug: "selling-with-team";
  body: string;
  collection: "aulas";
  data: InferEntrySchema<"aulas">
} & { render(): Render[".md"] };
"service-channels-tickets.md": {
	id: "service-channels-tickets.md";
  slug: "service-channels-tickets";
  body: string;
  collection: "aulas";
  data: InferEntrySchema<"aulas">
} & { render(): Render[".md"] };
"servicing-onboarding.md": {
	id: "servicing-onboarding.md";
  slug: "servicing-onboarding";
  body: string;
  collection: "aulas";
  data: InferEntrySchema<"aulas">
} & { render(): Render[".md"] };
"servicing-unlocking-success.md": {
	id: "servicing-unlocking-success.md";
  slug: "servicing-unlocking-success";
  body: string;
  collection: "aulas";
  data: InferEntrySchema<"aulas">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
