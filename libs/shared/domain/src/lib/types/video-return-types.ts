import { Prisma } from '@prisma/client';

const videoWithUploader = Prisma.validator<Prisma.VideoDefaultArgs>()({ include: { uploader: true } });

export type VideoInfo = Prisma.VideoGetPayload<typeof videoWithUploader>;
