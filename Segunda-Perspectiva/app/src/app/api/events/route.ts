// EventosFSA - API de Eventos
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const live = searchParams.get('live') === 'true'
    const genre = searchParams.get('genre')
    const limit = parseInt(searchParams.get('limit') || '50')

    const where: any = {}
    
    if (live) {
      where.isLive = true
    }

    if (genre) {
      where.genres = { contains: genre }
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        venue: {
          select: {
            id: true,
            name: true,
            address: true,
            neighborhood: true
          }
        },
        artists: {
          include: {
            artist: {
              select: {
                id: true,
                stageName: true,
                rating: true
              }
            }
          }
        }
      },
      orderBy: { date: 'asc' },
      take: limit
    })

    // Formatar resposta
    const formattedEvents = events.map(event => ({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      coverCharge: event.coverCharge,
      isFree: event.isFree,
      isLive: event.isLive,
      genres: JSON.parse(event.genres || '[]'),
      venue: event.venue,
      artists: event.artists.map(ea => ea.artist)
    }))

    return NextResponse.json({
      success: true,
      events: formattedEvents,
      total: formattedEvents.length
    })

  } catch (error) {
    console.error('Erro ao buscar eventos:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar eventos' },
      { status: 500 }
    )
  }
}
