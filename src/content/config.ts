import { z, defineCollection } from 'astro:content';

const aulas = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    modulo: z.enum(['selling-series', 'servicing-series', 'getting-started', 'marketing', 'sales', 'service']),
    moduloLabel: z.string(),
    moduloNumero: z.number(),
    ordem: z.number(),
    aulaNum: z.string(),
    duracao: z.string().optional(),
    descricao: z.string(),
    videoFile: z.string().optional(),
    legendaFile: z.string().optional(),
    emBreve: z.boolean().default(false),
    destaque: z.boolean().default(false),
  }),
});

export const collections = { aulas };
