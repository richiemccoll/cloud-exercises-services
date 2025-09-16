import { Type } from '@sinclair/typebox';

export const PortfolioItemParams = Type.Object({
  id: Type.String(),
});

export const CreatePortfolioItemBody = Type.Object({
  userId: Type.String(),
  projectId: Type.String(),
  title: Type.String(),
  description: Type.String(),
  attachments: Type.Array(Type.Any()),
  shareUrl: Type.String(),
  createdAt: Type.String(),
});
