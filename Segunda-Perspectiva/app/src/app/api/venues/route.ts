// EventosFSA - API de Estabelecimentos
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const neighborhood = searchParams.get('neighborhood')
    const limit = parseInt(searchParams.get('limit') || '50')

    const where: any = {}
    
    if (category) {
      where.category = category
    }

    if (neighborhood) {
      where.neighborhood = { contains: neighborhood }
    }

    const venues = await prisma.venue.findMany({
      where,
      include: {
        events: {
          where: {
            date: { gte: new Date() }
          },
          orderBy: { date: 'asc' },
          take: 3
        }
      },
      orderBy: { rating: 'desc' },
      take: limit
    })

    // Formatar resposta
    const formattedVenues = venues.map(venue => ({
      id: venue.id,
      name: venue.name,
      description: venue.description,
      address: venue.address,
      neighborhood: venue.neighborhood,
      city: venue.city,
      phone: venue.phone,
      whatsapp: venue.whatsapp,
      instagram: venue.instagram,
      category: venue.category,
      capacity: venue.capacity,
      hasParking: venue.hasParking,
      hasAC: venue.hasAC,
      rating: venue.rating,
      isVerified: venue.isVerified,
      coordinates: venue.latitude && venue.longitude ? {
        lat: venue.latitude,
        lng: venue.longitude
      } : null,
      upcomingEvents: venue.events.length,
      nextEvent: venue.events[0] || null
    }))

    return NextResponse.json({
      success: true,
      venues: formattedVenues,
      total: formattedVenues.length
    })

  } catch (error) {
    console.error('Erro ao buscar estabelecimentos:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar estabelecimentos' },
      { status: 500 }
    )
  }
}
