import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { onlineCommunityValidationSchema } from 'validationSchema/online-communities';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getOnlineCommunities();
    case 'POST':
      return createOnlineCommunity();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getOnlineCommunities() {
    const data = await prisma.online_community
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'online_community'));
    return res.status(200).json(data);
  }

  async function createOnlineCommunity() {
    await onlineCommunityValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.lead_opportunity?.length > 0) {
      const create_lead_opportunity = body.lead_opportunity;
      body.lead_opportunity = {
        create: create_lead_opportunity,
      };
    } else {
      delete body.lead_opportunity;
    }
    const data = await prisma.online_community.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
