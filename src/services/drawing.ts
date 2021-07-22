import { prisma } from '../../prisma'
import {
  Drawing,
  Prisma,
} from '@prisma/client'
import { shortid } from '../utils/shortid'

export async function createDrawing (
  data: Prisma.DrawingCreateArgs['data'],
): Promise<Drawing> {
  const { id } = await prisma.drawing.create({
    data,
  })

  const drawing = await prisma.drawing.update({
    data: {
      code: shortid(id),
    },
    where: {
      id,
    },
  })

  return drawing
}
