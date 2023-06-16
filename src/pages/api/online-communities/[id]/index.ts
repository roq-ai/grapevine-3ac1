import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { onlineCommunityValidationSchema } from 'validationSchema/online-communities';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.online_community
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getOnlineCommunityById();
    case 'PUT':
      return updateOnlineCommunityById();
    case 'DELETE':
      return deleteOnlineCommunityById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getOnlineCommunityById() {
    const data = await prisma.online_community.findFirst(convertQueryToPrismaUtil(req.query, 'online_community'));
    return res.status(200).json(data);
  }

  async function updateOnlineCommunityById() {
    await onlineCommunityValidationSchema.validate(req.body);
    const data = await prisma.online_community.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteOnlineCommunityById() {
    const data = await prisma.online_community.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
