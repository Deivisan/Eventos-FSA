const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function hashPassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `hash_${Math.abs(hash).toString(16)}_${password.length}`;
}

async function seed() {
  console.log('🌱 Iniciando seed...');
  
  // Limpar banco
  await prisma.tip.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.eventArtist.deleteMany();
  await prisma.event.deleteMany();
  await prisma.artist.deleteMany();
  await prisma.venue.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
  
  // Criar usuarios
  const users = [
    { email: 'admin@eventosfsa.com', password: 'admin123', name: 'Admin EventosFSA', role: 'admin' },
    { email: 'joao.musico@email.com', password: 'artista123', name: 'João Silva', role: 'artist', phone: '75988881111' },
    { email: 'maria.cantora@email.com', password: 'artista123', name: 'Maria Santos', role: 'artist', phone: '75988882222' },
    { email: 'pedro.sax@email.com', password: 'artista123', name: 'Pedro Oliveira', role: 'artist', phone: '75988883333' },
    { email: 'contato@botecocentral.com', password: 'venue123', name: 'Boteco Central', role: 'venue', phone: '7536234567' },
    { email: 'reservas@viladomalte.com', password: 'venue123', name: 'Vila do Malte', role: 'venue', phone: '7536237890' },
    { email: 'contato@emporiofsa.com', password: 'venue123', name: 'Empório FSA', role: 'venue', phone: '7536231234' },
    { email: 'user@email.com', password: 'user123', name: 'Usuário Teste', role: 'user', phone: '75988889999' }
  ];
  
  for (const u of users) {
    await prisma.user.create({
      data: {
        email: u.email,
        password: hashPassword(u.password),
        name: u.name,
        role: u.role,
        phone: u.phone || null
      }
    });
  }
  
  console.log('✅ Usuarios criados:', users.length);
  
  // Criar artistas
  const joaoUser = await prisma.user.findUnique({ where: { email: 'joao.musico@email.com' }});
  const mariaUser = await prisma.user.findUnique({ where: { email: 'maria.cantora@email.com' }});
  const pedroUser = await prisma.user.findUnique({ where: { email: 'pedro.sax@email.com' }});
  
  await prisma.artist.createMany({
    data: [
      { userId: joaoUser.id, stageName: 'João Viola', bio: 'Cantor e violonista feirense com 15 anos de estrada.', genres: '["MPB", "Samba", "Pagode"]', pixKey: 'joaoviola@pix.com', rating: 4.8, isVerified: true },
      { userId: mariaUser.id, stageName: 'Maria Voz', bio: 'Voz marcante do interior baiano.', genres: '["Forró", "Axé", "MPB"]', pixKey: 'mariavoz@pix.com', rating: 4.9, isVerified: true },
      { userId: pedroUser.id, stageName: 'Pedro Sax', bio: 'Saxofonista profissional.', genres: '["Jazz", "Blues", "Bossa Nova"]', pixKey: 'pedrosax@pix.com', rating: 4.7, isVerified: true }
    ]
  });
  
  console.log('✅ Artistas criados: 3');
  
  // Criar estabelecimentos
  const botecoUser = await prisma.user.findUnique({ where: { email: 'contato@botecocentral.com' }});
  const vilaUser = await prisma.user.findUnique({ where: { email: 'reservas@viladomalte.com' }});
  const emporioUser = await prisma.user.findUnique({ where: { email: 'contato@emporiofsa.com' }});
  
  await prisma.venue.createMany({
    data: [
      { userId: botecoUser.id, name: 'Boteco Central', description: 'O point da galera jovem de Feira!', address: 'Av. Getúlio Vargas, 1500', neighborhood: 'Centro', phone: '7536234567', whatsapp: '5575988887777', category: 'bar', capacity: 150, hasAC: true, rating: 4.6, isVerified: true },
      { userId: vilaUser.id, name: 'Vila do Malte', description: 'Cervejaria artesanal.', address: 'Rua Marechal Deodoro, 890', neighborhood: 'Kalilândia', phone: '7536237890', whatsapp: '5575988886666', category: 'bar', capacity: 80, hasParking: true, hasAC: true, rating: 4.8, isVerified: true },
      { userId: emporioUser.id, name: 'Empório Gastronômico FSA', description: 'Gastronomia refinada.', address: 'Av. Maria Quitéria, 2300', neighborhood: 'Santa Mônica', phone: '7536231234', whatsapp: '5575988885555', category: 'restaurant', capacity: 120, hasParking: true, hasAC: true, rating: 4.9, isVerified: true }
    ]
  });
  
  console.log('✅ Estabelecimentos criados: 3');
  
  // Criar eventos
  const venues = await prisma.venue.findMany();
  const artists = await prisma.artist.findMany();
  
  for (let i = 0; i < 5; i++) {
    const venue = venues[i % venues.length];
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + i);
    
    await prisma.event.create({
      data: {
        venueId: venue.id,
        title: ['Noite de MPB', 'Jazz & Blues Night', 'Pagode Raiz', 'Rock Session', 'Forró do Tiziu'][i],
        description: 'Uma noite incrível com música ao vivo!',
        date: eventDate,
        startTime: ['19:00', '20:00', '21:00', '22:00', '20:00'][i],
        endTime: '00:00',
        coverCharge: [15, 30, 0, 25, 20][i],
        isFree: i === 2,
        isLive: i < 2,
        genres: '["MPB", "Samba"]'
      }
    });
  }
  
  console.log('✅ Eventos criados: 5');
  console.log('🎉 Seed completo!');
  
  await prisma.$disconnect();
}

seed().catch(e => { console.error(e); process.exit(1); });
