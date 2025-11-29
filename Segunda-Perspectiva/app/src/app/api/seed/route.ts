// EventosFSA - API de Seed (Popular banco com dados de demo)
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { hashPassword } from '@/lib/auth'

// Dados reais de Feira de Santana
const seedData = {
  // Usuários de demo
  users: [
    { email: 'admin@eventosfsa.com', password: 'admin123', name: 'Admin EventosFSA', role: 'admin' },
    { email: 'joao.musico@email.com', password: 'artista123', name: 'João Silva', role: 'artist', phone: '75988881111' },
    { email: 'maria.cantora@email.com', password: 'artista123', name: 'Maria Santos', role: 'artist', phone: '75988882222' },
    { email: 'pedro.sax@email.com', password: 'artista123', name: 'Pedro Oliveira', role: 'artist', phone: '75988883333' },
    { email: 'ana.violao@email.com', password: 'artista123', name: 'Ana Costa', role: 'artist', phone: '75988884444' },
    { email: 'lucas.banda@email.com', password: 'artista123', name: 'Lucas Mendes', role: 'artist', phone: '75988885555' },
    { email: 'contato@botecocentral.com', password: 'venue123', name: 'Boteco Central', role: 'venue', phone: '7536234567' },
    { email: 'reservas@viladomalte.com', password: 'venue123', name: 'Vila do Malte', role: 'venue', phone: '7536237890' },
    { email: 'contato@emporiofsa.com', password: 'venue123', name: 'Empório FSA', role: 'venue', phone: '7536231234' },
    { email: 'user@email.com', password: 'user123', name: 'Usuário Teste', role: 'user', phone: '75988889999' }
  ],

  // Artistas com perfis completos
  artists: [
    {
      userEmail: 'joao.musico@email.com',
      stageName: 'João Viola',
      bio: 'Cantor e violonista feirense com 15 anos de estrada. Especialista em MPB, samba e pagode. Já animou mais de 500 eventos em Feira de Santana.',
      genres: '["MPB", "Samba", "Pagode"]',
      pixKey: 'joaoviola@pix.com',
      rating: 4.8,
      isVerified: true
    },
    {
      userEmail: 'maria.cantora@email.com',
      stageName: 'Maria Voz',
      bio: 'Voz marcante do interior baiano. Canto desde criança nas feiras e festas de São João. Repertório variado de forró, axé e música popular.',
      genres: '["Forró", "Axé", "MPB"]',
      pixKey: 'mariavoz@pix.com',
      rating: 4.9,
      isVerified: true
    },
    {
      userEmail: 'pedro.sax@email.com',
      stageName: 'Pedro Sax',
      bio: 'Saxofonista profissional com formação no Conservatório de Música de Salvador. Jazz, blues e bossa nova são minhas especialidades.',
      genres: '["Jazz", "Blues", "Bossa Nova"]',
      pixKey: 'pedrosax@pix.com',
      rating: 4.7,
      isVerified: true
    },
    {
      userEmail: 'ana.violao@email.com',
      stageName: 'Ana Acoustic',
      bio: 'Violonista e cantora. Faço covers acústicos de pop, rock e sertanejo. Perfeito para ambientes intimistas e happy hours.',
      genres: '["Pop", "Rock Acústico", "Sertanejo"]',
      pixKey: 'anaacoustic@pix.com',
      rating: 4.6,
      isVerified: false
    },
    {
      userEmail: 'lucas.banda@email.com',
      stageName: 'Banda Feira Viva',
      bio: 'Banda completa com 5 integrantes. Rock, pop-rock e clássicos nacionais. Ideal para festas, eventos corporativos e casamentos.',
      genres: '["Rock", "Pop Rock", "MPB"]',
      pixKey: 'feiraviva@pix.com',
      rating: 4.5,
      isVerified: true
    }
  ],

  // Estabelecimentos reais de Feira de Santana
  venues: [
    {
      userEmail: 'contato@botecocentral.com',
      name: 'Boteco Central',
      description: 'O point da galera jovem de Feira! Ambiente descontraído, petiscos deliciosos e música ao vivo toda semana. Venha curtir o melhor do happy hour feirense.',
      address: 'Av. Getúlio Vargas, 1500',
      neighborhood: 'Centro',
      phone: '7536234567',
      whatsapp: '5575988887777',
      instagram: '@botecocentral_fsa',
      category: 'bar',
      capacity: 150,
      hasParking: false,
      hasAC: true,
      rating: 4.6,
      isVerified: true,
      latitude: -12.2660,
      longitude: -38.9663
    },
    {
      userEmail: 'reservas@viladomalte.com',
      name: 'Vila do Malte',
      description: 'Cervejaria artesanal com mais de 50 rótulos de cervejas especiais. Ambiente rústico e aconchegante. Música ao vivo às sextas e sábados.',
      address: 'Rua Marechal Deodoro, 890',
      neighborhood: 'Kalilândia',
      phone: '7536237890',
      whatsapp: '5575988886666',
      instagram: '@viladomalte',
      category: 'bar',
      capacity: 80,
      hasParking: true,
      hasAC: true,
      rating: 4.8,
      isVerified: true,
      latitude: -12.2580,
      longitude: -38.9580
    },
    {
      userEmail: 'contato@emporiofsa.com',
      name: 'Empório Gastronômico FSA',
      description: 'Gastronomia refinada em ambiente elegante. Vinhos selecionados, pratos autorais e jazz ao vivo. O melhor da culinária contemporânea em Feira.',
      address: 'Av. Maria Quitéria, 2300',
      neighborhood: 'Santa Mônica',
      phone: '7536231234',
      whatsapp: '5575988885555',
      instagram: '@emporiogastrofsa',
      category: 'restaurant',
      capacity: 120,
      hasParking: true,
      hasAC: true,
      rating: 4.9,
      isVerified: true,
      latitude: -12.2450,
      longitude: -38.9420
    }
  ],

  // Mais estabelecimentos para variedade
  extraVenues: [
    {
      name: 'Recanto do Samba',
      description: 'Roda de samba autêntica todo domingo! Feijoada completa e samba de raiz com os melhores pagodeiros da região.',
      address: 'Rua Castro Alves, 456',
      neighborhood: 'Brasília',
      category: 'bar',
      capacity: 100,
      rating: 4.5
    },
    {
      name: 'Rock Station Bar',
      description: 'O templo do rock em Feira de Santana! Shows de bandas locais e nacionais. Cervejas geladas e o melhor som.',
      address: 'Av. Senhor dos Passos, 789',
      neighborhood: 'Centro',
      category: 'bar',
      capacity: 200,
      rating: 4.4
    },
    {
      name: 'Sabor & Arte Bistrô',
      description: 'Culinária regional com toque contemporâneo. Ambiente intimista perfeito para jantares românticos com música ao vivo.',
      address: 'Rua Conselheiro Franco, 234',
      neighborhood: 'Capuchinhos',
      category: 'restaurant',
      capacity: 60,
      rating: 4.7
    },
    {
      name: 'Forró do Tiziu',
      description: 'Forró pé de serra de verdade! Trio elétrico nos finais de semana. A tradição junina o ano inteiro.',
      address: 'Rua Monsenhor Mário Pessoa, 1100',
      neighborhood: 'Tomba',
      category: 'club',
      capacity: 300,
      rating: 4.3
    },
    {
      name: 'Lounge 44',
      description: 'Bar lounge com DJ sets, drinks autorais e ambiente sofisticado. O point da night feirense.',
      address: 'Av. João Durval Carneiro, 4400',
      neighborhood: 'Santa Mônica',
      category: 'club',
      capacity: 180,
      rating: 4.6
    }
  ]
}

export async function POST(request: NextRequest) {
  try {
    // Limpar banco existente
    await prisma.tip.deleteMany()
    await prisma.favorite.deleteMany()
    await prisma.eventArtist.deleteMany()
    await prisma.event.deleteMany()
    await prisma.artist.deleteMany()
    await prisma.venue.deleteMany()
    await prisma.session.deleteMany()
    await prisma.user.deleteMany()

    // Criar usuários
    for (const userData of seedData.users) {
      await prisma.user.create({
        data: {
          email: userData.email,
          password: hashPassword(userData.password),
          name: userData.name,
          role: userData.role,
          phone: userData.phone || null
        }
      })
    }

    // Criar artistas
    for (const artistData of seedData.artists) {
      const user = await prisma.user.findUnique({ where: { email: artistData.userEmail } })
      if (user) {
        await prisma.artist.create({
          data: {
            userId: user.id,
            stageName: artistData.stageName,
            bio: artistData.bio,
            genres: artistData.genres,
            pixKey: artistData.pixKey,
            rating: artistData.rating,
            isVerified: artistData.isVerified
          }
        })
      }
    }

    // Criar estabelecimentos
    for (const venueData of seedData.venues) {
      const user = await prisma.user.findUnique({ where: { email: venueData.userEmail } })
      if (user) {
        await prisma.venue.create({
          data: {
            userId: user.id,
            name: venueData.name,
            description: venueData.description,
            address: venueData.address,
            neighborhood: venueData.neighborhood,
            phone: venueData.phone,
            whatsapp: venueData.whatsapp,
            instagram: venueData.instagram,
            category: venueData.category,
            capacity: venueData.capacity,
            hasParking: venueData.hasParking,
            hasAC: venueData.hasAC,
            rating: venueData.rating,
            isVerified: venueData.isVerified,
            latitude: venueData.latitude,
            longitude: venueData.longitude
          }
        })
      }
    }

    // Criar eventos para os próximos dias
    const venues = await prisma.venue.findMany()
    const artists = await prisma.artist.findMany()
    
    const eventTitles = [
      'Noite de MPB',
      'Happy Hour com Jazz',
      'Samba de Raiz',
      'Forró pé de serra',
      'Rock Session',
      'Pagode ao Vivo',
      'Acústico Especial',
      'Blues Night',
      'Sexta Cultural',
      'Sábado Animado'
    ]

    const genres = ['MPB', 'Jazz', 'Samba', 'Forró', 'Rock', 'Pagode', 'Pop', 'Blues', 'Axé', 'Bossa Nova']

    for (let i = 0; i < 15; i++) {
      const venue = venues[i % venues.length]
      const artist = artists[i % artists.length]
      const daysAhead = Math.floor(i / 3)
      const eventDate = new Date()
      eventDate.setDate(eventDate.getDate() + daysAhead)
      eventDate.setHours(20, 0, 0, 0)

      const event = await prisma.event.create({
        data: {
          venueId: venue.id,
          title: eventTitles[i % eventTitles.length],
          description: `Uma noite incrível com música ao vivo no ${venue.name}. Venha curtir!`,
          date: eventDate,
          startTime: ['19:00', '20:00', '21:00'][i % 3],
          endTime: ['23:00', '00:00', '01:00'][i % 3],
          coverCharge: [0, 15, 20, 25, 30][i % 5],
          isFree: i % 5 === 0,
          isLive: daysAhead === 0 && i < 3,
          genres: `["${genres[i % genres.length]}", "${genres[(i + 1) % genres.length]}"]`
        }
      })

      // Associar artista ao evento
      if (artist) {
        await prisma.eventArtist.create({
          data: {
            eventId: event.id,
            artistId: artist.id
          }
        })
      }
    }

    const totalUsers = await prisma.user.count()
    const totalArtists = await prisma.artist.count()
    const totalVenues = await prisma.venue.count()
    const totalEvents = await prisma.event.count()

    return NextResponse.json({
      success: true,
      message: 'Banco de dados populado com sucesso!',
      stats: {
        users: totalUsers,
        artists: totalArtists,
        venues: totalVenues,
        events: totalEvents
      },
      demoAccounts: [
        { email: 'admin@eventosfsa.com', password: 'admin123', role: 'admin' },
        { email: 'joao.musico@email.com', password: 'artista123', role: 'artist' },
        { email: 'contato@botecocentral.com', password: 'venue123', role: 'venue' },
        { email: 'user@email.com', password: 'user123', role: 'user' }
      ]
    })

  } catch (error) {
    console.error('Erro ao popular banco:', error)
    return NextResponse.json(
      { error: 'Erro ao popular banco de dados', details: String(error) },
      { status: 500 }
    )
  }
}
