// EventosFSA - API de Artistas
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const genre = searchParams.get('genre')
    const verified = searchParams.get('verified') === 'true'
    const limit = parseInt(searchParams.get('limit') || '50')

    const where: any = {}
    
    if (verified) {
      where.isVerified = true
    }

    if (genre) {
      where.genres = { contains: genre }
    }

    const artists = await prisma.artist.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
            phone: true
          }
        }
      },
      orderBy: { rating: 'desc' },
      take: limit
    })

    // Formatar resposta
    const formattedArtists = artists.map((artist, index) => ({
      id: artist.id,
      stageName: artist.stageName,
      realName: artist.user.name,
      bio: artist.bio,
      genres: JSON.parse(artist.genres || '[]'),
      rating: artist.rating,
      totalTips: artist.totalTips,
      isVerified: artist.isVerified,
      avatar: artist.user.avatar,
      phone: artist.user.phone,
      rank: index + 1
    }))

    return NextResponse.json({
      success: true,
      artists: formattedArtists,
      total: formattedArtists.length
    })

  } catch (error) {
    console.error('Erro ao buscar artistas:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar artistas' },
      { status: 500 }
    )
  }
}
